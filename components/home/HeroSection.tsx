import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, Lock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-36 pb-36 px-4">
      <div className="max-w-7xl mx-auto text-center relative z-40">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent leading-tight animate-slow-color-change">
          Transform Your Audit Experience
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 text-gray-800 leading-relaxed">
          Experience the future with Jothilingam&apos;s cutting-edge auditing
          solution.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/sign-in" passHref>
            <Button
              size="lg"
              variant="default"
              className="bg-gradient-to-r text-white from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Lock className="mr-2 h-5 w-5" />
              Login to Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
