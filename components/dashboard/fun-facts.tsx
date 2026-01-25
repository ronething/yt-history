"use client"

import { Flame, Calendar, Trophy, Video, Heart, Zap } from "lucide-react"
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
  }
  topChannelPercentage: number
  weekendWarrior: boolean
}

interface FunFactsProps {
  advancedStats: AdvancedStats
  topChannelName?: string
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
      titleZh: "最长连击",
      value: `${advancedStats.longestStreak} days`,
      valueZh: `${advancedStats.longestStreak} 天`,
      description: "consecutive watching",
      descriptionZh: "连续观看",
      bgPattern: "🔥"
    },
    {
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
      title: "Craziest Day",
      titleZh: "最疯狂的一天",
      value: `${advancedStats.maxDailyViews} videos`,
      valueZh: `${advancedStats.maxDailyViews} 个视频`,
      description: formatDate(advancedStats.maxDailyDate),
      descriptionZh: formatDate(advancedStats.maxDailyDate),
      bgPattern: "⚡"
    },
    {
      icon: Calendar,
      gradient: "from-blue-500 to-cyan-500",
      title: "Favorite Day",
      titleZh: "最爱的日子",
      value: `${getDayEmoji(advancedStats.favoriteDay)} ${advancedStats.favoriteDay}`,
      valueZh: `${getDayEmoji(advancedStats.favoriteDay)} ${advancedStats.favoriteDay}`,
      description: `${advancedStats.favoriteDayPercentage}% of all views`,
      descriptionZh: `占总观看的 ${advancedStats.favoriteDayPercentage}%`,
      bgPattern: "📅"
    },
    {
      icon: Video,
      gradient: "from-purple-500 to-pink-500",
      title: "First Memory",
      titleZh: "第一次记忆",
      value: advancedStats.firstVideo.title.length > 40 
        ? advancedStats.firstVideo.title.substring(0, 40) + '...' 
        : advancedStats.firstVideo.title,
      valueZh: advancedStats.firstVideo.title.length > 40 
        ? advancedStats.firstVideo.title.substring(0, 40) + '...' 
        : advancedStats.firstVideo.title,
      description: formatDate(advancedStats.firstVideo.date),
      descriptionZh: formatDate(advancedStats.firstVideo.date),
      bgPattern: "🎬"
    },
    {
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      title: "Loyalty Champion",
      titleZh: "忠诚冠军",
      value: topChannelName 
        ? (topChannelName.length > 30 ? topChannelName.substring(0, 30) + '...' : topChannelName)
        : "Unknown Channel",
      valueZh: topChannelName 
        ? (topChannelName.length > 30 ? topChannelName.substring(0, 30) + '...' : topChannelName)
        : "未知频道",
      description: `${advancedStats.topChannelPercentage}% of your views`,
      descriptionZh: `占你观看的 ${advancedStats.topChannelPercentage}%`,
      bgPattern: "💖"
    },
    {
      icon: Trophy,
      gradient: "from-green-500 to-emerald-500",
      title: advancedStats.weekendWarrior ? "Weekend Warrior" : "Weekday Regular",
      titleZh: advancedStats.weekendWarrior ? "周末战士" : "工作日常客",
      value: advancedStats.weekendWarrior ? "🏆 Champion" : "📚 Consistent",
      valueZh: advancedStats.weekendWarrior ? "🏆 冠军" : "📚 稳定",
      description: advancedStats.weekendWarrior 
        ? "You dominate weekends!" 
        : "Balanced throughout the week",
      descriptionZh: advancedStats.weekendWarrior 
        ? "你主宰周末！" 
        : "一周内保持平衡",
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
          return (
            <Card 
              key={index}
              className={`relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:scale-[1.02] group animate-fade-in stagger-${index + 1}`}
            >
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
                      {fact.titleZh}
                    </h3>
                    <p className="font-bold text-lg leading-tight break-words">
                      {fact.valueZh}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pl-12">
                  {fact.descriptionZh}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
