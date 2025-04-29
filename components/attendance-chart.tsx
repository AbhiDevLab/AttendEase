"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", present: 85, absent: 15 },
  { name: "Tue", present: 90, absent: 10 },
  { name: "Wed", present: 75, absent: 25 },
  { name: "Thu", present: 95, absent: 5 },
  { name: "Fri", present: 80, absent: 20 },
  { name: "Sat", present: 70, absent: 30 },
  { name: "Sun", present: 0, absent: 0 },
]

export function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          formatter={(value: number) => [`${value}%`, ""]}
          labelFormatter={(label) => `${label}`}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Bar dataKey="present" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Present" />
        <Bar dataKey="absent" stackId="a" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Absent" />
      </BarChart>
    </ResponsiveContainer>
  )
}
