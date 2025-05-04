import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YouTube History Visualizer | Analyze Your Viewing Habits',
  description: 'Upload your YouTube watch history and get personalized insights into your viewing patterns. No login required, your data never leaves your browser.',
  keywords: 'youtube history, viewing habits, data visualization, video analytics, youtube statistics, watch pattern analysis, privacy',
  authors: [{ name: 'YouTube History Visualizer' }],
  openGraph: {
    type: 'website',
    url: 'https://youtubestats.forgetimer.com/',
    title: 'YouTube History Visualizer | Analyze Your Viewing Habits',
    description: 'Upload your YouTube watch history and get personalized insights into your viewing patterns. No login required, your data never leaves your browser.',
    siteName: 'YouTube History Visualizer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube History Visualizer | Analyze Your Viewing Habits',
    description: 'Upload your YouTube watch history and get personalized insights into your viewing patterns. No login required, your data never leaves your browser.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://youtubestats.forgetimer.com/" />
      </head>
      <body>{children}</body>
    </html>
  )
}
