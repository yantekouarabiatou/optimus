"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageSquare, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sendContact } from "@/lib/api"

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@optimussolutions.com",
    href: "mailto:contact@optimussolutions.com",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+229 01 40 84 19 00",
    href: "tel:+2290140841900",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    icon: MapPin,
    label: "Porto-Novo",
    value: "Porto-Novo, Bénin",
    href: "#",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: MapPin,
    label: "Cotonou",
    value: "Cotonou, Bénin",
    href: "#",
    color: "bg-accent/10 text-accent",
  },
]

function IllustrationContact() {
  return (
    <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background circle */}
      <circle cx="200" cy="190" r="170" fill="white" fillOpacity="0.05" />
      <circle cx="200" cy="190" r="120" fill="white" fillOpacity="0.04" />

      {/* Person 1 - left, seated at desk */}
      <ellipse cx="120" cy="310" rx="38" ry="12" fill="white" fillOpacity="0.12" />
      {/* desk */}
      <rect x="80" y="255" width="80" height="8" rx="4" fill="white" fillOpacity="0.3" />
      <rect x="86" y="263" width="4" height="40" fill="white" fillOpacity="0.2" />
      <rect x="150" y="263" width="4" height="40" fill="white" fillOpacity="0.2" />
      {/* laptop */}
      <rect x="90" y="235" width="60" height="20" rx="3" fill="white" fillOpacity="0.25" />
      <rect x="88" y="254" width="64" height="3" rx="2" fill="white" fillOpacity="0.15" />
      {/* screen glow */}
      <rect x="93" y="238" width="54" height="14" rx="2" fill="#60A5FA" fillOpacity="0.4" />
      {/* body */}
      <rect x="104" y="195" width="32" height="42" rx="8" fill="#3D1A0A" />
      <rect x="108" y="195" width="24" height="42" rx="6" fill="#4A2010" />
      {/* shirt */}
      <rect x="104" y="210" width="32" height="27" rx="4" fill="#1E40AF" />
      {/* head */}
      <circle cx="120" cy="186" r="18" fill="#3D1A0A" />
      <circle cx="120" cy="183" r="16" fill="#5C2A14" />
      {/* hair */}
      <path d="M104 180 Q120 165 136 180" fill="#1A0A05" />
      {/* arms */}
      <rect x="88" y="215" width="20" height="10" rx="5" fill="#5C2A14" transform="rotate(-20 88 215)" />
      <rect x="130" y="215" width="20" height="10" rx="5" fill="#5C2A14" transform="rotate(20 130 215)" />

      {/* Person 2 - right, standing */}
      <ellipse cx="285" cy="315" rx="38" ry="12" fill="white" fillOpacity="0.12" />
      {/* body */}
      <rect x="266" y="220" width="38" height="80" rx="10" fill="#1F2937" />
      <rect x="270" y="220" width="30" height="80" rx="8" fill="#374151" />
      {/* shirt accent */}
      <rect x="278" y="225" width="10" height="40" rx="2" fill="#F59E0B" fillOpacity="0.8" />
      {/* head */}
      <circle cx="285" cy="205" r="20" fill="#2D0E03" />
      <circle cx="285" cy="202" r="18" fill="#4A1A08" />
      {/* natural hair */}
      <circle cx="285" cy="188" r="14" fill="#1A0A05" />
      <circle cx="272" cy="195" r="7" fill="#1A0A05" />
      <circle cx="298" cy="195" r="7" fill="#1A0A05" />
      {/* arms */}
      <rect x="245" y="225" width="24" height="11" rx="5" fill="#4A1A08" transform="rotate(15 245 225)" />
      <rect x="305" y="225" width="24" height="11" rx="5" fill="#4A1A08" transform="rotate(-15 305 225)" />
      {/* phone in hand */}
      <rect x="248" y="238" width="14" height="22" rx="3" fill="#1F2937" />
      <rect x="250" y="240" width="10" height="18" rx="2" fill="#3B82F6" fillOpacity="0.6" />
      {/* legs */}
      <rect x="268" y="295" width="16" height="25" rx="5" fill="#374151" />
      <rect x="288" y="295" width="16" height="25" rx="5" fill="#374151" />
      {/* shoes */}
      <ellipse cx="276" cy="322" rx="12" ry="6" fill="#111827" />
      <ellipse cx="296" cy="322" rx="12" ry="6" fill="#111827" />

      {/* Person 3 - center, standing with tablet */}
      <ellipse cx="200" cy="318" rx="40" ry="12" fill="white" fillOpacity="0.12" />
      {/* body */}
      <rect x="178" y="215" width="44" height="85" rx="10" fill="#7C3AED" />
      <rect x="182" y="215" width="36" height="85" rx="8" fill="#8B5CF6" />
      {/* collar */}
      <path d="M192 215 L200 225 L208 215" fill="white" fillOpacity="0.2" />
      {/* head */}
      <circle cx="200" cy="198" r="22" fill="#2D0E03" />
      <circle cx="200" cy="195" r="20" fill="#5C2A14" />
      {/* locs/braids */}
      <path d="M180 195 Q178 210 180 225" stroke="#1A0A05" strokeWidth="4" strokeLinecap="round" />
      <path d="M184 198 Q181 215 183 230" stroke="#1A0A05" strokeWidth="4" strokeLinecap="round" />
      <path d="M220 195 Q222 210 220 225" stroke="#1A0A05" strokeWidth="4" strokeLinecap="round" />
      <path d="M216 198 Q219 215 217 230" stroke="#1A0A05" strokeWidth="4" strokeLinecap="round" />
      <path d="M180 192 Q200 178 220 192" fill="#1A0A05" />
      {/* tablet */}
      <rect x="178" y="248" width="28" height="36" rx="4" fill="#1F2937" transform="rotate(-8 178 248)" />
      <rect x="180" y="250" width="24" height="32" rx="3" fill="#3B82F6" fillOpacity="0.5" transform="rotate(-8 180 250)" />
      {/* arm holding tablet */}
      <rect x="162" y="240" width="22" height="11" rx="5" fill="#5C2A14" transform="rotate(30 162 240)" />
      {/* other arm */}
      <rect x="215" y="235" width="22" height="11" rx="5" fill="#5C2A14" transform="rotate(-25 215 235)" />
      {/* legs */}
      <rect x="182" y="296" width="18" height="26" rx="5" fill="#7C3AED" />
      <rect x="202" y="296" width="18" height="26" rx="5" fill="#7C3AED" />
      {/* shoes */}
      <ellipse cx="191" cy="324" rx="13" ry="6" fill="#1F2937" />
      <ellipse cx="211" cy="324" rx="13" ry="6" fill="#1F2937" />

      {/* Chat bubbles floating */}
      <rect x="50" y="80" width="90" height="36" rx="12" fill="white" fillOpacity="0.15" />
      <path d="M68 116 L58 126 L80 116" fill="white" fillOpacity="0.15" />
      <rect x="55" y="88" width="60" height="6" rx="3" fill="white" fillOpacity="0.4" />
      <rect x="55" y="100" width="40" height="6" rx="3" fill="white" fillOpacity="0.3" />

      <rect x="260" y="60" width="90" height="36" rx="12" fill="white" fillOpacity="0.15" />
      <path d="M332 96 L342 106 L320 96" fill="white" fillOpacity="0.15" />
      <rect x="265" y="68" width="70" height="6" rx="3" fill="white" fillOpacity="0.4" />
      <rect x="265" y="80" width="50" height="6" rx="3" fill="white" fillOpacity="0.3" />

      {/* Floating envelope icons */}
      <rect x="155" y="45" width="30" height="24" rx="5" fill="white" fillOpacity="0.2" />
      <path d="M155 50 L170 62 L185 50" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />

      {/* Stars / sparkles */}
      <circle cx="60" cy="155" r="4" fill="white" fillOpacity="0.4" />
      <circle cx="340" cy="145" r="3" fill="white" fillOpacity="0.3" />
      <circle cx="100" cy="50" r="3" fill="white" fillOpacity="0.4" />
      <circle cx="320" cy="175" r="5" fill="white" fillOpacity="0.3" />

      {/* Location pins */}
      <circle cx="355" cy="260" r="12" fill="white" fillOpacity="0.15" />
      <path d="M355 252 Q362 252 362 258 Q362 265 355 272 Q348 265 348 258 Q348 252 355 252Z" fill="white" fillOpacity="0.4" />
      <circle cx="355" cy="259" r="3" fill="white" fillOpacity="0.6" />

      <circle cx="45" cy="270" r="12" fill="white" fillOpacity="0.15" />
      <path d="M45 262 Q52 262 52 268 Q52 275 45 282 Q38 275 38 268 Q38 262 45 262Z" fill="white" fillOpacity="0.4" />
      <circle cx="45" cy="269" r="3" fill="white" fillOpacity="0.6" />

      {/* Connecting dotted line between locations */}
      <line x1="57" y1="270" x2="343" y2="260" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="6 4" />

      {/* Ground shadow line */}
      <line x1="60" y1="330" x2="340" y2="330" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
    </svg>
  )
}

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)
    try {
      await sendContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || undefined,
        message: formData.message,
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 6000)
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Contactez-nous
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Parlons de votre projet
          </h2>
          <p className="text-muted-foreground text-lg text-justify">
            Notre équipe à Porto-Novo et Cotonou est disponible pour vous accompagner.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* Left panel — illustration + infos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 lg:p-10 flex flex-col justify-between min-h-[480px]"
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl pointer-events-none" />

            {/* SVG illustration */}
            <div className="relative z-10 flex-1 flex items-center justify-center mb-6">
              <div className="w-full max-w-xs mx-auto">
                <IllustrationContact />
              </div>
            </div>

            {/* Contact cards */}
            <div className="relative z-10 space-y-3">
              {contactDetails.map((item, i) => (
                <motion.a
                  key={`${item.label}-${i}`}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 transition-colors group"
                >
                  <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/60 text-xs">{item.label}</p>
                    <p className="text-white font-medium text-sm truncate group-hover:text-accent transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}

              {/* Response time */}
              <div className="flex items-center gap-2 px-4 py-2 mt-2">
                <Clock className="w-4 h-4 text-white/50" />
                <span className="text-white/50 text-xs">Réponse sous 24h ouvrées</span>
              </div>
            </div>
          </motion.div>

          {/* Right panel — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 lg:p-10 shadow-sm border border-border"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Message envoyé !</h3>
                <p className="text-muted-foreground max-w-xs text-justify">
                  Merci de nous avoir contactés. Nous vous répondrons à <strong>contact@optimussolutions.com</strong> dans les plus brefs délais.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="h-full flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Envoyez-nous un message</h3>
                  <p className="text-muted-foreground text-sm">Tous les champs marqués * sont obligatoires.</p>
                </div>

                {/* Alerte erreur */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-start gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl text-sm text-red-700 dark:text-red-400"
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="flex-1">{errorMsg}</span>
                      <button type="button" onClick={() => setErrorMsg(null)} className="shrink-0 hover:opacity-70 transition-opacity">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Nom complet *</label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email *</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">Sujet *</label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Objet de votre message"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-1.5 flex-1">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message *</label>
                  <textarea
                    id="message"
                    placeholder="Décrivez votre projet ou votre demande..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full h-full min-h-[140px] px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 mt-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Envoyer le message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
