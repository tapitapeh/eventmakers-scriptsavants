import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cari Acara",
  description: "Aplikasi pencarian acara terlengkap di Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Navbar />
        <main className="py-20 max-w-screen-xl mx-auto px-4 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
