import './globals.css'
import { Montserrat_Alternates } from 'next/font/google'

const montserrat = Montserrat_Alternates({ weight: ['400'], subsets: ['latin'] })

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const metadata = {
  title: 'Sunset Kimcare',
  description: 'Sunset Kimcare Esthetician Services',
}

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
