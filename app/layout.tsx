import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import ThemeProvider from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const container = 'max-w-6xl mx-auto px-4 sm:px-6'

export const metadata: Metadata = {
  title: 'Rules Lawyer — Board Game Rules & Cheat Sheets',
  description:
    'Instantly find board game rules, quick reference cheat sheets, and setup guides. No more digging through rulebooks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors`}
      >
        <ThemeProvider>
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
            <div className={`${container} py-4 flex items-center justify-between gap-4`}>
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                ⚖️ Rules Lawyer
              </Link>
              <nav className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  GitHub
                </a>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className={`${container} py-10`}>{children}</main>

          <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
            <div
              className={`${container} py-6 text-center text-sm text-gray-400 dark:text-gray-600`}
            >
              Rules Lawyer — because nobody reads the manual
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
