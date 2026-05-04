import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import LenisProvider from '../components/LenisProvider'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Surendra & Co. | Master Coach Body Builders — Ahmedabad',
  description: 'Experience the art of coachbuilding. Surendra & Co. — master coachbuilders in Ahmedabad crafting premium sleeper coaches with 25+ years of engineering excellence.',
  icons: {
    icon: '/Logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={`${manrope.className} antialiased bg-[#0A0F1A] text-[#F1F5F9]`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
