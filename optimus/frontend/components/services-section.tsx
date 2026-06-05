"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Server, Brain, Zap, Shield, Palette, GraduationCap, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Server,
    title: "IT & Infrastructure",
    description: "Conception, déploiement et maintenance d'infrastructures informatiques robustes et scalables pour votre entreprise.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    color: "from-blue-500/10 to-blue-600/5",
    accent: "text-blue-500",
    border: "group-hover:border-blue-400/40",
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle",
    description: "Solutions IA sur mesure : machine learning, automatisation intelligente et analyse prédictive pour optimiser vos processus.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    color: "from-violet-500/10 to-violet-600/5",
    accent: "text-violet-500",
    border: "group-hover:border-violet-400/40",
  },
  {
    icon: Zap,
    title: "Solutions Énergétiques",
    description: "Systèmes solaires et solutions énergétiques durables adaptées aux besoins spécifiques du continent africain.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
    color: "from-amber-500/10 to-amber-600/5",
    accent: "text-amber-500",
    border: "group-hover:border-amber-400/40",
  },
  {
    icon: Shield,
    title: "Sécurité Informatique",
    description: "Protection complète de vos actifs numériques avec des solutions de cybersécurité avancées et audits de sécurité.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    color: "from-green-500/10 to-green-600/5",
    accent: "text-green-500",
    border: "group-hover:border-green-400/40",
  },
  {
    icon: Palette,
    title: "Design & UX",
    description: "Création d'expériences utilisateur exceptionnelles avec des interfaces modernes, intuitives et accessibles.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
    color: "from-rose-500/10 to-rose-600/5",
    accent: "text-rose-500",
    border: "group-hover:border-rose-400/40",
  },
  {
  icon: GraduationCap,
  title: "Formation & Accompagnement",
  description: "Programmes de formation personnalisés pour développer les compétences techniques de vos équipes.",
  image: "/formation.jpg",
  color: "from-cyan-500/10 to-cyan-600/5",
  accent: "text-cyan-500",
  border: "group-hover:border-cyan-400/40",
 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Nos Domaines d&apos;Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-balance">
            Des solutions technologiques complètes
          </h2>
          <p className="text-lg text-muted-foreground text-justify">
            Nous offrons une gamme complète de services pour accompagner votre transformation digitale.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`group relative bg-card rounded-2xl overflow-hidden border border-border ${service.border} hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 cursor-pointer`}
            >
              {/* Image header */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                {/* Icon badge */}
                <div className="absolute bottom-4 left-5 w-12 h-12 bg-card rounded-xl shadow-lg flex items-center justify-center border border-border">
                  <service.icon className={`w-6 h-6 ${service.accent}`} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 text-justify">{service.description}</p>
                <span className={`inline-flex items-center gap-1 text-sm font-medium ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
