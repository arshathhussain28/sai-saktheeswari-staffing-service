import type { Metadata } from "next";
import CareersContent from "@/components/pages/CareersContent";

export const metadata: Metadata = {
  title: "Careers — Join Our Workforce in Cuddalore & Puducherry",
  description:
    "Hiring security guards, supervisors, female security officers and support staff across Cuddalore & Puducherry. Training, PF/ESI benefits and steady deployment. Apply on WhatsApp.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | Sai Saktheeswari Security & Staffing Services",
    description:
      "Build a career with 35 years of trust — training, statutory benefits and steady deployment across South India.",
    url: "/careers",
  },
};

export default function CareersPage() {
  return <CareersContent />;
}
