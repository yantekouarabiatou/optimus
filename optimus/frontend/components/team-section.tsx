"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, X, ZoomIn } from "lucide-react"

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const team = [
  {
    name: "TOSSOU R.T. Lionel",
    role: "Directeur Général",
    location: "Porto-Novo",
    specialty: "Vision stratégique · Direction · Innovation",
    gradient: "from-blue-600 to-blue-800",
    photo: "/LT.jpeg",
    linkedin: "https://www.linkedin.com/in/lionel-tossou-32b15a230/",
    whatsapp: "https://wa.me/22996622903",
  },
  {
    name: "YANTEKOUA Rabiatou",
    role: "Directrice / Responsable Service Dév. Web",
    location: "Cotonou",
    specialty: "Next.js · Laravel · Architecture logicielle",
    gradient: "from-violet-600 to-purple-800",
    photo: "/YR.png",
    linkedin: "https://www.linkedin.com/in/rabiatou-yantekoua-56b776277/",
    whatsapp: "https://wa.me/22953860857",
  },
  {
    name: "Valentin TOSSOU",
    role: "Directeur / Responsable Technique",
    location: "Porto-Novo",
    specialty: "Infrastructure · Systèmes · Sécurité",
    gradient: "from-teal-600 to-cyan-800",
    photo: "/VT.jpeg",
    linkedin: "https://www.linkedin.com/in/avmt/",
    whatsapp: "https://wa.me/22996935517",
  },
  {
    name: "Nassirou KPASSO",
    role: "Directeur / Responsable Marketing & Support Client",
    location: "Cotonou",
    specialty: "Marketing Digital · Support Client · Communication",
    gradient: "from-rose-500 to-pink-700",
    photo: "/NK.jpeg",
    linkedin: null,
    whatsapp: "https://wa.me/22994199760",
  },
]

type TeamMember = typeof team[0]

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-sm w-full bg-card rounded-3xl overflow-hidden shadow-2xl border border-border"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Photo */}
        <div className={`relative bg-gradient-to-br ${member.gradient}`} style={{ aspectRatio: "3/4" }}>
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Info */}
        <div className="px-5 py-4">
          <h3 className="font-bold text-foreground text-base">{member.name}</h3>
          <p className="text-accent text-sm font-medium mt-0.5">{member.role}</p>
          <p className="text-xs text-muted-foreground mt-1">{member.location} · Bénin</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export function TeamSection() {
  const [lightbox, setLightbox] = useState<TeamMember | null>(null)

  return (
    <section id="equipe" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            Notre équipe
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Des talents béninois passionnés
          </h2>
          <p className="text-muted-foreground text-lg">
            Une équipe engagée à Porto-Novo et Cotonou, au service de votre transformation digitale depuis 5 ans.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo — cliquable */}
              <button
                type="button"
                aria-label={`Voir la photo de ${member.name}`}
                onClick={() => setLightbox(member)}
                className={`relative h-52 w-full bg-gradient-to-br ${member.gradient} overflow-hidden block focus:outline-none`}
              >
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Zoom hint on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                    <ZoomIn className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </button>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-foreground text-base mb-0.5">{member.name}</h3>
                <p className="text-accent text-sm font-medium mb-1">{member.role}</p>
                <div className="flex items-center gap-1 mb-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-xs text-muted-foreground">{member.location}</span>
                </div>
                <p className="text-xs text-muted-foreground border-t border-border pt-3">{member.specialty}</p>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <a
                    href="#contact"
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent border border-border rounded-lg py-2 hover:border-accent/50 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Contact
                  </a>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-[#0A66C2] border border-border rounded-lg py-2 hover:border-[#0A66C2]/50 transition-colors"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  ) : member.whatsapp ? (
                    <a
                      href={member.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-[#25D366] border border-border rounded-lg py-2 hover:border-[#25D366]/50 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            Vous souhaitez rejoindre l&apos;équipe ?{" "}
            <a href="mailto:contact@optimussolutions.com" className="text-accent hover:underline font-medium">
              contact@optimussolutions.com
            </a>
          </p>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox member={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

    </section>
  )
}
