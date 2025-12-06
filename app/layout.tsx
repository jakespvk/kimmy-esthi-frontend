import './globals.css'
import type { Metadata } from 'next'
import { montserrat } from './fonts'

export const metadata: Metadata = {
  title: 'Sunset Kimcare',
  description: 'Sunset Kimcare Esthetician Services',
}
//
// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   viewportFit: 'cover',
//   themeColor: '#bb4d00',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
