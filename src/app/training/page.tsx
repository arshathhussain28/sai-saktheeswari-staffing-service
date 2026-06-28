import type { Metadata } from "next";
import TrainingContent from "@/components/pages/TrainingContent";

export const metadata: Metadata = {
  title: "Training Excellence — Every Guard Trained Before Deployment",
  description:
    "Structured training in discipline, safety protocols, communication and weekly refreshers — overseen by our senior training team. No one reaches your site untrained.",
  alternates: { canonical: "/training" },
  openGraph: {
    title: "Training Excellence | Sai Saktheeswari Staffing Services",
    description:
      "Discipline, safety, communication and refresher training — the standards behind every deployment.",
    url: "/training",
  },
};

export default function TrainingPage() {
  return <TrainingContent />;
}
