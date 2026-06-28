import type { Metadata } from "next";
import ServicesContent from "@/components/pages/ServicesContent";

export const metadata: Metadata = {
  title: "Staffing Services — Security, Labour, Contract Workforce & HR Compliance",
  description:
    "Security personnel, labour outsourcing, contract workforce management and statutory HR compliance (PF, ESI) across Cuddalore, Puducherry & Tamil Nadu. Trained, verified, accountable — since 1991.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | Sai Saktheeswari Staffing Services",
    description:
      "Four core workforce services — security, labour, contract staffing & HR compliance — delivered with 35 years of trust.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
