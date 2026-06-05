"use client"

import { motion } from "framer-motion"
import { Users, Target, MapPin, Award } from "lucide-react"

const stats = [
  { icon: Award,  value: "5 ans",  label: "D'expérience" },
  { icon: Target, value: "150+",   label: "Projets réalisés" },
  { icon: Users,  value: "500+",   label: "Clients accompagnés" },
  { icon: MapPin, value: "2 villes", label: "Porto-Novo & Cotonou" },
]

function IllustrationTeamWork() {
  return (
    <svg viewBox="0 0 420 460" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Équipe Optimus+ Solutions au travail" className="w-full h-full">
      {/* Background shapes */}
      <rect x="30" y="30" width="360" height="400" rx="32" fill="#0D2B6E" fillOpacity="0.06" />

      {/* Desk large */}
      <rect x="60" y="310" width="300" height="14" rx="7" fill="#0D2B6E" fillOpacity="0.18" />
      <rect x="72" y="324" width="8" height="50" rx="4" fill="#0D2B6E" fillOpacity="0.12" />
      <rect x="340" y="324" width="8" height="50" rx="4" fill="#0D2B6E" fillOpacity="0.12" />

      {/* Monitor center */}
      <rect x="168" y="250" width="84" height="60" rx="6" fill="#1E293B" />
      <rect x="172" y="254" width="76" height="52" rx="4" fill="#3B82F6" fillOpacity="0.35" />
      {/* monitor stand */}
      <rect x="202" y="308" width="16" height="10" rx="2" fill="#1E293B" />
      <rect x="194" y="317" width="32" height="5" rx="2" fill="#1E293B" />
      {/* screen content lines */}
      <rect x="178" y="262" width="44" height="5" rx="2" fill="white" fillOpacity="0.5" />
      <rect x="178" y="272" width="32" height="4" rx="2" fill="white" fillOpacity="0.35" />
      <rect x="178" y="281" width="38" height="4" rx="2" fill="white" fillOpacity="0.35" />
      <rect x="178" y="290" width="25" height="4" rx="2" fill="white" fillOpacity="0.25" />

      {/* Keyboard */}
      <rect x="178" y="304" width="64" height="10" rx="3" fill="#334155" fillOpacity="0.6" />

      {/* ── PERSON LEFT (woman, braids) ── */}
      {/* shadow */}
      <ellipse cx="128" cy="380" rx="40" ry="10" fill="#0D2B6E" fillOpacity="0.1" />
      {/* legs */}
      <rect x="110" y="330" width="18" height="52" rx="7" fill="#1E3A8A" />
      <rect x="132" y="330" width="18" height="52" rx="7" fill="#1E3A8A" />
      {/* shoes */}
      <ellipse cx="119" cy="384" rx="14" ry="7" fill="#0F172A" />
      <ellipse cx="141" cy="384" rx="14" ry="7" fill="#0F172A" />
      {/* body */}
      <rect x="104" y="240" width="48" height="94" rx="12" fill="#7C3AED" />
      {/* blouse detail */}
      <rect x="118" y="244" width="16" height="50" rx="4" fill="#6D28D9" />
      {/* left arm (typing) */}
      <rect x="78" y="270" width="30" height="14" rx="7" fill="#5C2A14" transform="rotate(15 78 270)" />
      {/* right arm */}
      <rect x="152" y="272" width="28" height="13" rx="6" fill="#5C2A14" transform="rotate(-10 152 272)" />
      {/* neck */}
      <rect x="120" y="228" width="16" height="16" rx="8" fill="#5C2A14" />
      {/* head */}
      <circle cx="128" cy="210" r="26" fill="#3D1205" />
      <circle cx="128" cy="208" r="24" fill="#5C2A14" />
      {/* braids */}
      <path d="M104 202 Q100 218 102 234" stroke="#1A0A02" strokeWidth="5" strokeLinecap="round" />
      <path d="M108 198 Q103 216 105 232" stroke="#1A0A02" strokeWidth="5" strokeLinecap="round" />
      <path d="M152 202 Q156 218 154 234" stroke="#1A0A02" strokeWidth="5" strokeLinecap="round" />
      <path d="M148 198 Q153 216 151 232" stroke="#1A0A02" strokeWidth="5" strokeLinecap="round" />
      <path d="M128 185 Q128 170 128 155" stroke="#1A0A02" strokeWidth="6" strokeLinecap="round" />
      <path d="M118 186 Q115 170 116 155" stroke="#1A0A02" strokeWidth="5" strokeLinecap="round" />
      <path d="M138 186 Q141 170 140 155" stroke="#1A0A02" strokeWidth="5" strokeLinecap="round" />
      <path d="M103 200 Q128 185 153 200" fill="#1A0A02" />
      {/* face features */}
      <circle cx="121" cy="208" r="3" fill="#3D1205" />
      <circle cx="135" cy="208" r="3" fill="#3D1205" />
      <path d="M122 218 Q128 223 134 218" stroke="#3D1205" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* earrings */}
      <circle cx="104" cy="213" r="3" fill="#F59E0B" />
      <circle cx="152" cy="213" r="3" fill="#F59E0B" />

      {/* ── PERSON RIGHT (man, low cut) ── */}
      {/* shadow */}
      <ellipse cx="292" cy="380" rx="40" ry="10" fill="#0D2B6E" fillOpacity="0.1" />
      {/* legs */}
      <rect x="274" y="330" width="18" height="52" rx="7" fill="#374151" />
      <rect x="296" y="330" width="18" height="52" rx="7" fill="#374151" />
      {/* shoes */}
      <ellipse cx="283" cy="384" rx="14" ry="7" fill="#111827" />
      <ellipse cx="305" cy="384" rx="14" ry="7" fill="#111827" />
      {/* body */}
      <rect x="268" y="240" width="48" height="94" rx="12" fill="#1E40AF" />
      {/* shirt collar / tie */}
      <path d="M284 244 L292 258 L300 244" fill="white" fillOpacity="0.2" />
      <rect x="289" y="258" width="6" height="30" rx="2" fill="#F59E0B" fillOpacity="0.7" />
      {/* left arm */}
      <rect x="248" y="268" width="28" height="14" rx="7" fill="#2D0E03" transform="rotate(20 248 268)" />
      {/* right arm — holding phone */}
      <rect x="316" y="265" width="28" height="13" rx="6" fill="#2D0E03" transform="rotate(-25 316 265)" />
      <rect x="328" y="252" width="16" height="26" rx="4" fill="#1F2937" />
      <rect x="330" y="254" width="12" height="22" rx="3" fill="#60A5FA" fillOpacity="0.6" />
      {/* neck */}
      <rect x="284" y="228" width="16" height="16" rx="8" fill="#2D0E03" />
      {/* head */}
      <circle cx="292" cy="208" r="26" fill="#1A0800" />
      <circle cx="292" cy="206" r="24" fill="#2D0E03" />
      {/* low cut hair */}
      <path d="M268 202 Q292 188 316 202" fill="#0D0500" />
      <path d="M268 202 Q265 210 268 218" fill="#0D0500" />
      <path d="M316 202 Q319 210 316 218" fill="#0D0500" />
      {/* face */}
      <circle cx="285" cy="206" r="3" fill="#1A0800" />
      <circle cx="299" cy="206" r="3" fill="#1A0800" />
      <path d="M286 217 Q292 222 298 217" stroke="#1A0800" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* glasses */}
      <rect x="281" y="202" width="10" height="8" rx="3" stroke="#D97706" strokeWidth="1.5" fill="none" />
      <rect x="295" y="202" width="10" height="8" rx="3" stroke="#D97706" strokeWidth="1.5" fill="none" />
      <line x1="291" y1="206" x2="295" y2="206" stroke="#D97706" strokeWidth="1.5" />

      {/* ── PERSON CENTER (standing, presenting) ── */}
      {/* shadow */}
      <ellipse cx="210" cy="385" rx="44" ry="11" fill="#0D2B6E" fillOpacity="0.12" />
      {/* legs */}
      <rect x="192" y="335" width="20" height="52" rx="8" fill="#0F172A" />
      <rect x="216" y="335" width="20" height="52" rx="8" fill="#0F172A" />
      {/* shoes */}
      <ellipse cx="202" cy="389" rx="16" ry="8" fill="#1E293B" />
      <ellipse cx="226" cy="389" rx="16" ry="8" fill="#1E293B" />
      {/* body */}
      <rect x="184" y="235" width="52" height="104" rx="14" fill="#0D2B6E" />
      {/* suit jacket */}
      <path d="M196 235 L210 252 L224 235" fill="white" fillOpacity="0.08" />
      <rect x="196" y="235" width="14" height="60" rx="3" fill="#0A2255" />
      <rect x="218" y="235" width="14" height="60" rx="3" fill="#0A2255" />
      {/* pocket square */}
      <rect x="185" y="248" width="10" height="8" rx="2" fill="#F59E0B" fillOpacity="0.8" />
      {/* left arm — raised pointing */}
      <rect x="152" y="205" width="36" height="15" rx="7" fill="#3D1205" transform="rotate(-35 152 205)" />
      <circle cx="150" cy="196" r="10" fill="#3D1205" />
      {/* right arm — relaxed */}
      <rect x="236" y="258" width="30" height="14" rx="7" fill="#3D1205" transform="rotate(-15 236 258)" />
      {/* neck */}
      <rect x="202" y="220" width="16" height="18" rx="8" fill="#3D1205" />
      {/* head */}
      <circle cx="210" cy="198" r="28" fill="#2D0A00" />
      <circle cx="210" cy="196" r="26" fill="#4A1A08" />
      {/* fade haircut */}
      <path d="M184 192 Q210 176 236 192" fill="#0D0300" />
      <path d="M184 192 Q181 200 184 210" fill="#0D0300" />
      <path d="M236 192 Q239 200 236 210" fill="#0D0300" />
      {/* face */}
      <circle cx="203" cy="196" r="3.5" fill="#2D0A00" />
      <circle cx="217" cy="196" r="3.5" fill="#2D0A00" />
      <path d="M204 208 Q210 214 216 208" stroke="#2D0A00" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* beard */}
      <path d="M198 210 Q210 222 222 210" fill="#1A0500" fillOpacity="0.6" />

      {/* Floating elements */}
      {/* Chart / analytics card top right */}
      <rect x="310" y="80" width="86" height="72" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="318" y="88" width="50" height="5" rx="2" fill="#0D2B6E" fillOpacity="0.4" />
      <rect x="318" y="98" width="35" height="4" rx="2" fill="#0D2B6E" fillOpacity="0.25" />
      {/* mini bar chart */}
      <rect x="320" y="130" width="10" height="16" rx="2" fill="#3B82F6" />
      <rect x="334" y="122" width="10" height="24" rx="2" fill="#F59E0B" />
      <rect x="348" y="115" width="10" height="31" rx="2" fill="#10B981" />
      <rect x="362" y="119" width="10" height="27" rx="2" fill="#8B5CF6" />
      <line x1="316" y1="148" x2="386" y2="148" stroke="#E2E8F0" strokeWidth="1" />

      {/* Code card top left */}
      <rect x="24" y="80" width="86" height="72" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="32" y="90" width="12" height="12" rx="3" fill="#EF4444" fillOpacity="0.7" />
      <rect x="48" y="90" width="12" height="12" rx="3" fill="#F59E0B" fillOpacity="0.7" />
      <rect x="64" y="90" width="12" height="12" rx="3" fill="#10B981" fillOpacity="0.7" />
      <rect x="32" y="108" width="60" height="4" rx="2" fill="#8B5CF6" fillOpacity="0.5" />
      <rect x="32" y="116" width="48" height="4" rx="2" fill="#3B82F6" fillOpacity="0.4" />
      <rect x="40" y="124" width="40" height="4" rx="2" fill="#10B981" fillOpacity="0.4" />
      <rect x="40" y="132" width="52" height="4" rx="2" fill="#F59E0B" fillOpacity="0.4" />
      <rect x="32" y="140" width="35" height="4" rx="2" fill="#8B5CF6" fillOpacity="0.3" />

      {/* Decorative dots */}
      <circle cx="170" cy="70" r="5" fill="#F59E0B" fillOpacity="0.5" />
      <circle cx="185" cy="58" r="3" fill="#3B82F6" fillOpacity="0.5" />
      <circle cx="248" cy="68" r="4" fill="#10B981" fillOpacity="0.5" />
      <circle cx="260" cy="55" r="3" fill="#8B5CF6" fillOpacity="0.4" />

      {/* Connecting arcs (collaboration lines) */}
      <path d="M164 240 Q210 195 256 240" stroke="#0D2B6E" strokeOpacity="0.1" strokeWidth="2" fill="none" strokeDasharray="6 4" />
    </svg>
  )
}

