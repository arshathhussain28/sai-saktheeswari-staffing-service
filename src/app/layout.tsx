import type { Metadata } from "next";
import { Poppins, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FloatingContact from "@/components/layout/FloatingContact";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Luxury serif for editorial headings (Legacy, Founder, milestone numerals)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// NOTE: replace with the real production domain once deployed (Vercel/custom).
const SITE_URL = "https://saisaktheeswari.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Sai Saktheeswari Security & Staffing Services | Security & Manpower in Cuddalore Since 1991",
    template: "%s | Sai Saktheeswari Security & Staffing Services",
  },
  description:
    "Trusted staffing, security & manpower services since 1991. Serving 100+ businesses across Cuddalore & Puducherry — security personnel, labour outsourcing, contract workforce & statutory HR compliance (PF, ESI).",
  keywords: [
    "staffing services Cuddalore",
    "security services Cuddalore",
    "manpower outsourcing Tamil Nadu",
    "labour outsourcing Cuddalore",
    "staffing agency Puducherry",
    "security guards Cuddalore",
    "contract workforce Tamil Nadu",
    "PF ESI compliance Cuddalore",
  ],
  authors: [{ name: "Sai Saktheeswari Security & Staffing Services" }],
  creator: "Sai Saktheeswari Security & Staffing Services",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Sai Saktheeswari Security & Staffing Services",
    title:
      "Sai Saktheeswari Security & Staffing Services | Security & Manpower Since 1991",
    description:
      "35 years of trusted security & manpower staffing across Cuddalore & Puducherry. 500+ workforce deployed, 100+ businesses served.",
    images: [
      {
        url: "/images/dsc/formation-aerial.jpg",
        width: 1200,
        height: 630,
        alt: "Sai Saktheeswari security workforce in formation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sai Saktheeswari Security & Staffing Services | Security & Manpower Since 1991",
    description:
      "35 years of trusted security & manpower staffing across Cuddalore & Puducherry.",
    images: ["/images/dsc/formation-aerial.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/images/logo.jpeg", apple: "/images/logo.jpeg" },
  category: "business",
};

// Structured data — EmploymentAgency / LocalBusiness (real NAP from constants.ts)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: "Sai Saktheeswari Security & Staffing Services",
  description:
    "Security personnel deployment, labour outsourcing, contract workforce management and statutory HR compliance across Tamil Nadu & Puducherry since 1991.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.jpeg`,
  image: `${SITE_URL}/images/dsc/formation-aerial.jpg`,
  foundingDate: "1991",
  telephone: "+91-93676-26855",
  email: "saisaktheeswari@gmail.com",
  priceRange: "₹₹",
  areaServed: [
    { "@type": "City", name: "Cuddalore" },
    { "@type": "City", name: "Puducherry" },
    { "@type": "State", name: "Tamil Nadu" },
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress:
        "Sai Saktheeswari Tower, #16A Nellikuppam Main Road, S.N Chavadi",
      addressLocality: "Cuddalore",
      postalCode: "607006",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "#18, First Floor, 100 Feet Road, Ellaipillaichavadi",
      addressLocality: "Puducherry",
      postalCode: "605005",
      addressCountry: "IN",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-93676-26855",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "ta"],
  },
  knowsAbout: [
    "Security Personnel",
    "Labour Outsourcing",
    "Contract Workforce",
    "Statutory HR Compliance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${fraunces.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <FloatingContact />
        <Footer />
      </body>
    </html>
  );
}
