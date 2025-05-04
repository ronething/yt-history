"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TopVideo {
  id: string
  title: string
  channel?: string
  count: number
}

interface TopVideosChartProps {
  topVideos: TopVideo[]
}

export default function TopVideosChart({ topVideos }: TopVideosChartProps) {
  // Format the data for display
  const chartData = topVideos.map((video) => ({
    ...video,
    // Truncate long titles
    shortTitle: video.title.length > 40 ? video.title.substring(0, 37) + "..." : video.title,
  }))

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="shortTitle" width={150} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value: number) => [value, "Views"]} labelFormatter={(label) => label} />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Top 10 Most Watched Videos</h3>
        <div className="space-y-2">
          {chartData.map((video, index) => (
            <div key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
              <div className="font-medium text-sm w-6">{index + 1}.</div>
              <div className="flex-1">
                <a
                  href={video.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline"
                >
                  {video.title}
                </a>
                {video.channel && <div className="text-xs text-muted-foreground">{video.channel}</div>}
              </div>
              <div className="text-sm font-medium">{video.count} views</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
