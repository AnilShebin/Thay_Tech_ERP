import {
  PieChart as PieChartIcon,
  TrendingUp,
  CheckSquare,
  Zap,
} from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <CheckSquare className="h-8 w-8 text-green-500" />,
      title: "Connect Your Data",
      description:
        "Securely integrate your financial data sources with our platform.",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "In-Depth Reporting",
      description:
        "Get comprehensive reports that break down your financial performance and trends.",
    },
    {
      icon: <PieChartIcon className="h-8 w-8 text-blue-500" />,
      title: "Generate Insights",
      description:
        "Receive detailed reports and actionable insights from the analysis.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: "Continuous Improvement",
      description:
        "Our system learns and adapts, constantly improving its accuracy and efficiency.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 relative">
          How It Works
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-1"
              style={{
                backgroundImage: "url(/textures/subtle-texture.webp)",
                backgroundSize: "cover",
                border: "1px solid transparent",
                backgroundClip: "padding-box",
                borderRadius: "1rem",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg opacity-25 blur-md"></div>
              <div className="relative z-10 text-center p-4">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-gradient-to-r from-green-200 to-green-300 shadow-inner transform hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
