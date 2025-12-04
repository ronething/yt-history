"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Film, Users, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DailyViewsChart from "@/components/dashboard/daily-views-chart"
import TopVideosChart from "@/components/dashboard/top-videos-chart"
import ViewingTimeChart from "@/components/dashboard/viewing-time-chart"
import ChannelDistributionChart from "@/components/dashboard/channel-distribution-chart"
import StatsOverview from "@/components/dashboard/stats-overview"

// Define interfaces for the processed data
interface Stats {
  totalVideos: number
  oldestDate: string
  newestDate: string
  uniqueChannels: number
  daysDifference: number
}

interface DailyView {
  date: string
  count: number
}

interface HourlyView {
  hour: number
  count: number
}

interface TopVideo {
  id: string
  title: string
  channel?: string
  count: number
}

interface ChannelCount {
  name: string
  count: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [dailyViews, setDailyViews] = useState<DailyView[]>([])
  const [hourlyViews, setHourlyViews] = useState<HourlyView[]>([])
  const [topVideos, setTopVideos] = useState<TopVideo[]>([])
  const [channelCounts, setChannelCounts] = useState<ChannelCount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load the processed data from sessionStorage
    try {
      const statsJson = sessionStorage.getItem("youtubeHistoryStats")
      const dailyViewsJson = sessionStorage.getItem("youtubeHistoryDailyViews")
      const hourlyViewsJson = sessionStorage.getItem("youtubeHistoryHourlyViews")
      const topVideosJson = sessionStorage.getItem("youtubeHistoryTopVideos")
      const channelsJson = sessionStorage.getItem("youtubeHistoryChannels")

      if (!statsJson) {
        setError("No data found. Please upload your YouTube history file.")
        setIsLoading(false)
        return
      }

      setStats(JSON.parse(statsJson))
      setDailyViews(dailyViewsJson ? JSON.parse(dailyViewsJson) : [])
      setHourlyViews(hourlyViewsJson ? JSON.parse(hourlyViewsJson) : [])
      setTopVideos(topVideosJson ? JSON.parse(topVideosJson) : [])
      setChannelCounts(channelsJson ? JSON.parse(channelsJson) : [])
      setIsLoading(false)
    } catch (err) {
      console.error("Error loading data:", err)
      setError("Failed to load the processed data. Please try uploading your file again.")
      setIsLoading(false)
    }
  }, [])

  const handleBackToHome = () => {
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen gradient-bg">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-muted mx-auto" />
            <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold">Loading your insights...</p>
            <p className="text-sm text-muted-foreground">Preparing your YouTube history dashboard</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen gradient-bg">
        <div className="text-center max-w-md mx-auto p-8 animate-scale-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <span className="text-4xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">Oops! Something went wrong</h2>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Button 
            onClick={handleBackToHome}
            className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBackToHome}
              className="rounded-full hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to home</span>
            </Button>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                YouTube History Dashboard
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Your personalized viewing insights
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm">
              <Film className="h-4 w-4 text-primary" />
              <span className="font-medium">{stats.totalVideos.toLocaleString()}</span>
              <span className="text-muted-foreground">videos analyzed</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto space-y-8">
          {/* Stats Overview */}
          <section className="animate-fade-in">
            <StatsOverview stats={stats} />
          </section>

          {/* Charts */}
          <section className="animate-fade-in stagger-2">
            <Tabs defaultValue="daily-views" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
                <TabsTrigger 
                  value="daily-views" 
                  className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Daily Views</span>
                  <span className="sm:hidden">Daily</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="top-videos" 
                  className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  <Film className="h-4 w-4" />
                  <span className="hidden sm:inline">Top Videos</span>
                  <span className="sm:hidden">Videos</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="viewing-time" 
                  className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Viewing Time</span>
                  <span className="sm:hidden">Time</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="channels" 
                  className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Channels</span>
                  <span className="sm:hidden">Channels</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily-views" className="mt-6 animate-fade-in">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-red-500 to-orange-500" />
                          Daily Viewing Activity
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Track how your viewing habits change over time
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <DailyViewsChart dailyViews={dailyViews} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="top-videos" className="mt-6 animate-fade-in">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-orange-500 to-yellow-500" />
                          Most Watched Videos
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Your top 10 most frequently watched videos
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <TopVideosChart topVideos={topVideos} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="viewing-time" className="mt-6 animate-fade-in">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
                          Viewing Time Distribution
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Discover when you watch YouTube throughout the day
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ViewingTimeChart hourlyViews={hourlyViews} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="channels" className="mt-6 animate-fade-in">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-pink-500 to-red-500" />
                          Channel Distribution
                        </CardTitle>
                        <CardDescription className="mt-1">
                          See which content creators you watch the most
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ChannelDistributionChart channelCounts={channelCounts} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} YouTube History Visualizer
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Your data stays in your browser
          </div>
        </div>
      </footer>
    </div>
  )
}
