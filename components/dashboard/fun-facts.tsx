"use client"

import { Flame, Calendar, Trophy, Video, Heart, Zap, LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AdvancedStats {
  longestStreak: number
  maxDailyViews: number
  maxDailyDate: string
  favoriteDay: string
  favoriteDayPercentage: number
  firstVideo: {
    title: string
    channel?: string
    date: string
    url?: string
  }
  topChannelPercentage: number
  weekendWarrior: boolean
}

interface FunFactsProps {
  advancedStats: AdvancedStats
  topChannelName?: string
}

interface Fact {
  icon: LucideIcon
  gradient: string
  title: string
  value: string
  description: string
  bgPattern: string
  url?: string
}

export default function FunFacts({ advancedStats, topChannelName }: FunFactsProps) {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    } catch {
      return dateStr
    }
  }

  const getDayEmoji = (day: string) => {
    const emojis: { [key: string]: string } = {
      'Sunday': '☀️',
      'Monday': '💼',
      'Tuesday': '📅',
      'Wednesday': '🐫',
      'Thursday': '⚡',
      'Friday': '🎉',
      'Saturday': '🎮'
    }
    return emojis[day] || '📺'
  }

  const facts = [
    {
      icon: Flame,
      gradient: "from-red-500 to-orange-500",
      title: "Longest Streak",
      value: `${advancedStats.longestStreak} days`,
      description: "consecutive watching",
      bgPattern: "🔥"
    },
    {
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
      title: "Craziest Day",
      value: `${advancedStats.maxDailyViews} videos`,
      description: formatDate(advancedStats.maxDailyDate),
      bgPattern: "⚡"
    },
    {
      icon: Calendar,
      gradient: "from-blue-500 to-cyan-500",
      title: "Favorite Day",
      value: `${getDayEmoji(advancedStats.favoriteDay)} ${advancedStats.favoriteDay}`,
      description: `${advancedStats.favoriteDayPercentage}% of all views`,
      bgPattern: "📅"
    },
    {
      icon: Video,
      gradient: "from-purple-500 to-pink-500",
      title: "First Memory",
      value: advancedStats.firstVideo.title,
      description: formatDate(advancedStats.firstVideo.date),
      bgPattern: "🎬",
      url: advancedStats.firstVideo.url
    },
    {
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      title: "Loyalty Champion",
      value: topChannelName 
        ? (topChannelName.length > 30 ? topChannelName.substring(0, 30) + '...' : topChannelName)
        : "Unknown Channel",
      description: `${advancedStats.topChannelPercentage}% of your views`,
      bgPattern: "💖"
    },
    {
      icon: Trophy,
      gradient: "from-green-500 to-emerald-500",
      title: advancedStats.weekendWarrior ? "Weekend Warrior" : "Weekday Regular",
      value: advancedStats.weekendWarrior ? "🏆 Champion" : "📚 Consistent",
      description: advancedStats.weekendWarrior 
        ? "You dominate weekends!" 
        : "Balanced throughout the week",
      bgPattern: advancedStats.weekendWarrior ? "🏆" : "📚"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Fun Facts</h2>
          <p className="text-sm text-muted-foreground">Your most interesting stats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facts.map((fact, index) => {
          const Icon = fact.icon
          const cardClassName = `relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:scale-[1.02] group animate-fade-in stagger-${index + 1}`

          const cardContent = (
            <>
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${fact.gradient} opacity-5 rounded-full blur-xl`} />
              <div className="absolute top-2 right-2 text-4xl opacity-5 group-hover:opacity-10 transition-opacity">
                {fact.bgPattern}
              </div>

              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${fact.gradient} shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                      {fact.title}
                    </h3>
                    <p className="font-bold text-lg leading-tight break-words">
                      {fact.value}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pl-12">
                  {fact.description}
                </p>
              </CardContent>
            </>
          )

          if (fact.url) {
            return (
              <a
                key={index}
                href={fact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className={`${cardClassName} cursor-pointer`}>
                  {cardContent}
                </Card>
              </a>
            )
          }

          return (
            <Card key={index} className={cardClassName}>
              {cardContent}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
