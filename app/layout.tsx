import './globals.css'
import type { Metadata } from 'next'
import { montserrat } from './fonts'
import Navbar from '@/components/navbar'
import SunsetBackground from '@/components/SunsetBackground'

export const metadata: Metadata = {
  title: 'Sunset Kimcare',
  description: 'Sunset Kimcare Esthetician Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className=''>
      <body className={montserrat.className}>
        <SunsetBackground />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
