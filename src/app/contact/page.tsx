import type { Metadata } from "next";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us — Request Workforce in Cuddalore & Puducherry",
  description:
    "Request security personnel, labour or contract workforce. Call +91 93676 26855, WhatsApp, or email saisaktheeswari@gmail.com. Offices in Cuddalore & Puducherry. 24-hour response.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Sai Saktheeswari Security & Staffing Services",
    description:
      "Tell us your workforce requirement — 24-hour response, same-day on WhatsApp. Offices in Cuddalore & Puducherry.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
