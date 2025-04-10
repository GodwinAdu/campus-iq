"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface FeeCollectionChartProps {
    data: {
        name: string
        collected: number
        pending: number
    }[]
}

export function FeeCollectionChart({data}: FeeCollectionChartProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="collected" name="Collected" fill="#3b82f6" />
                <Bar dataKey="pending" name="Pending" fill="#ef4444" />
            </BarChart>
        </ResponsiveContainer>
    )
}

