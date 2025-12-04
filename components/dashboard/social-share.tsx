"use client"

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  RedditIcon,
} from "react-share"
import { Coffee } from "lucide-react"

const SHARE_URL = "https://youtubestats.forgetimer.com"
const SHARE_TITLE = "Check out this awesome YouTube History Visualizer! Analyze your YouTube watching habits with beautiful charts and insights."
const KOFI_URL = "https://ko-fi.com/ashing"

// Custom Reddit share button since react-share uses wrong URL (web/submit instead of reddit.com/submit)
function CustomRedditShareButton({ url, title, children }: { url: string; title: string; children: React.ReactNode }) {
  const handleClick = () => {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    window.open(redditUrl, "_blank", "noopener,noreferrer,width=600,height=600")
  }

  return (
    <button
      onClick={handleClick}
      className="transition-transform hover:scale-110 cursor-pointer"
      aria-label="Share on Reddit"
    >
      {children}
    </button>
  )
}

export default function SocialShare() {
  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Enjoy the insights?</h3>
        <p className="text-sm text-muted-foreground">
          Share this tool with your friends!
        </p>
      </div>
      <div className="flex items-center gap-3">
        <FacebookShareButton url={SHARE_URL} className="transition-transform hover:scale-110">
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <TwitterShareButton url={SHARE_URL} title={SHARE_TITLE} className="transition-transform hover:scale-110">
          <XIcon size={40} round />
        </TwitterShareButton>

        <WhatsappShareButton url={SHARE_URL} title={SHARE_TITLE} className="transition-transform hover:scale-110">
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <CustomRedditShareButton url={SHARE_URL} title={SHARE_TITLE}>
          <RedditIcon size={40} round />
        </CustomRedditShareButton>

        <span className="w-px h-8 bg-border mx-1" />

        <a
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF5E5B] text-white transition-transform hover:scale-110"
          aria-label="Support on Ko-fi"
        >
          <Coffee className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}
