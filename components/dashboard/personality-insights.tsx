"use client"

import { Moon, Sun, Coffee, Flame, Heart, Compass, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdvancedStats {
  peakHour: number
  nightOwlScore: number
  earlyBirdScore: number
  middayScore: number
  dailyAverage: number
  weekendWarrior: boolean
  topChannelPercentage: number
  channelDiversity: number
}

interface PersonalityInsightsProps {
  advancedStats: AdvancedStats
}

export default function PersonalityInsights({ advancedStats }: PersonalityInsightsProps) {
  const getTimePersonality = () => {
    const { nightOwlScore, earlyBirdScore, middayScore } = advancedStats
    
    if (nightOwlScore > 40) {
      return {
        title: "Night Owl",
        icon: Moon,
        gradient: "from-blue-500 to-indigo-600",
        description: `You're a creature of the night! ${nightOwlScore}% of your viewing happens after 10 PM.`
      }
    } else if (earlyBirdScore > 30) {
      return {
        title: "Early Bird",
        icon: Sun,
        gradient: "from-orange-500 to-yellow-500",
        description: `You catch the worm! ${earlyBirdScore}% of your watching is in the early morning.`
      }
    } else if (middayScore > 25) {
      return {
        title: "Midday Watcher",
        icon: Coffee,
        gradient: "from-amber-500 to-orange-500",
        description: `Lunch break binge-watcher! ${middayScore}% during noon hours.`
      }
    } else {
      return {
        title: "Balanced Viewer",
        icon: TrendingUp,
        gradient: "from-green-500 to-teal-500",
        description: "You watch evenly throughout the day."
      }
    }
  }

  const getIntensityPersonality = () => {
    const { dailyAverage } = advancedStats
    
    if (dailyAverage > 15) {
      return {
        title: "Super Fan",
        icon: Flame,
        gradient: "from-red-500 to-orange-500",
        description: `Hardcore viewer! Averaging ${dailyAverage} videos per day.`
      }
    } else if (dailyAverage > 5) {
      return {
        title: "Regular Viewer",
        icon: Heart,
        gradient: "from-pink-500 to-rose-500",
        description: `Consistent watcher with ${dailyAverage} videos daily.`
      }
    } else {
      return {
        title: "Casual Browser",
        icon: Compass,
        gradient: "from-gray-500 to-slate-500",
        description: `Selective viewer at ${dailyAverage} videos per day.`
      }
    }
  }

  const getLoyaltyPersonality = () => {
    const { topChannelPercentage, channelDiversity } = advancedStats
    
    if (topChannelPercentage > 30) {
      return {
        title: "Loyal Fan",
        icon: Heart,
        gradient: "from-purple-500 to-pink-500",
        description: `${topChannelPercentage}% of your views go to your favorite channel!`
      }
    } else if (channelDiversity > 0.6) {
      return {
        title: "Content Explorer",
        icon: Compass,
        gradient: "from-teal-500 to-cyan-500",
        description: "You love exploring diverse content across many channels."
      }
    } else {
      return {
        title: "Balanced Explorer",
        icon: TrendingUp,
        gradient: "from-blue-500 to-purple-500",
        description: "You balance between favorites and new discoveries."
      }
    }
  }

  const timePersonality = getTimePersonality()
  const intensityPersonality = getIntensityPersonality()
  const loyaltyPersonality = getLoyaltyPersonality()

  const PersonalityCard = ({ 
    personality, 
    delay 
  }: { 
    personality: ReturnType<typeof getTimePersonality>
    delay: string
  }) => {
    const Icon = personality.icon
    
    return (
      <div className={`relative group animate-fade-in ${delay}`}>
        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl -z-10"
          style={{
            backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
          }}
        />
        <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:scale-[1.02] h-full">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${personality.gradient} opacity-10 rounded-full blur-2xl`} />
          
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${personality.gradient}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{personality.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {personality.description}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Your Viewing Personality</h2>
          <p className="text-sm text-muted-foreground">Discover your unique YouTube habits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PersonalityCard personality={timePersonality} delay="stagger-1" />
        <PersonalityCard personality={intensityPersonality} delay="stagger-2" />
        <PersonalityCard personality={loyaltyPersonality} delay="stagger-3" />
      </div>

      {advancedStats.weekendWarrior && (
        <div className="animate-fade-in stagger-4">
          <Card className="border-2 border-green-500/20 bg-gradient-to-r from-green-500/5 to-emerald-500/5">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  🏆 Weekend Warrior
                </Badge>
                <p className="text-sm text-muted-foreground">
                  You watch significantly more on weekends!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
