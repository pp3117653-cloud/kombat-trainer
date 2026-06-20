import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KOMBAT TRAINER',
  description: 'Elite AI Neural Combat Engine',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-mono bg-gray-950 text-white">
        {children}
      </body>
    </html>
  )
}
