import type { Metadata } from "next";
import IndustriesContent from "@/components/pages/IndustriesContent";

export const metadata: Metadata = {
  title: "Industries We Serve — Manufacturing, Logistics, Campuses & More",
  description:
    "Trained security & manpower for manufacturing, logistics, construction, commercial facilities, corporate offices and educational institutions across Tamil Nadu & Puducherry.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries We Serve | Sai Saktheeswari Security & Staffing Services",
    description:
      "Workforce matched to the demands of your industry — from factory floors to college campuses.",
    url: "/industries",
  },
};

export default function IndustriesPage() {
  return <IndustriesContent />;
}
