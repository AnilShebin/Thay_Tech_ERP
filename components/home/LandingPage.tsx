import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InsightsSection from "@/components/home/InsightsSection";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InsightsSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 lg:px-6 h-20 flex items-center justify-between bg-white/10 backdrop-blur-lg border-b border-white/20">
      <Link href="/" className="flex items-center">
        <Image
          src="/icons/logo.svg"
          alt="Jothilingam Logo"
          width={40}
          height={40}
          className="h-10 w-10 text-blue-600"
        />
        <span className="ml-2 text-2xl font-bold text-gray-900">
          Jothilingam
        </span>
      </Link>
      <nav className="hidden md:flex space-x-6">
        <Link
          href="#features"
          className="text-gray-800 hover:text-blue-600 transition-colors"
        >
          Features
        </Link>
        <Link
          href="#how-it-works"
          className="text-gray-800 hover:text-blue-600 transition-colors"
        >
          How It Works
        </Link>
        <Link
          href="#insights"
          className="text-gray-800 hover:text-blue-600 transition-colors"
        >
          Insights
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        {/* Login Button */}
        <div className="flex items-center space-x-4">
          <Link href="/sign-in" passHref>
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base py-2 px-4"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-teal-50 text-gray-600 py-6 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          &copy; 2024 Jothilingam CA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
