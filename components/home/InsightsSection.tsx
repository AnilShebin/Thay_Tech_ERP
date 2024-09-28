import Image from "next/image";
import { CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function InsightsSection() {
  const insights = [
    {
      name: "John Doe",
      role: "CFO, Tech Corp",
      content:
        "Jothilingam Auditing has transformed our auditing process. The AI-driven insights have been game-changing for our financial operations.",
      image: "https://avatar.iran.liara.run/public",
    },
    {
      name: "Jane Smith",
      role: "Audit Manager, Finance Inc",
      content:
        "The real-time analytics and resource allocation features have significantly improved our team's efficiency and accuracy.",
      image: "https://avatar.iran.liara.run/public",
    },
    {
      name: "Mike Johnson",
      role: "CEO, Startup X",
      content:
        "As a growing company, Jothilingam Auditing has given us the tools to manage our finances with the precision of a much larger organization.",
      image: "https://avatar.iran.liara.run/public",
    },
  ];

  return (
    <section
      id="insights"
      className="py-20 px-4 bg-gradient-to-br from-blue-200/50 to-purple-200/50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 relative">
          Insights from Our Clients
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <InsightCard key={index} {...insight} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightCard({ name, role, content, image }: InsightCardProps) {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <CardContent className="p-6 relative">
        {/* Add the gradient background in the top right corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-teal-400 transform rotate-45 translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>

        {/* CheckCircle icon, positioned in the top right corner */}
        <CheckCircle className="text-white absolute top-2 right-2 z-10" />

        <div className="flex items-center mb-4">
          <Image
            src={image}
            alt={name}
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
          <div>
            <div className="font-semibold text-gray-800">{name}</div>
            <div className="text-sm text-gray-600">{role}</div>
          </div>
        </div>
        <p className="text-gray-700 mb-4">&quot;{content}&quot;</p>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
