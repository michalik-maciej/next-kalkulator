import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ReactNode } from 'react'

import { ThemeProvider } from '@/components/ThemeProvider'
import { buttonVariants } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'

import { ProductsProvider } from './ProductsProvider'
import { getProducts } from './catalog/actions'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://next-calculator-beige.vercel.app/'),
  title: 'Projektownia kalkulator',
  description: 'Kalkulator części metalowych w projektach sklepów',
}

const navLinks = [
  { path: '/form', label: 'Formularz' },
  { path: '/order', label: 'Rozpiska' },
  { path: '/catalog', label: 'Produkty' },
]

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const products = await getProducts()
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductsProvider products={products}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange>
            <nav className="px-24 py-2  bg-slate-900 flex items-center border-2">
              <div>
                {navLinks.map(({ label, path }, index) => (
                  <Link
                    key={index}
                    href={path}
                    className={
                      buttonVariants({ variant: 'ghost' }) + ' rounded-sm'
                    }>
                    {label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="px-16 m-auto max-w-7xl mb-32">{children}</div>
            <Toaster />
          </ThemeProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
