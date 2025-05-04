"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface HourlyView {
  hour: number
  count: number
}

interface ViewingTimeChartProps {
  hourlyViews: HourlyView[]
}

export default function ViewingTimeChart({ hourlyViews }: ViewingTimeChartProps) {
  // Format the data for display
  const chartData = hourlyViews.map((item) => ({
    ...item,
    label: `${item.hour}:00`,
  }))

  if (chartData.length === 0 || chartData.every((item) => item.count === 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip
            formatter={(value: number) => [value.toLocaleString(), "Videos Watched"]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
