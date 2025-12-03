import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";
import Footer from "@/components/Footer/Footer";

import ReduxProvider from "@/components/ReduxProvider";
import ScrollToTop from "@/components/helper/ScrollToTop";
import PageLoader from "@/components/helper/PageLoader";
import CookieBanner from "@/components/helper/CookieBanner";
import { Toaster } from "react-hot-toast";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Learning Needs — School Management, Training & Educational Services",
  description:
    "Learning Needs delivers high-quality school management solutions, teacher training, student skill development programs, and customized educational services. Based in Kolkata, we provide modern, holistic learning solutions for schools, institutions, and organizations.",
  keywords: [
    "Learning Needs",
    "School Management Service",
    "Teacher Training",
    "Student Development",
    "Educational Services",
    "School Consultancy",
    "Training Programs",
    "Skill Development",
    "Learning Solutions",
    "Education in Kolkata",
    "Institutional Training",
    "Holistic Education",
  ],
  authors: [{ name: "Learning Needs" }],
  openGraph: {
    title: "Learning Needs — Empowering Education Through Training & Management",
    description:
      "A trusted provider of school management solutions, teacher development, and customized training programs that help institutions grow with confidence.",
    url: "https://learningneeds.in",
    siteName: "Learning Needs",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Learning Needs — Educational & Training Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Needs — Educational & Training Services",
    description:
      "Delivering customized training, school management solutions, and holistic development programs for institutions and learners.",
    images: ["/images/og.png"], 
  },
  metadataBase: new URL("https://learningneeds.in"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className}`}
      >
        <ReduxProvider>
          <Toaster />
          <CookieBanner />
          <PageLoader />
          <ResponsiveNav />
          {children}
          <Footer />
          <ScrollToTop />
        </ReduxProvider>

      </body>
    </html>
  );
}
