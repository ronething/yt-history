import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Terms of Service | YouTube History Visualizer",
  description: "Terms of service and usage conditions for the YouTube History Visualizer tool.",
  openGraph: {
    title: "Terms of Service | YouTube History Visualizer",
    description: "Terms of service and usage conditions for the YouTube History Visualizer tool.",
    url: "https://playbackstats.com/terms",
  },
  twitter: {
    title: "Terms of Service | YouTube History Visualizer",
    description: "Terms of service and usage conditions for the YouTube History Visualizer tool.",
  },
  alternates: {
    canonical: "https://playbackstats.com/terms",
  },
}

export default function TermsOfService() {
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Terms of Service</h1>
              <p className="text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">1. Introduction</h2>
              <p>
                Welcome to YouTube History Visualizer. By accessing or using our website, you agree to be bound by
                these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">2. Description of Service</h2>
              <p>
                YouTube History Visualizer provides a tool for users to visualize their YouTube watch history data.
                The service processes the data locally in the user&apos;s browser to generate visualizations and
                insights about their YouTube viewing habits.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">3. User Responsibilities</h2>
              <p>By using our service, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide your own YouTube history data for processing</li>
                <li>Use the service only for personal, non-commercial purposes</li>
                <li>Not attempt to reverse engineer, modify, or manipulate the service</li>
                <li>Not use the service to violate any laws or regulations</li>
                <li>
                  Accept full responsibility for any consequences that may arise from your use of the visualizations and
                  insights provided
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">4. Intellectual Property</h2>
              <p>
                All content, features, and functionality of YouTube History Visualizer, including but not limited to
                text, graphics, logos, icons, and software code, are the exclusive property of YouTube History
                Visualizer and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to use the service for personal,
                non-commercial purposes only.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">5. Disclaimer of Warranties</h2>
              <p>
                YouTube History Visualizer is provided &quot;as is&quot; and &quot;as available&quot; without any
                warranties of any kind, either express or implied. We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The service will meet your specific requirements</li>
                <li>The service will be uninterrupted, timely, secure, or error-free</li>
                <li>The results obtained from using the service will be accurate or reliable</li>
                <li>Any errors in the service will be corrected</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
              <p>
                In no event shall YouTube History Visualizer, its directors, employees, partners, agents, suppliers, or
                affiliates be liable for any indirect, incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your access to or use of or inability to access or use the service</li>
                <li>Any conduct or content of any third party on the service</li>
                <li>Any content obtained from the service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">7. Data Usage and Privacy</h2>
              <p>
                We process your YouTube history data entirely in your browser. We do not collect, store, or transmit
                any of your personal data. For more information, please refer to our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms of Service at any time at our sole discretion. If
                a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking
                effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our service after any revisions become effective, you agree to be bound
                by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the
                service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws, without regard to its conflict
                of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
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