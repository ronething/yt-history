"use client"

import { useMemo } from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface DailyView {
  date: string
  count: number
}

interface DailyViewsChartProps {
  dailyViews: DailyView[]
}

export default function DailyViewsChart({ dailyViews }: DailyViewsChartProps) {
  const chartData = useMemo(() => {
    // Fill in missing dates with zero counts
    const filledData = []
    if (dailyViews.length > 0) {
      const startDate = new Date(dailyViews[0].date)
      const endDate = new Date(dailyViews[dailyViews.length - 1].date)

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split("T")[0]
        const existingEntry = dailyViews.find((item) => item.date === dateString)

        if (existingEntry) {
          filledData.push(existingEntry)
        } else {
          filledData.push({ date: dateString, count: 0 })
        }
      }
    }

    // Format dates for display
    return filledData.map((item) => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "2-digit",
      }),
    }))
  }, [dailyViews])

  // If we have too many data points, we need to reduce them for better visualization
  const displayData = useMemo(() => {
    if (chartData.length <= 365) return chartData

    // For large datasets, aggregate by week or month
    const aggregatedData = []
    let currentWeek = 0
    let weeklyCount = 0
    let weekStartDate = ""

    chartData.forEach((item, index) => {
      const date = new Date(item.date)
      const week = Math.floor(index / 7)

      if (week !== currentWeek) {
        if (weekStartDate) {
          aggregatedData.push({
            date: weekStartDate,
            count: weeklyCount,
            formattedDate: `Week of ${new Date(weekStartDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}`,
          })
        }
        currentWeek = week
        weeklyCount = 0
        weekStartDate = item.date
      }

      weeklyCount += item.count

      // Handle the last week
      if (index === chartData.length - 1) {
        aggregatedData.push({
          date: weekStartDate,
          count: weeklyCount,
          formattedDate: `Week of ${new Date(weekStartDate).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}`,
        })
      }
    })

    return aggregatedData
  }, [chartData])

  if (displayData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} interval={Math.ceil(displayData.length / 12)} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip
            formatter={(value: number) => [value.toLocaleString(), "Videos Watched"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorCount)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
