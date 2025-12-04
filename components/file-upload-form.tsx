"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, FileJson, CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Define interfaces for processed data
interface ProcessedVideoData {
  id: string
  title: string
  channel?: string
  time?: string
}

interface AggregatedData {
  dailyViews: { date: string; count: number }[]
  hourlyViews: { hour: number; count: number }[]
  topVideos: { id: string; title: string; channel?: string; count: number }[]
  channelCounts: { name: string; count: number }[]
  stats: {
    totalVideos: number
    oldestDate: string
    newestDate: string
    uniqueChannels: number
    daysDifference: number
  }
}

export default function FileUploadForm() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [progressStage, setProgressStage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      validateAndSetFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    setError(null)

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      setError("Please upload a JSON file")
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      // 100MB limit
      setError("File size exceeds 100MB limit")
      return
    }

    setFile(file)
  }

  const removeFile = () => {
    setFile(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Process the raw data into aggregated statistics to reduce storage size
  const processData = (rawData: any[]): AggregatedData => {
    // Extract only the necessary fields from each video
    const processedVideos: ProcessedVideoData[] = rawData
      .filter((item) => item && typeof item === "object" && (item.title || item.titleUrl))
      .map((item) => {
        const channel = item.subtitles && item.subtitles.length > 0 ? item.subtitles[0].name : undefined
        return {
          id: item.titleUrl || `video-${Math.random().toString(36).substring(2, 15)}`,
          title: item.title || "Unknown Video",
          channel,
          time: item.time,
        }
      })

    // Calculate daily views
    const dateMap = new Map<string, number>()
    const validDates: Date[] = []

    processedVideos.forEach((video) => {
      if (video.time) {
        try {
          const date = new Date(video.time)
          if (!isNaN(date.getTime())) {
            validDates.push(date)
            const dateString = date.toISOString().split("T")[0] // YYYY-MM-DD format
            dateMap.set(dateString, (dateMap.get(dateString) || 0) + 1)
          }
        } catch (e) {
          // Skip invalid dates
        }
      }
    })

    // Calculate hourly views
    const hourCounts = Array(24)
      .fill(0)
      .map((_, i) => ({ hour: i, count: 0 }))

    processedVideos.forEach((video) => {
      if (video.time) {
        try {
          const date = new Date(video.time)
          if (!isNaN(date.getTime())) {
            const hour = date.getHours()
            hourCounts[hour].count += 1
          }
        } catch (e) {
          // Skip invalid dates
        }
      }
    })

    // Calculate top videos
    const videoCounts = new Map<string, { id: string; title: string; channel?: string; count: number }>()

    processedVideos.forEach((video) => {
      if (videoCounts.has(video.id)) {
        videoCounts.get(video.id)!.count += 1
      } else {
        videoCounts.set(video.id, {
          id: video.id,
          title: video.title,
          channel: video.channel,
          count: 1,
        })
      }
    })

    const topVideos = Array.from(videoCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Calculate channel distribution
    const channelMap = new Map<string, number>()

    processedVideos.forEach((video) => {
      if (video.channel) {
        channelMap.set(video.channel, (channelMap.get(video.channel) || 0) + 1)
      }
    })

    const channelCounts = Array.from(channelMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Calculate overall stats
    let oldestDate = new Date()
    let newestDate = new Date()
    let daysDifference = 1

    if (validDates.length > 0) {
      oldestDate = new Date(Math.min(...validDates.map((date) => date.getTime())))
      newestDate = new Date(Math.max(...validDates.map((date) => date.getTime())))
      daysDifference = Math.max(1, Math.ceil((newestDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24)))
    }

    // Return aggregated data
    return {
      dailyViews: Array.from(dateMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      hourlyViews: hourCounts,
      topVideos,
      channelCounts,
      stats: {
        totalVideos: processedVideos.length,
        oldestDate: oldestDate.toISOString(),
        newestDate: newestDate.toISOString(),
        uniqueChannels: channelMap.size,
        daysDifference,
      },
    }
  }

  const processFile = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)
    setProgressStage("Reading file...")

    try {
      const reader = new FileReader()

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 40)
          setProgress(percentComplete)
        }
      }

      reader.onload = async (event) => {
        try {
          const result = event.target?.result as string
          setProgress(45)
          setProgressStage("Parsing JSON data...")

          // Parse the JSON data
          const data = JSON.parse(result)
          setProgress(50)
          setProgressStage("Analyzing your watch history...")

          // Determine the data format and extract the array of videos
          let videoArray: any[] = []

          if (Array.isArray(data)) {
            videoArray = data
          } else if (typeof data === "object") {
            if (data.items && Array.isArray(data.items)) {
              videoArray = data.items
            } else if (data.watchHistory && Array.isArray(data.watchHistory)) {
              videoArray = data.watchHistory
            } else if (data.videos && Array.isArray(data.videos)) {
              videoArray = data.videos
            }
          }

          if (videoArray.length === 0) {
            throw new Error("Could not find video data in the file")
          }

          setProgress(60)
          setProgressStage("Crunching the numbers...")

          // Process the data to reduce its size
          const processedData = processData(videoArray)
          setProgress(80)
          setProgressStage("Preparing your dashboard...")

          // Store the processed data in sessionStorage (much smaller than the original)
          try {
            sessionStorage.setItem("youtubeHistoryStats", JSON.stringify(processedData.stats))
            sessionStorage.setItem("youtubeHistoryDailyViews", JSON.stringify(processedData.dailyViews))
            sessionStorage.setItem("youtubeHistoryHourlyViews", JSON.stringify(processedData.hourlyViews))
            sessionStorage.setItem("youtubeHistoryTopVideos", JSON.stringify(processedData.topVideos))
            sessionStorage.setItem("youtubeHistoryChannels", JSON.stringify(processedData.channelCounts))
            setProgress(95)
            setProgressStage("Almost there...")
          } catch (storageError) {
            console.error("Storage error:", storageError)
            throw new Error("Failed to store processed data. The file may be too large even after processing.")
          }

          // Complete the progress and navigate
          setProgress(100)
          setProgressStage("Ready!")
          setTimeout(() => {
            router.push("/dashboard")
          }, 600)
        } catch (error: any) {
          console.error("Processing error:", error)
          setError(
            error.message || "Failed to process file. Please ensure it's a valid YouTube watch history JSON file.",
          )
          setIsProcessing(false)
        }
      }

      reader.onerror = () => {
        setError("Error reading file")
        setIsProcessing(false)
      }

      reader.readAsText(file)
    } catch (error) {
      setError("An unexpected error occurred")
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm animate-scale-in flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          {error}
        </div>
      )}

      {!file ? (
        <div
          className={`upload-zone relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer group
            ${isDragging 
              ? "dragging border-primary bg-primary/5 scale-[1.02]" 
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`relative p-4 rounded-2xl transition-all duration-300
              ${isDragging 
                ? "bg-primary/20 scale-110" 
                : "bg-muted group-hover:bg-primary/10"
              }`}>
              <Upload className={`h-10 w-10 transition-all duration-300
                ${isDragging 
                  ? "text-primary" 
                  : "text-muted-foreground group-hover:text-primary"
                }`} />
              {isDragging && (
                <div className="absolute inset-0 rounded-2xl animate-ping bg-primary/20" />
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {isDragging ? "Drop it here!" : "Drop your file here"}
              </h3>
              <p className="text-sm text-muted-foreground">
                or <span className="text-primary font-medium hover:underline">browse</span> to upload
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-xs text-muted-foreground">
              <FileJson className="h-3.5 w-3.5" />
              watch-history.json (Max 100MB)
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <Card className="p-5 animate-scale-in bg-card/50 backdrop-blur border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative p-3 bg-primary/10 rounded-xl">
                <FileJson className="h-6 w-6 text-primary" />
                {!isProcessing && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                )}
              </div>
              <div>
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={removeFile} 
              disabled={isProcessing}
              className="rounded-full hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>

          {isProcessing && (
            <div className="mt-5 space-y-3 animate-fade-in">
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-orange-500 rounded-full transition-all duration-300 ease-out progress-animated"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  {progress < 100 ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                  {progressStage}
                </div>
                <span className="font-mono text-primary font-semibold">{progress}%</span>
              </div>
            </div>
          )}

          {!isProcessing && (
            <Button 
              className="w-full mt-5 h-12 text-base font-semibold bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
              onClick={processFile}
            >
              <span className="flex items-center gap-2">
                Analyze My Watch History
                <span className="text-lg">→</span>
              </span>
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}
