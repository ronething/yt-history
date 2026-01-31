import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy | YouTube History Visualizer",
  description: "Privacy policy and data handling practices for the YouTube History Visualizer tool.",
  openGraph: {
    title: "Privacy Policy | YouTube History Visualizer",
    description: "Privacy policy and data handling practices for the YouTube History Visualizer tool.",
    url: "https://playbackstats.com/privacy",
  },
  twitter: {
    title: "Privacy Policy | YouTube History Visualizer",
    description: "Privacy policy and data handling practices for the YouTube History Visualizer tool.",
  },
  alternates: {
    canonical: "https://playbackstats.com/privacy",
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">YouTube History Visualizer</h1>
          </Link>
          <nav className="ml-auto flex gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Privacy Policy</h1>
              <p className="text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p>
                At YouTube History Visualizer, we take your privacy seriously. This Privacy Policy explains how we
                handle your data when you use our service to visualize your YouTube watch history.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Data Collection and Processing</h2>
              <p>
                <strong>Client-Side Processing Only:</strong> Our service operates entirely within your web browser.
                When you upload your YouTube watch history file:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The file is processed locally on your device</li>
                <li>Your data is never sent to our servers</li>
                <li>We do not store, collect, or transmit any of your personal data</li>
                <li>
                  The data is temporarily stored in your browser&apos;s memory only for the duration of your session
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Information Usage</h2>
              <p>
                Since we do not collect any personal data, we do not use your information for any purposes beyond
                providing the visualization service directly in your browser.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Cookies and Tracking</h2>
              <p>
                Our website does not use cookies or tracking technologies to monitor your activity or collect
                information about you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Third-Party Services</h2>
              <p>
                We do not integrate with third-party services that would collect your data. All processing and
                visualization happen locally in your web browser.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Data Security</h2>
              <p>
                Since your data never leaves your device, the security of your data depends on your own device&apos;s
                security. We recommend:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using up-to-date browsers with strong security features</li>
                <li>Ensuring your device has proper security measures in place</li>
                <li>Closing the browser tab when you&apos;re done using our service</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any
                changes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                support@playbackstats.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © {new Date().getFullYear()} YouTube History Visualizer. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
} 