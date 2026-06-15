import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import PromoBanner from '@/components/promo-banner'

export const metadata: Metadata = {
  metadataBase: new URL('https://playbackstats.com'),
  authors: [{ name: 'YouTube History Visualizer' }],
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-domain="playbackstats.com"
          src="https://plausible.vibecodinghub.org/js/script.file-downloads.outbound-links.js"
        />
        <Script id="plausible-custom">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
      </head>
      <body>
        <PromoBanner />
        {children}
      </body>
    </html>
  )
}
