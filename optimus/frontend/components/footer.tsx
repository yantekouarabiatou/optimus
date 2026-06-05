import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { LogoWordmark } from "@/components/logo"

const footerLinks = {
  services: [
    { label: "IT & Infrastructure", href: "#services" },
    { label: "Intelligence Artificielle", href: "#services" },
    { label: "Solutions Énergétiques", href: "#services" },
    { label: "Cybersécurité", href: "#services" },
    { label: "Design & UX", href: "#services" },
    { label: "Formation", href: "#services" },
  ],
  company: [
    { label: "À propos", href: "#a-propos" },
    { label: "Notre Mission", href: "#mission" },
    { label: "Témoignages", href: "#temoignages" },
    { label: "Contact", href: "#contact" },
    { label: "Boutique", href: "/boutique" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter (X)" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Main footer */}
        <div className="py-14 lg:py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <LogoWordmark className="mb-6" />
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6 max-w-xs text-justify">
              Votre partenaire technologique de confiance. Solutions innovantes en IT, IA,
              énergie et cybersécurité pour accélérer votre croissance.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-primary transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-5 text-accent">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-accent transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-accent/40 rounded-full group-hover:bg-accent transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-5 text-accent">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-accent transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-accent/40 rounded-full group-hover:bg-accent transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-5 text-accent">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@optimusplus.bj"
                  className="flex items-start gap-3 text-primary-foreground/60 hover:text-accent transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 shrink-0 mt-0.5 group-hover:text-accent" />
                  contact@optimusplus.bj
                </a>
              </li>
              <li>
                <a
                  href="tel:+2290140841900"
                  className="flex items-center gap-3 text-primary-foreground/60 hover:text-accent transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 shrink-0 group-hover:text-accent" />
                  +229 01 40 84 19 00
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-primary-foreground/60 text-sm">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  Cotonou, République du Bénin
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/40 text-sm">
              © {new Date().getFullYear()} Optimus+ Solutions SARL. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-primary-foreground/40 hover:text-accent text-sm transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-primary-foreground/40 hover:text-accent text-sm transition-colors">
                Conditions d&apos;utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
