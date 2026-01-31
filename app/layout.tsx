import './globals.css'
import type { Metadata } from 'next'
import { montserrat } from './fonts'
import { glassAntiqua, msMadi } from "./fonts";

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
        <div className={glassAntiqua.className + ' flex items-center justify-start m-3'}>
          <h1 className="text-3xl headline-gradient">SunsetKimcare</h1>
          <p className={`${msMadi.className} text-2xl ml-5 text-muted-foreground`}>
            Let me make something clear... your skin
          </p>
        </div>
        {children}
      </body>
    </html>
  )
}
