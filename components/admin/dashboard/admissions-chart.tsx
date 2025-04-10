"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
    {
        name: "Jan",
        admissions: 12,
    },
    {
        name: "Feb",
        admissions: 19,
    },
    {
        name: "Mar",
        admissions: 28,
    },
    {
        name: "Apr",
        admissions: 15,
    },
    {
        name: "May",
        admissions: 22,
    },
    {
        name: "Jun",
        admissions: 30,
    },
]

export function AdmissionsChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="admissions" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}

