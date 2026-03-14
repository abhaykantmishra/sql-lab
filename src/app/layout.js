import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import Link from 'next/link';
import { HelpCircle, Github } from 'lucide-react';
import "./globals.css";

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata = {
  title: "SQL Labs",
  description: "A playground & Question practice platform for SQL",
};

import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <footer className="border-t border-[var(--color-divider)] py-4 px-6 bg-[var(--color-bg-elevated)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[var(--color-text-muted)]">
              SQL Labs — Learn & Practice SQL in your browser
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="/help" 
                className="text-xs font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5"
              >
                <HelpCircle size={14} />
                Help & Cheatsheet
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
