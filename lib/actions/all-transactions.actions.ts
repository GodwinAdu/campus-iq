"use server"

import { currentUser } from "../helpers/current-user";
import Deposit from "../models/deposit.models";
import Expense from "../models/expenses.models";
import { connectToDB } from "../mongoose";

export async function fetchAllTransactions({ accountId, month }: { accountId: string, month: Date }) {
    try {

        const user = await currentUser();

        if (!user) throw new Error('You must be logged in')

        const schoolId = user.schoolId;

        await connectToDB();

        // Define the year and month for the query
        const year = month.getFullYear();
        const queryMonth = month.getMonth() + 1; // getMonth() returns 0-11, so add 1

        // Fetch deposits and expenses in parallel using aggregation
        const [expenses, deposits] = await Promise.all([
            Expense.aggregate([
                {
                    $match: {
                        accountId,
                        schoolId,
                        $expr: {
                            $and: [
                                { $eq: [{ $year: '$expenseDate' }, year] },
                                { $eq: [{ $month: '$expenseDate' }, queryMonth] }
                            ]
                        }
                    }
                },
                {
                    $project: { accountId: 1, expenseDate: 1, createdAt: 1 } // Select only necessary fields
                }
            ]).exec(),

            Deposit.aggregate([
                {
                    $match: {
                        accountId,
                        schoolId,
                        $expr: {
                            $and: [
                                { $eq: [{ $year: '$depositDate' }, year] },
                                { $eq: [{ $month: '$depositDate' }, queryMonth] }
                            ]
                        }
                    }
                },
                {
                    $project: { accountId: 1, depositDate: 1, createdAt: 1 } // Select only necessary fields
                }
            ]).exec(),
        ]);

        if (expenses.length === 0 && deposits.length === 0) {
            return [];
        }

        // Combine and sort transactions
        const transactions = [...deposits, ...expenses].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        return JSON.parse(JSON.stringify(transactions));

    } catch (error) {
        console.log("Failed to fetch all transactions", error);
        throw error;
    }
}
