"use client"

import { toast } from '@/hooks/use-toast';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { getAllExpenses } from '@/lib/actions/expenses.actions';
import MonthSelection from '@/components/commons/MonthSelection';
import AccountSelection from '@/components/commons/AccountSelection';
import { DataTable } from '@/components/table/data-table';
import { columns } from './column';

const ExpensesGrid = ({ accounts }: { accounts: IAccount[] }) => {

    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

    const [selectedAccount, setSelectedAccount] = useState(accounts[0]._id);

    const [isLoading, setIsLoading] = useState(false);
    
    const [rowData, setRowData] = useState([]);


    console.log(selectedAccount, "account selected");

    useEffect(() => {
        const fetchData = async () => {
            const monthDate = new Date()
            console.log(monthDate, "monthDate")

            try {
                setIsLoading(true);
                const data = await getAllExpenses({
                    month: new Date(selectedMonth),
                    accountId: selectedAccount as string,
                });
                const formattedData = data.map((expenses: { expenseDate: string; expensesName: string; amount: number; }) => ({
                    ...expenses,
                    expenseDate: moment(expenses.expenseDate).format("MMMM Do YYYY HH:mm"), // Adjust format as needed
                }));
                setRowData(formattedData);
            } catch (error) {
                console.log(error);
                toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedAccount,selectedMonth]);



    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">
                <div className="flex gap-3 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Month</label>
                    <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
                </div>
                <div className="flex gap-3 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Account</label>
                    <AccountSelection selectedAccount={(value) => setSelectedAccount(value)} accounts={accounts} />
                </div>

            </div>
            <div className="" >
                <DataTable searchKey='expensesName' data={rowData} columns={columns} isLoading={isLoading} />
            </div>

        </>
    )
}

export default ExpensesGrid
