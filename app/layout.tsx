import './globals.css'
import type { Metadata, Viewport } from 'next'
import { montserrat } from './fonts'
import Navbar from '@/components/navbar'

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
    <html lang="en" className='bg-[oklch(0.9739_0.034_103.42)]'>
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
