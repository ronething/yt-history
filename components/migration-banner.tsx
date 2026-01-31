"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "playbackstats-domain-migration-dismissed"

export default function MigrationBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      const isDismissed = window.localStorage.getItem(STORAGE_KEY)
      setIsVisible(isDismissed !== "true")
    } catch {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, "true")
    } catch {
      // Ignore storage errors
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="w-full border-b border-amber-200 bg-amber-50 text-amber-900">
      <div className="container relative mx-auto px-4 py-2 text-center text-xs sm:text-sm">
        <div className="mx-auto flex flex-wrap items-center justify-center gap-1 leading-5">
          <span className="font-semibold">Official notice:</span>
          <span className="font-medium">youtubestats.forgetimer.com</span>
          <span>has moved to</span>
          <span className="font-semibold">playbackstats.com</span>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300 text-[11px] font-semibold transition hover:bg-amber-100"
          aria-label="Dismiss migration notice"
        >
          X
        </button>
      </div>
    </div>
  )
}