export function AboutSection() {
  return (
    <section id="a-propos" className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Illustration column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border-2 border-accent/30 rounded-3xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-primary/5 rounded-3xl pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-primary/10 shadow-2xl shadow-primary/15 aspect-[4/5] p-4">
              <IllustrationTeamWork />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 -right-4 lg:-right-8 bg-white dark:bg-card rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-border"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">5 ans d&apos;excellence</p>
                <p className="text-muted-foreground text-xs">Partenaire de confiance</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              Qui sommes-nous
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              Une entreprise béninoise au service de l&apos;innovation
            </h2>
            <div className="space-y-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
              <p>
                <strong className="text-foreground">OPTIMUS+ SOLUTIONS SARL</strong> est une entreprise
                béninoise spécialisée dans les technologies innovantes, fondée il y a 5 ans. Nous
                accompagnons les organisations dans leur transformation digitale avec des solutions
                adaptées aux réalités de notre continent.
              </p>
              <p>
                Présents à <strong className="text-foreground">Porto-Novo</strong> et à <strong className="text-foreground">Cotonou</strong>,
                nous intervenons dans plusieurs domaines stratégiques : IT et infrastructure,
                intelligence artificielle, cybersécurité, design UX/UI et formation professionnelle.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bg-muted/50 rounded-2xl p-4 flex items-center gap-4 border border-border/50"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-foreground leading-none">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
