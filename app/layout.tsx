import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Volvo 9600 XL | Premium Sleeper Coach',
  description: 'Experience the assembly of the premium Volvo 9600 XL sleeper coach.',
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
