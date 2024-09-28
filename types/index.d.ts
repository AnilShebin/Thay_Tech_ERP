/* eslint-disable no-unused-vars */

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

/* Define types for the props */
declare interface InsightCardProps {
  name: string;
  role: string;
  content: string;
  image: string;
}


