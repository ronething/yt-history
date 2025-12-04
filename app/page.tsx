import Link from "next/link"
import { ArrowRight, BarChart2, Clock, Star, Upload, Shield, Zap, Github } from "lucide-react"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FileUploadForm from "@/components/file-upload-form"

export const metadata: Metadata = {
  title: "YouTube History Visualizer | Analyze Your Viewing Habits",
  description: "Upload your YouTube watch history and get personalized insights into your viewing patterns. No login required, your data never leaves your browser.",
  openGraph: {
    type: "website",
    url: "https://youtubestats.forgetimer.com/",
    title: "YouTube History Visualizer | Analyze Your Viewing Habits",
    description: "Upload your YouTube watch history and get personalized insights into your viewing patterns. No login required, your data never leaves your browser.",
    siteName: "YouTube History Visualizer",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube History Visualizer | Analyze Your Viewing Habits",
    description: "Upload your YouTube watch history and get personalized insights into your viewing patterns. No login required, your data never leaves your browser.",
  },
  alternates: {
    canonical: "https://youtubestats.forgetimer.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const features = [
  {
    icon: BarChart2,
    title: "Viewing Trends",
    description: "See how your viewing habits change over time",
    detail: "Visualize daily, weekly, and monthly viewing patterns with interactive charts.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Clock,
    title: "Watch Time Analysis",
    description: "Understand when you watch the most",
    detail: "Discover your peak viewing hours and how your habits have evolved over time.",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your data stays on your device",
    detail: "All processing happens in your browser. We never store or transmit your watch history.",
    gradient: "from-purple-500 to-pink-500",
  },
]

const steps = [
  { number: 1, title: "Export Your Data", description: "Download your watch history from Google Takeout" },
  { number: 2, title: "Upload the File", description: "Drop your watch-history.json file into our tool" },
  { number: 3, title: "Explore Insights", description: "View interactive charts and discover your viewing patterns" },
]

const faqs = [
  {
    question: "Is my data secure?",
    answer: "Yes, all processing happens directly in your browser. We never store, transmit, or have access to your watch history data.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No, this tool is completely account-free. Simply upload your watch history file and start exploring your data.",
  },
  {
    question: "How far back does the data go?",
    answer: "The data goes back as far as your Google account has been tracking your YouTube watch history. For many users, this could be several years.",
  },
  {
    question: "Can I save my visualizations?",
    answer: "Yes, you can download or screenshot the charts and insights from the dashboard after uploading your data.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold">YouTube History Visualizer</h1>
          </div>
          <nav className="ml-auto flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link 
              href="https://github.com/ronething/yt-history" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-sm font-medium transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  100% Private - No data leaves your browser
                </div>
                
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Discover Your{" "}
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    YouTube
                  </span>{" "}
                  Viewing Habits
                </h2>
                
                <p className="text-lg text-muted-foreground max-w-xl">
                  Upload your YouTube watch history and get personalized insights into your viewing patterns. 
                  No login required, and your data never leaves your browser.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg shadow-red-500/25 transition-all hover:shadow-xl hover:shadow-red-500/30 hover:scale-105"
                    asChild
                  >
                    <Link href="#upload" className="flex items-center gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#how-to-export">
                      How to Export Data
                    </Link>
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <Link 
                      href="https://github.com/ronething/yt-history" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2"
                    >
                      <Star className="h-4 w-4" /> Star on GitHub
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center animate-fade-in stagger-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-2xl" />
                  <img
                    src="/youtube-analytics-overview.png"
                    alt="YouTube Analytics Dashboard"
                    className="relative rounded-2xl object-cover border shadow-2xl"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section id="upload" className="w-full py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4 max-w-2xl animate-fade-in">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Upload Your Watch History
                </h2>
                <p className="text-muted-foreground text-lg">
                  Simply upload your watch-history.json file from Google Takeout to visualize your YouTube viewing patterns.
                </p>
              </div>
              <div className="w-full max-w-lg mx-auto animate-fade-in stagger-2">
                <FileUploadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powerful Insights</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Discover patterns in your YouTube viewing history with our comprehensive analytics.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card 
                    key={feature.title} 
                    className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.detail}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Our tool makes it easy to visualize your YouTube viewing history in just a few steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div 
                  key={step.number} 
                  className="flex flex-col items-center space-y-4 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl blur-lg opacity-50" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-white text-2xl font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Export Section */}
        <section id="how-to-export" className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How to Export YouTube History
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Follow these steps to download your YouTube watch history from Google Takeout.
              </p>
            </div>
            <div className="w-full max-w-3xl mx-auto">
              <ol className="space-y-3">
                {[
                  <>Visit <a href="https://takeout.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Google Takeout</a> and ensure you're logged into the correct Google account.</>,
                  <>In the product list, deselect all items, then select only "YouTube and YouTube Music".</>,
                  <>Click the "All YouTube data included" button next to "YouTube and YouTube Music".</>,
                  <>In the pop-up options, deselect all items, keeping only "history" checked.</>,
                  <>Click "OK", then scroll to the bottom of the page and click "Next step".</>,
                  <>Choose your preferred export frequency, file type, and size. For a one-time export, keep the default settings.</>,
                  <>Click "Create export" and wait for Google to prepare your data (this may take a few minutes to several hours).</>,
                  <>Once ready, you'll receive an email. Click the download link in the email.</>,
                  <>Download and unzip the file.</>,
                  <>In the extracted folder, locate the <code className="bg-muted px-2 py-1 rounded text-sm font-mono">Takeout/YouTube and YouTube Music/history/watch-history.json</code> file.</>,
                ].map((content, index) => (
                  <li 
                    key={index} 
                    className="flex gap-4 p-4 bg-card/50 backdrop-blur rounded-xl border border-border/50 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-white text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{content}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Common questions about our YouTube History Visualizer.
              </p>
            </div>
            <div className="w-full max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card 
                  key={index} 
                  className="border-0 bg-card/50 backdrop-blur animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} YouTube History Visualizer. All rights reserved.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by <a href="https://forgetimer.com" target="_blank" className="text-primary hover:underline">Forgetimer</a>
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link 
                href="https://github.com/ronething/yt-history" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
