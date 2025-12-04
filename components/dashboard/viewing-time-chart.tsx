"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts"
import { Sun, Moon, Sunrise, Sunset } from "lucide-react"

interface HourlyView {
  hour: number
  count: number
}

interface ViewingTimeChartProps {
  hourlyViews: HourlyView[]
}

const getTimeOfDayColor = (hour: number) => {
  if (hour >= 6 && hour < 12) return { start: "#f97316", end: "#eab308" } // Morning - orange to yellow
  if (hour >= 12 && hour < 18) return { start: "#ef4444", end: "#f97316" } // Afternoon - red to orange
  if (hour >= 18 && hour < 22) return { start: "#a855f7", end: "#ec4899" } // Evening - purple to pink
  return { start: "#3b82f6", end: "#6366f1" } // Night - blue to indigo
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const hour = data.hour
    const timeLabel = `${hour.toString().padStart(2, '0')}:00 - ${((hour + 1) % 24).toString().padStart(2, '0')}:00`
    
    let periodLabel = ""
    let PeriodIcon = Sun
    if (hour >= 6 && hour < 12) { periodLabel = "Morning"; PeriodIcon = Sunrise }
    else if (hour >= 12 && hour < 18) { periodLabel = "Afternoon"; PeriodIcon = Sun }
    else if (hour >= 18 && hour < 22) { periodLabel = "Evening"; PeriodIcon = Sunset }
    else { periodLabel = "Night"; PeriodIcon = Moon }
    
    return (
      <div className="bg-card/95 backdrop-blur border border-border rounded-xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <PeriodIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{periodLabel}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-1">{timeLabel}</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          {data.count.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">videos watched</p>
      </div>
    )
  }
  return null
}

export default function ViewingTimeChart({ hourlyViews }: ViewingTimeChartProps) {
  // Format the data for display
  const chartData = hourlyViews.map((item) => ({
    ...item,
    label: `${item.hour.toString().padStart(2, '0')}:00`,
    colors: getTimeOfDayColor(item.hour),
  }))

  const totalVideos = chartData.reduce((sum, item) => sum + item.count, 0)
  const maxCount = Math.max(...chartData.map(item => item.count))
  const peakHour = chartData.find(item => item.count === maxCount)

  // Calculate time period stats
  const morningVideos = chartData.filter(d => d.hour >= 6 && d.hour < 12).reduce((s, d) => s + d.count, 0)
  const afternoonVideos = chartData.filter(d => d.hour >= 12 && d.hour < 18).reduce((s, d) => s + d.count, 0)
  const eveningVideos = chartData.filter(d => d.hour >= 18 && d.hour < 22).reduce((s, d) => s + d.count, 0)
  const nightVideos = chartData.filter(d => d.hour >= 22 || d.hour < 6).reduce((s, d) => s + d.count, 0)

  const timePeriods = [
    { label: "Morning", icon: Sunrise, count: morningVideos, hours: "6AM - 12PM", color: "from-orange-500 to-yellow-500" },
    { label: "Afternoon", icon: Sun, count: afternoonVideos, hours: "12PM - 6PM", color: "from-red-500 to-orange-500" },
    { label: "Evening", icon: Sunset, count: eveningVideos, hours: "6PM - 10PM", color: "from-purple-500 to-pink-500" },
    { label: "Night", icon: Moon, count: nightVideos, hours: "10PM - 6AM", color: "from-blue-500 to-indigo-500" },
  ]

  if (chartData.length === 0 || chartData.every((item) => item.count === 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">🕐</span>
          </div>
          <p className="text-muted-foreground">No data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Time period summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {timePeriods.map((period) => {
          const Icon = period.icon
          const percentage = totalVideos > 0 ? ((period.count / totalVideos) * 100).toFixed(1) : 0
          return (
            <div 
              key={period.label}
              className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${period.color}`}>
                  <Icon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs text-muted-foreground">{period.hours}</span>
              </div>
              <p className="text-lg font-bold">{period.count.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{percentage}% of total</p>
            </div>
          )
        })}
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              {chartData.map((item, index) => (
                <linearGradient key={index} id={`hourGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={item.colors.start} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={item.colors.end} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="label" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              interval={2}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
              tickFormatter={(value) => value.toLocaleString()}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#hourGradient${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Peak hour highlight */}
      {peakHour && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
          <p className="text-sm text-muted-foreground mb-1">Peak Viewing Hour</p>
          <p className="text-lg font-bold">
            {peakHour.label} - {((peakHour.hour + 1) % 24).toString().padStart(2, '0')}:00
          </p>
          <p className="text-sm text-muted-foreground">
            {peakHour.count.toLocaleString()} videos ({((peakHour.count / totalVideos) * 100).toFixed(1)}% of total)
          </p>
        </div>
      )}
    </div>
  )
}
