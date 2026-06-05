"use client"

import { motion } from "framer-motion"
import { Target, Eye, Lightbulb, TrendingUp } from "lucide-react"

export function MissionSection() {
  return (
    <section id="mission" className="py-20 lg:py-32 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="missionGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#missionGrid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
            Notre Raison d&apos;Être
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Mission &amp; Vision
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-primary-foreground/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground">
                  Notre Mission
                </h3>
              </div>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 text-justify">
                Fournir des solutions technologiques innovantes et accessibles pour accélérer la
                transformation digitale des entreprises, en combinant expertise internationale et
                compréhension locale.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-primary-foreground/70 text-sm">Innovation continue</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-primary-foreground/70 text-sm">Croissance durable</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-primary-foreground/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground">
                  Notre Vision
                </h3>
              </div>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 text-justify">
                Devenir le partenaire technologique de référence en Afrique, reconnu pour notre
                excellence, notre impact positif sur le développement économique et notre engagement
                envers l&apos;innovation responsable.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full shrink-0" />
                  <span className="text-primary-foreground/70 text-sm">Leader en transformation digitale</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full shrink-0" />
                  <span className="text-primary-foreground/70 text-sm">Excellence et intégrité</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full shrink-0" />
                  <span className="text-primary-foreground/70 text-sm">Impact social positif</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 lg:mt-16"
        >
          <div className="bg-accent/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-accent/20">
            <h4 className="text-center text-primary-foreground font-semibold mb-6">
              Nos Valeurs Fondamentales
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {["Innovation", "Intégrité", "Excellence", "Collaboration", "Impact"].map((value, i) => (
                <motion.span
                  key={value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="px-5 py-2 bg-primary-foreground/10 text-primary-foreground rounded-full text-sm font-medium border border-primary-foreground/10"
                >
                  {value}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
