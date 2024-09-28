import { Clock, FileText, Star, Users } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "10,000+", label: "Clients" },
    {
      icon: <FileText className="h-6 w-6" />,
      value: "1M+",
      label: "Audits Completed",
    },
    {
      icon: <Star className="h-6 w-6" />,
      value: "99%",
      label: "Satisfaction Rate",
    },
    { icon: <Clock className="h-6 w-6" />, value: "50%", label: "Time Saved" },
  ];

  return (
    <section className="py-12 px-4 bg-white/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center space-y-2"
            >
              <div className="p-3 bg-blue-100 rounded-full flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
