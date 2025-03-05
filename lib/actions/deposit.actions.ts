"use server"

import { revalidatePath } from "next/cache";
import Account from "../models/account.models";
import Deposit from "../models/deposit.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";
interface AccountProps {
    accountId: string;
    depositName: string;
    reference?: string;
    depositDate: Date,
    depositAmount: number;
    payVia: string;

}
export async function createDeposit(values: AccountProps, path: string) {
    try {
        const { accountId, depositAmount, depositDate, depositName, payVia, reference } = values;
        // Implement deposit logic here
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB()

        const account = await Account.findById(accountId);

        if (!account) throw new Error(`Account not found`);

        const deposit = new Deposit({
            schoolId,
            accountId,
            depositAmount,
            depositDate,
            depositName,
            reference,
            payVia,
            createdBy: user?._id,
            action_type: "create",
        });

        account.deposits.push(deposit._id);
        account.balance += depositAmount;

        const history =  new History({
            schoolId,
            actionType: 'DEPOSIT_ADDED', // Use a relevant action type
            details: {
                itemId: deposit._id,
                depositAmount,
                depositDate,
                depositName,
                payVia,
                reference,
            },
            message: `${user.fullName} added a deposit of ${depositAmount} to account (ID: ${accountId}) on ${depositDate.toLocaleString()}.`,
            performedBy: user._id, // User who performed the action,
            entityId: deposit._id,  // The ID of the created deposit
            entityType: 'DEPOSIT',  // The type of the entity
        });

        await Promise.all([
            deposit.save(),
            account.save(),
            history.save(),
        ]);
        await account.save();

        revalidatePath(path);
    } catch (error) {
        console.error("Error creating deposit", error);
        throw error;
    }
}

export async function getAllDeposits({ accountId, month }: { accountId: string, month: Date }) {
    try {
        // Fetch current profile
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        // Connect to the database
        await connectToDB();

        // Define the year and month for the query
        const year = month?.getFullYear();
        const queryMonth = month?.getMonth() + 1; // getMonth() returns 0-11, so add 1

        console.log('Year:', year);
        console.log('Month:', queryMonth);

        // Fetch deposits for the given accountId, year, month, and schoolId
        const deposits = await Deposit.find({
            accountId,
            schoolId,
            $expr: {
                $and: [
                    { $eq: [{ $year: '$depositDate' }, year] },
                    { $eq: [{ $month: '$depositDate' }, queryMonth] }
                ]
            }
        });

        console.log('Deposits found:', deposits);

        if (deposits.length === 0) {
            return [];
        }

        return JSON.parse(JSON.stringify(deposits));
    } catch (error) {
        console.error('Error getting all deposits', error);
        throw error;
    }
}


export async function deleteDeposit(id: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');

        await connectToDB();
        const deposit = await Deposit.findByIdAndDelete(id);
        if (!deposit) {
            throw new Error('Deposit not found');
        }
        const account = await Account.findById(deposit.accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        account.deposits = account.deposits.filter((d: string) => d.toString() !== id);
        // account.balance -= deposit.depositAmount;
        await account.save();
        console.log('Deposit deleted successfully');
        return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format  // return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format   // return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format   // return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format   // return

    } catch (error) {
        console.error('Error deleting Deposit from database', error);
        throw error;
    }
}