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
import { Coffee, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

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
        <h3 className="text-lg font-semibold">❤️ Love these insights?</h3>
        <p className="text-sm text-muted-foreground">
          Share with friends or support the developer!
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-3">
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
      </div>

      {/* Enhanced Donation Area */}
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-2 border-orange-500/20 p-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-2xl" />
          
          <div className="relative space-y-4">
            <div className="text-center">
              <Coffee className="w-12 h-12 mx-auto mb-3 text-orange-500" />
              <h4 className="font-bold text-lg mb-2">Buy me a coffee</h4>
              <p className="text-sm text-muted-foreground">
                Help keep this tool free and ad-free forever
              </p>
            </div>
            
            <Button
              asChild
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 h-12 text-base font-semibold"
            >
              <a
                href={KOFI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-current" />
                Support on Ko-fi
              </a>
            </Button>
            
            {/* Social Proof */}
            <p className="text-xs text-center text-muted-foreground">
              ❤️ Join 127+ supporters who made this possible
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
