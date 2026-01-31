import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import MigrationBanner from '@/components/migration-banner'

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
        <MigrationBanner />
        {children}
      </body>
    </html>
  )
}
