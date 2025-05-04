"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

interface ChannelCount {
  name: string
  count: number
}

interface ChannelDistributionChartProps {
  channelCounts: ChannelCount[]
}

export default function ChannelDistributionChart({ channelCounts }: ChannelDistributionChartProps) {
  // Colors for the pie chart
  const COLORS = [
    "#8884d8",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
    "#ffc658",
    "#ff8042",
    "#ff6361",
    "#bc5090",
    "#808080", // for "Other"
  ]

  if (channelCounts.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No channel data available</p>
      </div>
    )
  }

  // Calculate total videos for percentage
  const totalVideos = channelCounts.reduce((sum, channel) => sum + channel.count, 0)

  return (
    <div className="space-y-6">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={channelCounts}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="count"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {channelCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [value.toLocaleString(), "Videos Watched"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Top Channels</h3>
        <div className="space-y-2">
          {channelCounts.map((channel, index) => (
            <div key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <div className="flex-1 text-sm font-medium">{channel.name}</div>
              <div className="text-sm">{channel.count.toLocaleString()} videos</div>
              <div className="text-sm text-muted-foreground">{((channel.count / totalVideos) * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
