import NavBar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";
import { LocalProvider } from "@/contexts/local-context";
import { DataProvider } from "@/contexts/data-context";
import { CheckoutProvider } from "@/contexts/checkout-context";
import { Toaster } from "sonner";
import FacebookPixel from "@/components/FacebookPixel";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import TawkTo from "@/components/TawkTo";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZRI Adventures",
  description: "Your adventure begins here",
  icons: "https://www.zriadventures.com/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="select-none scroll-smooth text-gray-700 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-800"
      suppressHydrationWarning
    >
      <body className={rubik.className}>
        <LocalProvider>
          <DataProvider>
            <CheckoutProvider>
              <NavBar />
              <ScrollToTopButton />
              <GoogleAnalytics />
              <FacebookPixel />
              {children}
              <Footer />
              <TawkTo />
              <Toaster richColors position="top-center" expand closeButton />
            </CheckoutProvider>
          </DataProvider>
        </LocalProvider>
      </body>
    </html>
  );
}
