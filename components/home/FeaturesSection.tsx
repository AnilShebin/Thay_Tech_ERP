"use client";

import { useState, useEffect } from "react";
import { BarChart3, PieChartIcon, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts";
import { ChartData, FeatureCardProps } from "@/types";

function LineChart({
  data,
  xAxis,
  yAxis,
}: {
  data: ChartData[];
  xAxis: keyof ChartData;
  yAxis: keyof ChartData;
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={yAxis} stroke="#8884d8" />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

function PieChart({ data }: { data: ChartData[] }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

function BarChart({
  data,
  xAxis,
  yAxis,
}: {
  data: ChartData[];
  xAxis: keyof ChartData;
  yAxis: keyof ChartData;
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yAxis} fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

function FeatureCard({ icon, title, description, chart }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white/20 backdrop-blur-lg border border-white/30">
      <CardHeader className="flex items-center space-x-4 bg-gradient-to-r from-white/10 to-white/20">
        <div className="p-3 bg-white/30 rounded-full shadow-md backdrop-blur-sm">
          {icon}
        </div>
        <CardTitle className="text-lg font-bold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4">{chart}</div>
      </CardContent>
    </Card>
  );
}

export default function FeaturesSection() {
  const [features, setFeatures] = useState<FeatureCardProps[]>([]);

  useEffect(() => {
    setFeatures([
      {
        icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
        title: "Real-time Analytics",
        description:
          "Track key performance indicators and audit progress in real-time with AI-driven insights.",
        chart: (
          <LineChart
            data={[
              { name: "Jan", value: 100 },
              { name: "Feb", value: 120 },
              { name: "Mar", value: 110 },
              { name: "Apr", value: 140 },
              { name: "May", value: 130 },
              { name: "Jun", value: 160 },
            ]}
            xAxis="name"
            yAxis="value"
          />
        ),
      },
      {
        icon: <PieChartIcon className="h-8 w-8 text-purple-500" />,
        title: "Intelligent Resource Allocation",
        description:
          "Optimize your team's workload with AI-powered resource management and predictive scheduling.",
        chart: (
          <PieChart
            data={[
              { name: "Audit A", value: 30 },
              { name: "Audit B", value: 25 },
              { name: "Audit C", value: 20 },
              { name: "Other", value: 25 },
            ]}
          />
        ),
      },
      {
        icon: <BarChart3 className="h-8 w-8 text-indigo-500" />,
        title: "Advanced Performance Metrics",
        description:
          "Measure and improve your team's efficiency with AI-enhanced performance analytics and benchmarking.",
        chart: (
          <BarChart
            data={[
              { name: "Team A", value: 85 },
              { name: "Team B", value: 92 },
              { name: "Team C", value: 78 },
              { name: "Team D", value: 88 },
            ]}
            xAxis="name"
            yAxis="value"
          />
        ),
      },
    ]);
  }, []);

  return (
    <section id="features" className="py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 relative">
          Key Features
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
