"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Grade 6",
    score: 78,
  },
  {
    name: "Grade 7",
    score: 82,
  },
  {
    name: "Grade 8",
    score: 76,
  },
  {
    name: "Grade 9",
    score: 84,
  },
  {
    name: "Grade 10",
    score: 80,
  },
  {
    name: "Grade 11",
    score: 88,
  },
  {
    name: "Grade 12",
    score: 92,
  },
]

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" name="Average Score" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  )
}

