import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Sai Saktheeswari Staffing Services | Security & Manpower Cuddalore Since 1991",
  description: "Trusted staffing & security services since 1991. Serving 100+ businesses in Cuddalore & Puducherry. Security personnel, labour outsourcing & HR statutory compliance.",
  keywords: "staffing services Cuddalore, security services Cuddalore, manpower outsourcing Tamil Nadu, labour outsourcing Cuddalore, staffing agency Puducherry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
