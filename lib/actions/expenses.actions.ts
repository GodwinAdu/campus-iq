"use server"

import { revalidatePath } from "next/cache";
import Account from "../models/account.models";
import { connectToDB } from "../mongoose";
import Expense from "../models/expenses.models";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";
interface AccountProps {
    accountId: string;
    expenseName: string;
    reference?: string;
    expenseDate: Date,
    expenseAmount: number;
    payVia: string;

}
export async function createExpenses(values: AccountProps, path: string) {
    try {
        const { accountId, expenseAmount, expenseDate, expenseName, payVia, reference } = values;

        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB()

        const account = await Account.findById(accountId);
        if (!account) throw new Error(`Account not found`);

        if (account.balance < expenseAmount) {
            throw new Error("Insufficient balance in the account");
        }

        const expenses = new Expense({
            accountId,
            expenseAmount,
            expenseDate,
            expenseName,
            reference,
            payVia,
            schoolId,
        });

        account.expenses.push(expenses._id);
        account.balance -= expenseAmount as number;

        const history = new History({
            schoolId,
            actionType: 'EXPENSE_CREATED', // Use a relevant action type
            details: {
                itemId: expenses._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} added new expense with (ID: ${expenses._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id, // User who performed the action,
            entityId: expenses._id,  // The ID of the deleted unit
        });

        await Promise.all([
            expenses.save(),
            account.save(),
            history.save()
        ]);

        revalidatePath(path);
    } catch (error) {
        console.error("Error creating deposit", error);
        throw error;
    }
}

export async function getAllExpenses({ accountId, month }: { accountId: string, month: Date }) {
    try {
        // Fetch current profile
        const user = await currentUser();
        if (!user) {
            throw new Error('User not found');
        }

        // Extract schoolId from user profile
        const schoolId = user?.schoolId

        if (!schoolId) {
            throw new Error('School ID not found');
        }

        // Connect to the database
        await connectToDB();

        // Define the year and month for the query
        const year = month?.getFullYear();
        const queryMonth = month?.getMonth() + 1; // getMonth() returns 0-11, so add 1

        console.log('Year:', year);
        console.log('Month:', queryMonth);

        // Fetch deposits for the given accountId, year, month, and schoolId
        const expenses = await Expense.find({
            accountId,
            schoolId,
            $expr: {
                $and: [
                    { $eq: [{ $year: '$expenseDate' }, year] },
                    { $eq: [{ $month: '$expenseDate' }, queryMonth] }
                ]
            }
        });

        console.log('expenses found:', expenses);

        if (expenses.length === 0) {
            return [];
        }

        return JSON.parse(JSON.stringify(expenses));
    } catch (error) {
        console.error('Error getting all expenses', error);
        throw error;
    }
}


export async function deleteExpenses(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();
        const expenses = await Expense.findByIdAndDelete(id);
        if (!expenses) {
            throw new Error('expenses not found');
        }
        const account = await Account.findById(expenses.accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        account.expenses = account.expenses.filter((e: any) => e.toString() !== id);
        // account.balance -= deposit.depositAmount;
        await account.save();
        console.log('Deposit deleted successfully');
        return JSON.parse(JSON.stringify(expenses));  // return deleted deposit in JSON format  // return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format   // return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format   // return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format   // return

    } catch (error) {
        console.error('Error deleting Deposit from database', error);
        throw error;
    }
}


export async function updateExpenses(id: string, values: AccountProps) {
    try {
        const { accountId, expenseAmount, expenseDate, expenseName, payVia, reference } = values;

        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        // const schoolId = user.schoolId;

        await connectToDB()

        const account = await Account.findById(accountId);
        if (!account) throw new Error(`Account not found`);

        const expenses = await Expense.findById(id);
        if (!expenses) throw new Error(`Expense not found`);

        if (account.balance + expenses.expenseAmount < expenseAmount) {
            throw new Error("Insufficient balance in the account");
        }

        expenses.accountId = accountId;
        expenses.expenseAmount = expenseAmount;
        expenses.expenseDate = expenseDate;
        expenses.expenseName = expenseName;
        expenses.reference = reference;
        expenses.payVia = payVia;

        account.balance += expenses.expenseAmount as number;
        account.balance -= expenseAmount as number;

        await Promise.all([
            expenses.save(),
            account.save()
        ]);

    } catch (error) {
        console.error("Error updating Deposit", error);
        throw error;
    }
}


export async function getExpenseById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();

        const expenses = await Expense.findById(id);
        if (!expenses) {
            throw new Error('Expense not found');
        }
        return JSON.parse(JSON.stringify(expenses));
    } catch (error) {
        console.error('Error getting expense by ID', error);
        throw error;
    }
}


export async function totalExpenses(): Promise<number> {
    try {
        const user = await currentUser();
        if (!user || !user.schoolId) {
            throw new Error("User not logged in or missing schoolId.");
        }

        await connectToDB();

        const [result] = await Expense.aggregate([
            {
                $match: { schoolId: user.schoolId },
            },
            {
                $group: {
                    _id: null,
                    totalExpense: { $sum: "$expenseAmount" },
                },
            },
        ]);

        const total = result?.totalExpense ?? 0;
        console.log("Total Expense:", total);

        return total;
    } catch (error) {
        console.error("Failed to calculate total expenses:", error);
        return 0; // Optional: return 0 instead of throwing to avoid app crashing
    }
}