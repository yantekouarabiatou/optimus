"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Kofi Mensah",
    role: "Directeur Général",
    company: "TechGroup Ghana",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    content: "Optimus+ Solutions a transformé notre infrastructure IT en un temps record. Leur équipe est professionnelle, réactive et propose des solutions réellement adaptées au contexte africain. Un partenaire incontournable.",
    rating: 5,
  },
  {
    name: "Aminata Diallo",
    role: "DRH & Transformation Digitale",
    company: "BanqueSud Côte d'Ivoire",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    content: "Grâce à la formation dispensée par Optimus+, nos équipes maîtrisent désormais des outils IA qui ont réduit nos délais de traitement de 40%. Leur approche pédagogique et leur suivi sont exemplaires.",
    rating: 5,
  },
  {
    name: "Jean-Baptiste Kossou",
    role: "Responsable Sécurité",
    company: "Télécoms Bénin SA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    content: "L'audit de cybersécurité réalisé par Optimus+ a révélé des failles critiques que nous avions ignorées. Leur plan de remédiation a été impeccable. Nous sommes aujourd'hui bien mieux protégés.",
    rating: 5,
  },
  {
    name: "Fatoumata Traoré",
    role: "CEO",
    company: "SolarAfrique Mali",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80",
    content: "Le déploiement de notre solution solaire avec Optimus+ s'est fait dans les délais et le budget. Leur expertise technique combinée à leur connaissance du marché local est un vrai atout différenciant.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Témoignages Clients
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Ils nous font confiance
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Large quote icon */}
            <Quote className="absolute -top-4 -left-2 w-16 h-16 text-accent/10 fill-current" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-xl shadow-primary/5"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground text-lg lg:text-xl leading-relaxed mb-8 italic text-justify">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-accent/20 shrink-0">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-muted-foreground text-sm">{t.role}</p>
                    <p className="text-accent text-sm font-medium">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-accent w-8" : "bg-border w-2 hover:bg-accent/40"
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prev}
                  className="w-11 h-11 bg-muted hover:bg-accent hover:text-primary rounded-full flex items-center justify-center transition-colors border border-border"
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="w-11 h-11 bg-muted hover:bg-accent hover:text-primary rounded-full flex items-center justify-center transition-colors border border-border"
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
