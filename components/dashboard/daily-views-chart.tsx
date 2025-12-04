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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur border border-border rounded-xl p-4 shadow-xl">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          {payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">videos watched</p>
      </div>
    )
  }
  return null
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
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-muted-foreground">No data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="50%" stopColor="#f97316" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis 
            dataKey="formattedDate" 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
            interval={Math.ceil(displayData.length / 10)}
            tickLine={false}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
            tickFormatter={(value) => value.toLocaleString()}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="url(#strokeGradient)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
