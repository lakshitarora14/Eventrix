import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { SidebarWrapper } from '@/components/sidebar/Sidebar'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eventrix',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={outfit.className}>
      <body>
        <div className='flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-black w-full flex-1  mx-auto  overflow-hidden'>
          <SidebarWrapper></SidebarWrapper>
          <div className='m-2 rounded-2xl text-background bg-foreground flex flex-col gap-2 flex-1'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
