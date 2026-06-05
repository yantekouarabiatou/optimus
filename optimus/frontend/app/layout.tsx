import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://optimussolutions.bj'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Optimus+ Solutions | Partenaire Tech',
    template: '%s | Optimus+ Solutions',
  },
  description: 'OPTIMUS+ SOLUTIONS SARL — Entreprise béninoise spécialisée dans les solutions IT, Intelligence Artificielle, Cybersécurité, Énergie solaire, Design web et Formation digitale.',
  keywords: ['technologie', 'IT', 'intelligence artificielle', 'cybersécurité', 'formation digitale', 'énergie solaire', 'développement web', 'Bénin', 'Afrique', 'Porto-Novo', 'Cotonou'],
  authors: [{ name: 'Optimus+ Solutions SARL', url: SITE_URL }],
  creator: 'Optimus+ Solutions SARL',
  publisher: 'Optimus+ Solutions SARL',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_BJ',
    url: SITE_URL,
    siteName: 'Optimus+ Solutions',
    title: 'Optimus+ Solutions | Partenaire Tech ',
    description: 'Solutions IT, IA, Cybersécurité, Énergie et Formation — portées par une équipe béninoise passionnée.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Optimus+ Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optimus+ Solutions | Partenaire Tech ',
    description: 'Solutions IT, IA, Cybersécurité, Énergie et Formation — portées par une équipe béninoise passionnée.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [{ url: '/logo.jpg', type: 'image/jpeg' }],
    shortcut: '/logo.jpg',
    apple: { url: '/logo.jpg', type: 'image/jpeg' },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export const viewport: Viewport = {
  themeColor: '#0D2B6E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
