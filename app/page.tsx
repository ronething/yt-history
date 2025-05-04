import Link from "next/link"
import { ArrowRight, BarChart2, Clock, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FileUploadForm from "@/components/file-upload-form"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">YouTube History Visualizer</h1>
          <nav className="ml-auto flex gap-4">
            <Link href="#how-it-works" className="text-sm font-medium hover:underline">
              How It Works
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:underline">
              FAQ
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover Your YouTube Viewing Habits
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Upload your YouTube watch history and get personalized insights into your viewing patterns. No login
                  required, and your data never leaves your browser.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <Link href="#upload" className="flex items-center gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link
                      href="#how-to-export"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      How to Export Data
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/youtube-analytics-overview.png"
                  alt="YouTube Analytics Dashboard"
                  className="rounded-lg object-cover border shadow-lg"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="upload" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Upload Your Watch History
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px] mx-auto">
                  Simply upload your watch-history.json file from Google Takeout to visualize your YouTube viewing
                  patterns.
                </p>
              </div>
              <div className="w-full max-w-md mx-auto">
                <FileUploadForm />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Insights</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px] mx-auto">
                  Discover patterns in your YouTube viewing history with our comprehensive analytics.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5" />
                      Viewing Trends
                    </CardTitle>
                    <CardDescription>See how your viewing habits change over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Visualize daily, weekly, and monthly viewing patterns with interactive charts.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Watch Time Analysis
                    </CardTitle>
                    <CardDescription>Understand when you watch the most</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Discover your peak viewing hours and how your habits have evolved over time.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Private & Secure
                    </CardTitle>
                    <CardDescription>Your data stays on your device</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>All processing happens in your browser. We never store or transmit your watch history.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px] mx-auto">
                  Our tool makes it easy to visualize your YouTube viewing history in just a few steps.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Export Your Data</h3>
                  <p className="text-gray-500 text-center">Download your watch history from Google Takeout</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Upload the File</h3>
                  <p className="text-gray-500 text-center">Drop your watch-history.json file into our tool</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Explore Insights</h3>
                  <p className="text-gray-500 text-center">
                    View interactive charts and discover your viewing patterns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-to-export" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How to Export YouTube History
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px] mx-auto">
                  Follow these steps to download your YouTube watch history from Google Takeout.
                </p>
              </div>
              <div className="w-full max-w-3xl mx-auto mt-8">
                <ol className="space-y-4 text-left list-decimal list-inside">
                  <li className="p-4 bg-background rounded-lg shadow-sm">
                    Visit{" "}
                    <a
                      href="https://takeout.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Takeout
                    </a>{" "}
                    and ensure you're logged into the correct Google account.
                  </li>
                  <li className="p-4 bg-background rounded-lg shadow-sm">
                    In the product list, deselect all items, then select only "YouTube and YouTube Music".
                  </li>
                  <li className="p-4 bg-background rounded-lg shadow-sm">
                    Click the "All YouTube data included" button next to "YouTube and YouTube Music".
                  </li>
                  <li className="p-4 bg-background rounded-lg shadow-sm">
                    In the pop-up options, deselect all items, keeping only "history" checked.
                  </li>
                  <li className="p-4 bg-background rounded-lg shadow-sm">
                    Click "OK", then scroll to the bottom of the page and click "Next step".
                  </li>
                  <li className="p-4 bg-background rounded-lg shadow-sm">
                    Choose your preferred export frequency, file type, and size. For a one-time export, keep the default
                    settings.
                  </li>
                  <li className="p-4 bg-background rounded-lg shadow-sm">
                    Click "Create export" and wait for Google to prepare your data (this may take a few minutes to
                    several hours).
                  </li>
                  <li className="p-4 bg-background rounded-lg shadow-sm">
                    Once ready, you'll receive an email. Click the download link in the email.
                  </li>
                  <li className="p-4 bg-background rounded-lg shadow-sm">Download and unzip the file.</li>
                  <li className="p-4 bg-background rounded-lg shadow-sm">
                    In the extracted folder, locate the{" "}
                    <code className="bg-muted p-1 rounded">
                      Takeout/YouTube and YouTube Music/history/watch-history.json
                    </code>{" "}
                    file.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px] mx-auto">
                  Common questions about our YouTube History Visualizer.
                </p>
              </div>
              <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Is my data secure?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Yes, all processing happens directly in your browser. We never store, transmit, or have access to
                      your watch history data.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Do I need to create an account?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      No, this tool is completely account-free. Simply upload your watch history file and start
                      exploring your data.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>How far back does the data go?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      The data goes back as far as your Google account has been tracking your YouTube watch history. For
                      many users, this could be several years.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Can I save my visualizations?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Yes, you can download or screenshot the charts and insights from the dashboard after uploading
                      your data.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
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
