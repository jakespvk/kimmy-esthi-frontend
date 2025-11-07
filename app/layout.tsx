import './globals.css'
import { Montserrat_Alternates } from 'next/font/google'

const montserrat = Montserrat_Alternates({ weight: ['400'], subsets: ['latin'] })

const baseUrl = "https://sunsetkimcare.automeetbackend.space"

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
