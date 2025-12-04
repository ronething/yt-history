"use client"

import { useMemo, useState, useCallback } from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ReferenceArea } from "recharts"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface DailyView {
  date: string
  count: number
}

interface DailyViewsChartProps {
  dailyViews: DailyView[]
}

type TimeRange = "30d" | "90d" | "1y" | "all"
type AggregateLevel = "day" | "week" | "month"

interface ChartDataItem {
  date: string
  count: number
  formattedDate: string
  originalDates?: string[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card/95 backdrop-blur border border-border rounded-xl p-4 shadow-xl">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          {payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">videos watched</p>
        {data.originalDates && data.originalDates.length > 1 && (
          <p className="text-xs text-muted-foreground mt-1 opacity-70">
            ({data.originalDates.length} days aggregated)
          </p>
        )}
      </div>
    )
  }
  return null
}

export default function DailyViewsChart({ dailyViews }: DailyViewsChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("all")
  const [brushStartIndex, setBrushStartIndex] = useState<number | undefined>(undefined)
  const [brushEndIndex, setBrushEndIndex] = useState<number | undefined>(undefined)

  // Fill in missing dates with zero counts
  const filledData = useMemo(() => {
    const result: ChartDataItem[] = []
    if (dailyViews.length > 0) {
      const startDate = new Date(dailyViews[0].date)
      const endDate = new Date(dailyViews[dailyViews.length - 1].date)

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split("T")[0]
        const existingEntry = dailyViews.find((item) => item.date === dateString)

        result.push({
          date: dateString,
          count: existingEntry?.count || 0,
          formattedDate: new Date(dateString).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "2-digit",
          }),
        })
      }
    }
    return result
  }, [dailyViews])

  // Filter data by time range
  const filteredData = useMemo(() => {
    if (filledData.length === 0) return []
    
    const now = new Date(filledData[filledData.length - 1].date)
    let cutoffDate: Date

    switch (timeRange) {
      case "30d":
        cutoffDate = new Date(now)
        cutoffDate.setDate(cutoffDate.getDate() - 30)
        break
      case "90d":
        cutoffDate = new Date(now)
        cutoffDate.setDate(cutoffDate.getDate() - 90)
        break
      case "1y":
        cutoffDate = new Date(now)
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 1)
        break
      case "all":
      default:
        return filledData
    }

    return filledData.filter(item => new Date(item.date) >= cutoffDate)
  }, [filledData, timeRange])

  // Determine aggregate level based on data size
  const aggregateLevel = useMemo((): AggregateLevel => {
    const dataLength = filteredData.length
    if (dataLength <= 90) return "day"
    if (dataLength <= 365) return "week"
    return "month"
  }, [filteredData.length])

  // Aggregate data based on level
  const aggregatedData = useMemo((): ChartDataItem[] => {
    if (filteredData.length === 0) return []
    if (aggregateLevel === "day") return filteredData

    const result: ChartDataItem[] = []
    
    if (aggregateLevel === "week") {
      let weekCount = 0
      let weekDates: string[] = []
      let weekStartDate = ""

      filteredData.forEach((item, index) => {
        if (index % 7 === 0 && index > 0) {
          result.push({
            date: weekStartDate,
            count: weekCount,
            formattedDate: `Week of ${new Date(weekStartDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}`,
            originalDates: weekDates,
          })
          weekCount = 0
          weekDates = []
        }

        if (weekDates.length === 0) {
          weekStartDate = item.date
        }
        weekCount += item.count
        weekDates.push(item.date)

        if (index === filteredData.length - 1 && weekDates.length > 0) {
          result.push({
            date: weekStartDate,
            count: weekCount,
            formattedDate: `Week of ${new Date(weekStartDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}`,
            originalDates: weekDates,
          })
        }
      })
    } else {
      // Monthly aggregation
      const monthlyMap = new Map<string, { count: number; dates: string[] }>()

      filteredData.forEach(item => {
        const date = new Date(item.date)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        
        if (!monthlyMap.has(monthKey)) {
          monthlyMap.set(monthKey, { count: 0, dates: [] })
        }
        const entry = monthlyMap.get(monthKey)!
        entry.count += item.count
        entry.dates.push(item.date)
      })

      monthlyMap.forEach((value, key) => {
        const [year, month] = key.split('-')
        const date = new Date(parseInt(year), parseInt(month) - 1, 1)
        result.push({
          date: key + "-01",
          count: value.count,
          formattedDate: date.toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
          }),
          originalDates: value.dates,
        })
      })
    }

    return result
  }, [filteredData, aggregateLevel])

  // Calculate statistics for the current brush range
  const rangeStats = useMemo(() => {
    const data = aggregatedData.slice(
      brushStartIndex ?? 0,
      (brushEndIndex ?? aggregatedData.length - 1) + 1
    )
    
    if (data.length === 0) return null

    const total = data.reduce((sum, item) => sum + item.count, 0)
    const avg = Math.round(total / data.length)
    const max = Math.max(...data.map(item => item.count))
    const min = Math.min(...data.map(item => item.count))
    
    // Calculate trend (compare first half to second half)
    const midPoint = Math.floor(data.length / 2)
    const firstHalf = data.slice(0, midPoint)
    const secondHalf = data.slice(midPoint)
    const firstHalfAvg = firstHalf.reduce((sum, item) => sum + item.count, 0) / (firstHalf.length || 1)
    const secondHalfAvg = secondHalf.reduce((sum, item) => sum + item.count, 0) / (secondHalf.length || 1)
    const trendPercent = firstHalfAvg > 0 
      ? Math.round(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100)
      : 0

    return {
      total,
      avg,
      max,
      min,
      trendPercent,
      dataPoints: data.length,
      startDate: data[0]?.formattedDate,
      endDate: data[data.length - 1]?.formattedDate,
    }
  }, [aggregatedData, brushStartIndex, brushEndIndex])

  const handleBrushChange = useCallback((brushData: any) => {
    if (brushData) {
      setBrushStartIndex(brushData.startIndex)
      setBrushEndIndex(brushData.endIndex)
    }
  }, [])

  const handleResetZoom = useCallback(() => {
    setBrushStartIndex(undefined)
    setBrushEndIndex(undefined)
  }, [])

  const handleTimeRangeChange = useCallback((range: TimeRange) => {
    setTimeRange(range)
    setBrushStartIndex(undefined)
    setBrushEndIndex(undefined)
  }, [])

  if (filledData.length === 0) {
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

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" },
    { value: "all", label: "All Time" },
  ]

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Time Range Selector */}
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTimeRangeChange(option.value)}
              className={`text-xs px-3 h-8 ${
                timeRange === option.value 
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm" 
                  : "hover:bg-muted"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetZoom}
            className="text-xs h-8 gap-1"
            disabled={brushStartIndex === undefined && brushEndIndex === undefined}
          >
            <RotateCcw className="h-3 w-3" />
            Reset View
          </Button>
        </div>
      </div>

      {/* Statistics Summary */}
      {rangeStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <p className="text-xs text-muted-foreground">Total Videos</p>
            <p className="text-lg font-bold">{rangeStats.total.toLocaleString()}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <p className="text-xs text-muted-foreground">
              Avg per {aggregateLevel === "day" ? "Day" : aggregateLevel === "week" ? "Week" : "Month"}
            </p>
            <p className="text-lg font-bold">{rangeStats.avg.toLocaleString()}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <p className="text-xs text-muted-foreground">Peak</p>
            <p className="text-lg font-bold text-green-500">{rangeStats.max.toLocaleString()}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <p className="text-xs text-muted-foreground">Trend</p>
            <div className="flex items-center gap-1">
              {rangeStats.trendPercent > 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-bold text-green-500">+{rangeStats.trendPercent}%</span>
                </>
              ) : rangeStats.trendPercent < 0 ? (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-lg font-bold text-red-500">{rangeStats.trendPercent}%</span>
                </>
              ) : (
                <>
                  <Minus className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg font-bold text-muted-foreground">0%</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Range Info */}
      {rangeStats && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing: {rangeStats.startDate} - {rangeStats.endDate}
          </span>
          <span>
            {rangeStats.dataPoints} {aggregateLevel === "day" ? "days" : aggregateLevel === "week" ? "weeks" : "months"} • 
            View: {aggregateLevel === "day" ? "Daily" : aggregateLevel === "week" ? "Weekly" : "Monthly"}
          </span>
        </div>
      )}

      {/* Chart */}
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={aggregatedData} 
            margin={{ top: 10, right: 10, left: -10, bottom: 40 }}
          >
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
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="hsl(var(--border))" 
              opacity={0.5} 
            />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
              interval={Math.ceil(aggregatedData.length / 8)}
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
              animationDuration={500}
            />
            <Brush
              dataKey="formattedDate"
              height={30}
              stroke="hsl(var(--primary))"
              fill="hsl(var(--muted))"
              travellerWidth={8}
              startIndex={brushStartIndex}
              endIndex={brushEndIndex}
              onChange={handleBrushChange}
              tickFormatter={() => ""}
            >
              <AreaChart data={aggregatedData}>
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </Brush>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Help Text */}
      <p className="text-xs text-center text-muted-foreground">
        💡 Drag the handles on the bottom bar to zoom into a specific time range
      </p>
    </div>
  )
}
