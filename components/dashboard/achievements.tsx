"use client"

import { useState } from "react"
import { Trophy, Film, Flame, Moon, Sun, Heart, Compass, Rocket, Zap, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Stats {
  totalVideos: number
  oldestDate: string
  newestDate: string
  uniqueChannels: number
}

interface AdvancedStats {
  nightOwlScore: number
  earlyBirdScore: number
  longestStreak: number
  maxDailyViews: number
  topChannelPercentage: number
  dailyAverage: number
  weekendWarrior: boolean
}

interface AchievementsProps {
  stats: Stats
  advancedStats: AdvancedStats
}

interface Achievement {
  id: string
  name: string
  icon: any
  description: string
  category: 'time' | 'quantity' | 'loyalty' | 'special'
  gradient: string
  unlocked: boolean
  progress: number
  requirement: string
}

export default function Achievements({ stats, advancedStats }: AchievementsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'time' | 'quantity' | 'loyalty' | 'special'>('all')

  const getYearsOfHistory = () => {
    try {
      const oldestDate = new Date(stats.oldestDate)
      const newestDate = new Date(stats.newestDate)
      const years = (newestDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
      return years
    } catch {
      return 0
    }
  }

  const achievements: Achievement[] = [
    {
      id: 'movie-buff',
      name: 'Movie Buff',
      icon: Film,
      description: 'Watch 1000+ videos',
      category: 'quantity',
      gradient: 'from-yellow-500 to-amber-600',
      unlocked: stats.totalVideos >= 1000,
      progress: Math.min(100, (stats.totalVideos / 1000) * 100),
      requirement: `${stats.totalVideos}/1000 videos`
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      icon: Flame,
      description: 'Watch for 30 consecutive days',
      category: 'time',
      gradient: 'from-red-500 to-orange-500',
      unlocked: advancedStats.longestStreak >= 30,
      progress: Math.min(100, (advancedStats.longestStreak / 30) * 100),
      requirement: `${advancedStats.longestStreak}/30 days`
    },
    {
      id: 'night-owl',
      name: 'Night Owl',
      icon: Moon,
      description: '50%+ late night viewing',
      category: 'time',
      gradient: 'from-blue-500 to-indigo-600',
      unlocked: advancedStats.nightOwlScore >= 50,
      progress: Math.min(100, (advancedStats.nightOwlScore / 50) * 100),
      requirement: `${advancedStats.nightOwlScore}/50%`
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      icon: Sun,
      description: '30%+ morning viewing',
      category: 'time',
      gradient: 'from-orange-500 to-yellow-500',
      unlocked: advancedStats.earlyBirdScore >= 30,
      progress: Math.min(100, (advancedStats.earlyBirdScore / 30) * 100),
      requirement: `${advancedStats.earlyBirdScore}/30%`
    },
    {
      id: 'loyal-fan',
      name: 'Loyal Fan',
      icon: Heart,
      description: 'Top channel > 30%',
      category: 'loyalty',
      gradient: 'from-purple-500 to-pink-500',
      unlocked: advancedStats.topChannelPercentage >= 30,
      progress: Math.min(100, (advancedStats.topChannelPercentage / 30) * 100),
      requirement: `${advancedStats.topChannelPercentage}/30%`
    },
    {
      id: 'content-explorer',
      name: 'Content Explorer',
      icon: Compass,
      description: 'Watch 50+ different channels',
      category: 'loyalty',
      gradient: 'from-teal-500 to-cyan-500',
      unlocked: stats.uniqueChannels >= 50,
      progress: Math.min(100, (stats.uniqueChannels / 50) * 100),
      requirement: `${stats.uniqueChannels}/50 channels`
    },
    {
      id: 'weekend-warrior',
      name: 'Weekend Warrior',
      icon: Rocket,
      description: 'Weekend viewing 2x weekday',
      category: 'special',
      gradient: 'from-green-500 to-emerald-500',
      unlocked: advancedStats.weekendWarrior,
      progress: advancedStats.weekendWarrior ? 100 : 50,
      requirement: advancedStats.weekendWarrior ? 'Unlocked!' : 'Not yet'
    },
    {
      id: 'marathon-runner',
      name: 'Marathon Runner',
      icon: Zap,
      description: 'Watch 50+ videos in a day',
      category: 'quantity',
      gradient: 'from-yellow-400 to-orange-500',
      unlocked: advancedStats.maxDailyViews >= 50,
      progress: Math.min(100, (advancedStats.maxDailyViews / 50) * 100),
      requirement: `${advancedStats.maxDailyViews}/50 videos`
    },
    {
      id: 'veteran',
      name: 'Veteran',
      icon: Target,
      description: '3+ years of history',
      category: 'special',
      gradient: 'from-gray-400 to-gray-600',
      unlocked: getYearsOfHistory() >= 3,
      progress: Math.min(100, (getYearsOfHistory() / 3) * 100),
      requirement: `${getYearsOfHistory().toFixed(1)}/3 years`
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      icon: Zap,
      description: '20+ videos per day average',
      category: 'quantity',
      gradient: 'from-red-400 to-pink-500',
      unlocked: advancedStats.dailyAverage >= 20,
      progress: Math.min(100, (advancedStats.dailyAverage / 20) * 100),
      requirement: `${advancedStats.dailyAverage}/20 per day`
    }
  ]

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory)

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  const categories = [
    { id: 'all' as const, name: 'All', count: totalCount },
    { id: 'time' as const, name: 'Time', count: achievements.filter(a => a.category === 'time').length },
    { id: 'quantity' as const, name: 'Quantity', count: achievements.filter(a => a.category === 'quantity').length },
    { id: 'loyalty' as const, name: 'Loyalty', count: achievements.filter(a => a.category === 'loyalty').length },
    { id: 'special' as const, name: 'Special', count: achievements.filter(a => a.category === 'special').length }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Achievements</h2>
            <p className="text-sm text-muted-foreground">
              Unlocked {unlockedCount}/{totalCount} badges
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedCategory === category.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <TooltipProvider>
          {filteredAchievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <Tooltip key={achievement.id}>
                <TooltipTrigger asChild>
                  <Card
                    className={`relative overflow-hidden transition-all hover:scale-[1.02] cursor-pointer animate-fade-in stagger-${index + 1} ${
                      achievement.unlocked
                        ? 'border-2 border-primary/30 shadow-lg'
                        : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                    }`}
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${achievement.gradient} ${
                      achievement.unlocked ? 'opacity-20' : 'opacity-5'
                    } rounded-full blur-xl`} />
                    
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${achievement.gradient} ${
                          achievement.unlocked ? '' : 'opacity-40'
                        }`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className="font-semibold text-sm">
                            {achievement.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>

                        {!achievement.unlocked && (
                          <div className="w-full space-y-1">
                            <Progress value={achievement.progress} className="h-1.5" />
                            <p className="text-xs text-muted-foreground">
                              {achievement.requirement}
                            </p>
                          </div>
                        )}

                        {achievement.unlocked && (
                          <Badge className={`bg-gradient-to-r ${achievement.gradient} text-white border-0`}>
                            ✓ Unlocked
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {!achievement.unlocked && (
                    <p className="text-xs mt-1">Progress: {achievement.requirement}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </div>
    </div>
  )
}
