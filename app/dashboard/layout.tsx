import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | YouTube History Visualizer",
  description: "View insights and analytics from your YouTube watch history data.",
  openGraph: {
    title: "Dashboard | YouTube History Visualizer",
    description: "View insights and analytics from your YouTube watch history data.",
    url: "https://playbackstats.com/dashboard",
  },
  twitter: {
    title: "Dashboard | YouTube History Visualizer",
    description: "View insights and analytics from your YouTube watch history data.",
  },
  alternates: {
    canonical: "https://playbackstats.com/dashboard",
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
} 