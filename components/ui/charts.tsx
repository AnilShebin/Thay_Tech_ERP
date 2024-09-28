'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  BarChart as RechartsBarChart,
  Bar,
} from 'recharts';

// Define the type for the data
interface ChartData {
  name: string;
  value: number;
}

interface LineChartProps {
  data: ChartData[]; // Array of data objects
  xAxis: keyof ChartData; // key of the data object for X axis
  yAxis: keyof ChartData; // key of the data object for Y axis
}

export function LineChart({ data, xAxis, yAxis }: LineChartProps) {
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

interface PieChartProps {
  data: ChartData[]; // Array of data objects
}

export function PieChart({ data }: PieChartProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

interface BarChartProps {
  data: ChartData[]; // Array of data objects
  xAxis: keyof ChartData; // key of the data object for X axis
  yAxis: keyof ChartData; // key of the data object for Y axis
}

export function BarChart({ data, xAxis, yAxis }: BarChartProps) {
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