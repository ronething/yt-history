"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { ExternalLink, Play } from "lucide-react"

interface TopVideo {
  id: string
  title: string
  channel?: string
  count: number
}

interface TopVideosChartProps {
  topVideos: TopVideo[]
}

const GRADIENT_COLORS = [
  { start: "#ef4444", end: "#f97316" },
  { start: "#f97316", end: "#eab308" },
  { start: "#ec4899", end: "#ef4444" },
  { start: "#a855f7", end: "#ec4899" },
  { start: "#6366f1", end: "#a855f7" },
  { start: "#3b82f6", end: "#6366f1" },
  { start: "#14b8a6", end: "#3b82f6" },
  { start: "#22c55e", end: "#14b8a6" },
  { start: "#84cc16", end: "#22c55e" },
  { start: "#eab308", end: "#84cc16" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card/95 backdrop-blur border border-border rounded-xl p-4 shadow-xl max-w-xs">
        <p className="font-medium text-sm line-clamp-2 mb-1">{data.title}</p>
        {data.channel && (
          <p className="text-xs text-muted-foreground mb-2">{data.channel}</p>
        )}
        <p className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          {data.count} views
        </p>
      </div>
    )
  }
  return null
}

export default function TopVideosChart({ topVideos }: TopVideosChartProps) {
  // Format the data for display
  const chartData = topVideos.map((video, index) => ({
    ...video,
    // Truncate long titles
    shortTitle: video.title.length > 35 ? video.title.substring(0, 32) + "..." : video.title,
    fill: GRADIENT_COLORS[index % GRADIENT_COLORS.length].start,
  }))

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">🎬</span>
          </div>
          <p className="text-muted-foreground">No data available</p>
        </div>
      </div>
    )
  }

  const maxCount = Math.max(...chartData.map(v => v.count))

  return (
    <div className="space-y-8">
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
            <defs>
              {GRADIENT_COLORS.map((colors, index) => (
                <linearGradient key={index} id={`barGradient${index}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={colors.start} />
                  <stop offset="100%" stopColor={colors.end} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              type="number" 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              type="category" 
              dataKey="shortTitle" 
              width={140} 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#barGradient${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Detailed List</h3>
        <div className="space-y-2">
          {chartData.map((video, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-200"
            >
              <div 
                className="flex items-center justify-center w-8 h-8 rounded-lg text-white text-sm font-bold"
                style={{ background: `linear-gradient(135deg, ${GRADIENT_COLORS[index].start}, ${GRADIENT_COLORS[index].end})` }}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={video.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary transition-colors line-clamp-1 flex items-center gap-1 group/link"
                >
                  {video.title}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
                {video.channel && (
                  <p className="text-xs text-muted-foreground line-clamp-1">{video.channel}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(video.count / maxCount) * 100}%`,
                      background: `linear-gradient(90deg, ${GRADIENT_COLORS[index].start}, ${GRADIENT_COLORS[index].end})`
                    }}
                  />
                </div>
                <span className="text-sm font-semibold tabular-nums w-12 text-right">{video.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
