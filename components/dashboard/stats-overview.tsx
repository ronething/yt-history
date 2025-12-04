"use client"

import { Calendar, Clock, Film, Users, TrendingUp, Play } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

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

const statCards = [
  {
    key: "totalVideos",
    title: "Total Videos",
    icon: Play,
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-500/10 to-orange-500/10",
    getValue: (stats: Stats) => stats.totalVideos.toLocaleString(),
    getSubtext: (stats: Stats) => `Over ${stats.daysDifference.toLocaleString()} days`,
  },
  {
    key: "avgPerDay",
    title: "Daily Average",
    icon: TrendingUp,
    gradient: "from-orange-500 to-yellow-500",
    bgGradient: "from-orange-500/10 to-yellow-500/10",
    getValue: (stats: Stats) => (stats.totalVideos / (stats.daysDifference || 1)).toFixed(1),
    getSubtext: () => "Videos per day",
  },
  {
    key: "channels",
    title: "Unique Channels",
    icon: Users,
    gradient: "from-pink-500 to-red-500",
    bgGradient: "from-pink-500/10 to-red-500/10",
    getValue: (stats: Stats) => stats.uniqueChannels.toLocaleString(),
    getSubtext: () => "Content creators",
  },
  {
    key: "dateRange",
    title: "History Span",
    icon: Calendar,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    getValue: (stats: Stats) => `${stats.daysDifference.toLocaleString()}`,
    getSubtext: (stats: Stats) => {
      const oldest = new Date(stats.oldestDate)
      const newest = new Date(stats.newestDate)
      return `${oldest.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })} - ${newest.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}`
    },
    suffix: " days",
  },
]

export default function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card 
            key={card.key} 
            className={`relative overflow-hidden border-0 bg-gradient-to-br ${card.bgGradient} backdrop-blur animate-slide-up group hover:scale-[1.02] transition-all duration-300`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Decorative gradient border */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Decorative circles */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl`} />
            
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                      {card.getValue(stats)}
                    </span>
                    {card.suffix && (
                      <span className="text-lg text-muted-foreground">{card.suffix}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {card.getSubtext(stats)}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
