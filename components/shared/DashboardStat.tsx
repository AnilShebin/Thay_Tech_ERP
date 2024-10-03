import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface DashboardStatProps {
  title: string;
  value: number | string;
  icon: string;
  previousValue?: number;
  type: "default" | "percentage" | "currency";
}

export default function DashboardStat({
  title,
  value,
  icon,
  previousValue,
  type,
}: DashboardStatProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === "string") return val;
    switch (type) {
      case "percentage":
        return `${val.toFixed(1)}%`;
      case "currency":
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(val);
      default:
        return val.toLocaleString("en-IN");
    }
  };

  const calculateChange = () => {
    if (typeof value === "string" || typeof previousValue === "undefined")
      return null;
    const change = ((value - previousValue) / previousValue) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0,
    };
  };

  const change = calculateChange();

  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </p>
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
            <Image
              src={icon}
              width={20}
              height={20}
              alt={`${title} icon`}
              className="h-5 w-5 text-blue-600 dark:text-blue-300"
            />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatValue(value)}
          </p>
          {change && (
            <Badge
              variant={change.isPositive ? "default" : "destructive"}
              className={`text-xs ${
                change.isPositive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              }`}
            >
              {change.isPositive ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              )}
              {change.value}%
            </Badge>
          )}
        </div>
        {previousValue !== undefined && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Previous: {formatValue(previousValue)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
