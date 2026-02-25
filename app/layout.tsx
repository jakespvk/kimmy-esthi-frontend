import './globals.css'
import type { Metadata, Viewport } from 'next'
import { montserrat } from './fonts'
import Navbar from '@/components/navbar'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Sunset Kimcare',
  description: 'Sunset Kimcare Esthetician Services',
}

export const viewport: Viewport = {
  maximumScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-[oklch(0.9849_0.0204_91.58)]'>
      <body className={montserrat.className}>
        <Providers>
          <Navbar />
          {/* <div className="fixed-gradient-bg"></div> */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
