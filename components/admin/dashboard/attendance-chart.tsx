"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
    { name: "Present", value: 92, color: "#22c55e" },
    { name: "Late", value: 5, color: "#eab308" },
    { name: "Absent", value: 3, color: "#ef4444" },
]

export function AttendanceChart() {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}

