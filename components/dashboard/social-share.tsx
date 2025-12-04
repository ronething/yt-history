"use client"

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  RedditIcon,
} from "react-share"

const SHARE_URL = "https://youtubestats.forgetimer.com"
const SHARE_TITLE = "Check out this awesome YouTube History Visualizer! Analyze your YouTube watching habits with beautiful charts and insights."

export default function SocialShare() {
  return (
    <div className="flex flex-col items-center gap-4 py-8 px-4">
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

        <RedditShareButton url={SHARE_URL} title={SHARE_TITLE} className="transition-transform hover:scale-110">
          <RedditIcon size={40} round />
        </RedditShareButton>
      </div>
    </div>
  )
}
