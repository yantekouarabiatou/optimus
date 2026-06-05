import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boutique — Matériaux & Équipements Tech',
  description: 'Découvrez notre sélection professionnelle de produits IT, énergie solaire et sécurité. Livraison partout en Afrique.',
  openGraph: {
    title: 'Boutique Optimus+ — Matériaux & Équipements Tech',
    description: 'Sélection professionnelle de produits IT, énergie et sécurité livrés partout en Afrique.',
    url: '/boutique',
  },
  alternates: {
    canonical: '/boutique',
  },
}

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
