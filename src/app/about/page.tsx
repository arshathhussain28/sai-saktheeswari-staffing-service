import type { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About Us — 35 Years of Trusted Staffing Since 1991",
  description:
    "Founded in 1991 in Cuddalore, Sai Saktheeswari has grown into one of South India's most trusted staffing institutions — 500+ workforce deployed across 100+ businesses.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Sai Saktheeswari Security & Staffing Services",
    description:
      "35 years of trusted security & manpower staffing — the story, the people, and the standards behind every placement.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
