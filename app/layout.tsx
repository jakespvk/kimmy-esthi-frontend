import './globals.css'
import type { Metadata } from 'next'
import { montserrat } from './fonts'

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
    <html lang="en" className='bg-base-200'>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
