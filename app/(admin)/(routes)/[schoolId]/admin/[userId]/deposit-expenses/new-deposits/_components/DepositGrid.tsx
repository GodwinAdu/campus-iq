"use client";

import { toast } from "@/hooks/use-toast";
import { getAllDeposits } from "@/lib/actions/deposit.actions";
import React, { useEffect, useState } from "react";
import moment from "moment";
import MonthSelection from "@/components/commons/MonthSelection";
import AccountSelection from "@/components/commons/AccountSelection";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./column";



interface DepositGridProps {
    accounts: IAccount[];
}

const DepositGrid: React.FC<DepositGridProps> = ({ accounts }) => {
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
    const [selectedAccount, setSelectedAccount] = useState(accounts[0]._id);
    const [isLoading, setIsLoading] = useState(false);
    const [rowData, setRowData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const monthDate = new Date()
            console.log(monthDate, "monthDate")

            try {
                setIsLoading(true);
                const data = await getAllDeposits({
                    month: new Date(selectedMonth),
                    accountId: selectedAccount as string,
                });
                const formattedData = data.map((deposit: { depositDate: string; amount: number; description: string; }) => ({
                    ...deposit,
                    depositDate: moment(deposit.depositDate).format("MMMM Do YYYY HH:mm"), // Adjust format as needed
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
    }, [selectedAccount, selectedMonth]);


    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">
                <div className="flex gap-3 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Month</label>
                    <MonthSelection selectedMonth={setSelectedMonth} />
                </div>
                <div className="flex gap-3 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Account</label>
                    <AccountSelection selectedAccount={setSelectedAccount} accounts={accounts} />
                </div>
            </div>
            <div className="">
                <DataTable searchKey="depositName" data={rowData} columns={columns} isLoading={isLoading} />
            </div>
        </>
    );
};

export default DepositGrid;
