"use client"

import { Calendar, Clock, Film, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Stats {
  totalVideos: number
  oldestDate: string
  newestDate: string
  uniqueChannels: number
  daysDifference: number
}

interface StatsOverviewProps {
  stats: Stats
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const oldestDate = new Date(stats.oldestDate)
  const newestDate = new Date(stats.newestDate)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Videos Watched</CardTitle>
          <Film className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalVideos.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Over {stats.daysDifference.toLocaleString()} days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Per Day</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(stats.totalVideos / (stats.daysDifference || 1)).toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Videos watched daily</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Channels</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueChannels.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Different content creators</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Date Range</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.daysDifference.toLocaleString()} days</div>
          <p className="text-xs text-muted-foreground">
            {oldestDate.toLocaleDateString()} - {newestDate.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
