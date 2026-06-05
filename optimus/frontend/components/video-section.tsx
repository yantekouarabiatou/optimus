"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, X } from "lucide-react"

export function VideoSection() {
  const [isOpen, setIsOpen] = useState(false)

  // Replace VOTRE_VIDEO_ID with your actual YouTube video ID
  const videoId = "VOTRE_VIDEO_ID"

  return (
    <section className="py-20 lg:py-32 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="videoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#videoGrid)" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
              Notre Histoire
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance leading-tight">
              Découvrez comment nous transformons l&apos;Afrique
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 text-justify">
              De Cotonou au reste du continent, Optimus+ Solutions accompagne chaque jour des entreprises vers
              l&apos;excellence technologique. Regardez notre histoire et notre impact.
            </p>
            <ul className="space-y-3">
              {[
                "Plus de 150 projets livrés avec succès",
                "Présence dans 10+ pays africains",
                "Équipe d'experts certifiés internationaux",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80">
                  <span className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Video thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 aspect-video group cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {/* Poster image */}
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="Vidéo Optimus+ Solutions"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/40 transition-colors" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-xl shadow-accent/40"
                >
                  <Play className="w-8 h-8 text-primary fill-current ml-1" />
                </motion.div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                Notre vidéo
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-white/10 rounded-2xl -z-10" />
          </motion.div>

        </div>
      </div>

      {/* Video modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Optimus+ Solutions"
              className="w-full h-full rounded-xl"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-accent transition-colors"
              aria-label="Fermer la vidéo"
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
