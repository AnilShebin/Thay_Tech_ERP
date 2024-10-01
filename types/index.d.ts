/* eslint-disable no-unused-vars */

import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from "@/lib/utils";
import { ReactNode } from 'react';

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

/* Define the types for FeatureCard props */
declare interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  chart: JSX.Element;
}

/* Define types for the InsightCard props */
declare interface InsightCardProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

/* Define types for the CustomInput props */
declare interface CustomInputProps {
  control: Control<z.infer<ReturnType<typeof authFormSchema>>>;
  name: FieldPath<z.infer<ReturnType<typeof authFormSchema>>>;
  label: string;
  placeholder: string;
}

/* Define types for the Header props */
declare interface HeaderProps {
  type?: "title" | "greeting"
  title: string
  subtext: string
  user?: string
  jobTitle?: string
}

/* Define types for the Header Notification props */
declare interface NotificationItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
}

/* Define types for the FeatureCard, Chart props */
declare interface ChartData {
  name: string;
  value: number;
}

declare interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  chart: React.ReactNode;
}

