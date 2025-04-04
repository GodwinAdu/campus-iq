"use server"

import mongoose from "mongoose";
import { currentUser } from "../helpers/current-user";
import RevenueSummary from "../models/revenue-summary.models";
import { connectToDB } from "../mongoose";
// import { getCurrentSessionAndTerm } from '../helpers/current-session-term';


export const fetchCurrentMonthRevenue = async () => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("user not found");

        const schoolId = user.schoolId;

        // const sessionAndTerm = await getCurrentSessionAndTerm()

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        await connectToDB();

        const revenueSummary = await RevenueSummary.findOne({
            schoolId,
            // sessionId: sessionAndTerm.session._id,
            // termId: sessionAndTerm.term._id,
            date: { $gte: startOfMonth, $lt: endOfMonth },
        });

        return revenueSummary
            ? revenueSummary.totalRevenue
            : 0; // Return 0 if no document is found
    } catch (error) {
        console.error("Error fetching current month revenue:", error);
        throw new Error("Failed to fetch current month revenue.");
    }
};


export const totalRevenues = async () => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not found");

        const schoolId = user.schoolId;
        // const sessionAndTerm = await getCurrentSessionAndTerm();
        // if (!sessionAndTerm?.session?._id) throw new Error("Session ID not found");

        await connectToDB();
        // const sessionId = sessionAndTerm.session?._id;

        const revenues = await RevenueSummary.find({ schoolId });

        if (!revenues.length) {
            console.log("No revenues found.");
            return 0;
        }

        const totalRevenue = revenues.reduce((acc, revenue) => acc + revenue.totalRevenue, 0);

        console.log(revenues, "Total Revenue:", totalRevenue);
        return totalRevenue;

    } catch (error) {
        console.error("Error fetching total revenue:", error);
        throw error;
    }
};



export const fetchMonthlyRevenues = async () => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not found");

        await connectToDB();

        const schoolId = new mongoose.Types.ObjectId(user.schoolId);
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear + 1, 0, 1);

        const monthlyRevenue = await RevenueSummary.aggregate([
            {
                $match: {
                    schoolId,
                    date: { $gte: startOfYear, $lt: endOfYear },
                },
            },
            {
                $group: {
                    _id: { $month: "$date" },
                    totalRevenue: { $sum: "$totalRevenue" },
                },
            },
            {
                $sort: { "_id": 1 },
            },
        ]);

        console.log("Aggregated Monthly Revenue:", monthlyRevenue);

        const monthlyData = [
            { name: "Jan", revenue: 0 },
            { name: "Feb", revenue: 0 },
            { name: "Mar", revenue: 0 },
            { name: "Apr", revenue: 0 },
            { name: "May", revenue: 0 },
            { name: "Jun", revenue: 0 },
            { name: "Jul", revenue: 0 },
            { name: "Aug", revenue: 0 },
            { name: "Sep", revenue: 0 },
            { name: "Oct", revenue: 0 },
            { name: "Nov", revenue: 0 },
            { name: "Dec", revenue: 0 },
        ];

        monthlyRevenue.forEach(({ _id, totalRevenue }) => {
            monthlyData[_id - 1].revenue = totalRevenue;
        });

        console.log("Final Monthly Revenue Data:", monthlyData);
        return monthlyData;
    } catch (error) {
        console.error("Error fetching monthly revenues:", error);
        throw new Error("Failed to fetch monthly revenues.");
    }
};
