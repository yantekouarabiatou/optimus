"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "Votre Partenaire Technologique",
    subtitle: "Nous accompagnons les entreprises dans leur transformation digitale avec des solutions innovantes et sur mesure.",
    cta: "Découvrir nos services",
    ctaLink: "#services",
    tag: "Transformation Digitale",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Intelligence Artificielle & Innovation",
    subtitle: "Exploitez la puissance de l'IA pour automatiser vos processus et prendre des décisions éclairées basées sur les données.",
    cta: "Découvrir l'IA",
    ctaLink: "#services",
    tag: "Intelligence Artificielle",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Solutions Énergétiques Durables",
    subtitle: "Des solutions solaires et énergétiques adaptées aux réalités africaines pour une croissance durable et responsable.",
    cta: "Voir nos solutions",
    ctaLink: "#services",
    tag: "Énergie & Durabilité",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Cybersécurité de Pointe",
    subtitle: "Protégez vos actifs numériques avec nos solutions de sécurité informatique avancées et nos experts certifiés.",
    cta: "Protégez votre entreprise",
    ctaLink: "#contact",
    tag: "Cybersécurité",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextSlide()
          return 0
        }
        return p + 2
      })
    }, 80)
    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  return (
    <section
      id="accueil"
      className="relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${currentSlide}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt=""
            aria-hidden="true"
            fill
            className="object-cover"
            priority
          />
          {/* Multi-layer dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/75 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 flex items-center"
        >
          <div className="container mx-auto px-6 lg:px-8 pt-20 pb-28">
            <div className="max-w-3xl mx-auto text-center">
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full mb-6"
              >
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span className="text-accent text-sm font-medium">{slides[currentSlide].tag}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 leading-[1.1] text-balance"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-white/75 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-primary hover:bg-accent/90 font-bold text-base px-8 shadow-xl shadow-accent/30 group"
                >
                  <a href={slides[currentSlide].ctaLink}>
                    {slides[currentSlide].cta}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/70 text-white bg-white/10 hover:bg-white/20 hover:border-white font-semibold text-base px-8 backdrop-blur-sm"
                >
                  <a href="#contact">Nous contacter</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-accent/80 border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 backdrop-blur-sm"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-accent/80 border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 backdrop-blur-sm"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress dots + bars */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => { setCurrentSlide(index); setProgress(0) }}
            className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-white/25 ${
              index === currentSlide ? "w-12" : "w-3"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          >
            {index === currentSlide && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#a-propos"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 right-8 hidden lg:flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium rotate-90 mb-2">Scroll</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-accent rounded-full" />
        </div>
      </motion.a>
    </section>
  )
}
