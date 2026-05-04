import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Surendra & Co. | Premium Coach Body Builders',
  description: 'Experience the craftsmanship of Surendra & Co. — premier coach body builders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0b0c10] text-[#f3f4f6]">
        {children}
      </body>
    </html>
  )
}
