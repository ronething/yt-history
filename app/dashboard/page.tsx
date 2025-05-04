"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Film, User } from "lucide-react"
import { Metadata } from "next"
import Head from "next/head"

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading your YouTube history data...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <Button onClick={handleBackToHome}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Dashboard | YouTube History Visualizer</title>
        <meta name="description" content="View insights and analytics from your YouTube watch history data." />
        <link rel="canonical" href="https://youtubestats.forgetimer.com/dashboard" />
      </Head>
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="icon" onClick={handleBackToHome}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to home</span>
          </Button>
          <h1 className="text-lg font-semibold ml-2">YouTube History Dashboard</h1>
          <div className="ml-auto text-sm text-muted-foreground">
            Analyzing {stats.totalVideos.toLocaleString()} videos
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <StatsOverview stats={stats} />

          <Tabs defaultValue="daily-views" className="mt-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="daily-views" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Daily Views</span>
                <span className="sm:hidden">Daily</span>
              </TabsTrigger>
              <TabsTrigger value="top-videos" className="flex items-center gap-2">
                <Film className="h-4 w-4" />
                <span className="hidden sm:inline">Top Videos</span>
                <span className="sm:hidden">Videos</span>
              </TabsTrigger>
              <TabsTrigger value="viewing-time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Viewing Time</span>
                <span className="sm:hidden">Time</span>
              </TabsTrigger>
              <TabsTrigger value="channels" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Channels</span>
                <span className="sm:hidden">Channels</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="daily-views" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Viewing Activity</CardTitle>
                  <CardDescription>Number of videos watched per day over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <DailyViewsChart dailyViews={dailyViews} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="top-videos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Most Watched Videos</CardTitle>
                  <CardDescription>Your top 10 most frequently watched videos</CardDescription>
                </CardHeader>
                <CardContent>
                  <TopVideosChart topVideos={topVideos} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="viewing-time" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Viewing Time Distribution</CardTitle>
                  <CardDescription>When you watch YouTube throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ViewingTimeChart hourlyViews={hourlyViews} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="channels" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Distribution</CardTitle>
                  <CardDescription>Breakdown of your most watched channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChannelDistributionChart channelCounts={channelCounts} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} YouTube History Visualizer</p>
          <p className="text-sm text-gray-500">Your data never leaves your browser</p>
        </div>
      </footer>
    </div>
  )
}
