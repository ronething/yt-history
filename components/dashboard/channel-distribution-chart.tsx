"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import { Users } from "lucide-react"

interface ChannelCount {
  name: string
  count: number
}

interface ChannelDistributionChartProps {
  channelCounts: ChannelCount[]
}

const GRADIENT_COLORS = [
  { start: "#ef4444", end: "#f97316", solid: "#ef4444" },
  { start: "#f97316", end: "#eab308", solid: "#f97316" },
  { start: "#ec4899", end: "#ef4444", solid: "#ec4899" },
  { start: "#a855f7", end: "#ec4899", solid: "#a855f7" },
  { start: "#6366f1", end: "#a855f7", solid: "#6366f1" },
  { start: "#3b82f6", end: "#6366f1", solid: "#3b82f6" },
  { start: "#14b8a6", end: "#3b82f6", solid: "#14b8a6" },
  { start: "#22c55e", end: "#14b8a6", solid: "#22c55e" },
  { start: "#84cc16", end: "#22c55e", solid: "#84cc16" },
  { start: "#eab308", end: "#84cc16", solid: "#eab308" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card/95 backdrop-blur border border-border rounded-xl p-4 shadow-xl">
        <p className="font-medium text-sm mb-2">{data.name}</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          {data.count.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {((data.count / data.total) * 100).toFixed(1)}% of your views
        </p>
      </div>
    )
  }
  return null
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  if (percent < 0.05) return null // Don't show labels for small slices
  
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
      className="text-xs font-medium"
      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function ChannelDistributionChart({ channelCounts }: ChannelDistributionChartProps) {
  if (channelCounts.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">📺</span>
          </div>
          <p className="text-muted-foreground">No channel data available</p>
        </div>
      </div>
    )
  }

  // Calculate total videos for percentage
  const totalVideos = channelCounts.reduce((sum, channel) => sum + channel.count, 0)
  
  // Add total to each item for tooltip
  const chartData = channelCounts.map(item => ({
    ...item,
    total: totalVideos,
  }))

  const maxCount = Math.max(...channelCounts.map(c => c.count))

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {GRADIENT_COLORS.map((colors, index) => (
                  <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={colors.start} />
                    <stop offset="100%" stopColor={colors.end} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={130}
                innerRadius={50}
                fill="#8884d8"
                dataKey="count"
                nameKey="name"
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#pieGradient${index % GRADIENT_COLORS.length})`}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Channel List */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Top Channels</h3>
          </div>
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
            {channelCounts.map((channel, index) => (
              <div 
                key={index} 
                className="group flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-200"
              >
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-white text-xs font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${GRADIENT_COLORS[index % GRADIENT_COLORS.length].start}, ${GRADIENT_COLORS[index % GRADIENT_COLORS.length].end})` }}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{channel.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(channel.count / maxCount) * 100}%`,
                          background: `linear-gradient(90deg, ${GRADIENT_COLORS[index % GRADIENT_COLORS.length].start}, ${GRADIENT_COLORS[index % GRADIENT_COLORS.length].end})`
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold tabular-nums">{channel.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {((channel.count / totalVideos) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-muted/30">
          <p className="text-sm text-muted-foreground mb-1">Top Channel</p>
          <p className="font-semibold line-clamp-1">{channelCounts[0]?.name}</p>
          <p className="text-xs text-muted-foreground">
            {channelCounts[0] && ((channelCounts[0].count / totalVideos) * 100).toFixed(1)}% of all views
          </p>
        </div>
        <div className="p-4 rounded-xl bg-muted/30">
          <p className="text-sm text-muted-foreground mb-1">Top 3 Combined</p>
          <p className="font-semibold">
            {channelCounts.slice(0, 3).reduce((s, c) => s + c.count, 0).toLocaleString()} videos
          </p>
          <p className="text-xs text-muted-foreground">
            {((channelCounts.slice(0, 3).reduce((s, c) => s + c.count, 0) / totalVideos) * 100).toFixed(1)}% of all views
          </p>
        </div>
        <div className="p-4 rounded-xl bg-muted/30 col-span-2 md:col-span-1">
          <p className="text-sm text-muted-foreground mb-1">Diversity Score</p>
          <p className="font-semibold">
            {channelCounts.length >= 10 ? "High" : channelCounts.length >= 5 ? "Medium" : "Low"}
          </p>
          <p className="text-xs text-muted-foreground">
            Based on top {channelCounts.length} channels
          </p>
        </div>
      </div>
    </div>
  )
}
