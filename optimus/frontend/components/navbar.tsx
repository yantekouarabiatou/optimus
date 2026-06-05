"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoWordmark } from "@/components/logo"

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#services", label: "Services" },
  { href: "#mission", label: "Mission" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-primary/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" aria-label="Optimus+ Solutions – Accueil">
            <LogoWordmark />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-primary-foreground/80 hover:text-accent transition-colors text-sm font-medium group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/boutique">
              <Button className="bg-accent text-primary hover:bg-accent/90 font-semibold shadow-md shadow-accent/20">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Notre Boutique
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="ghost" className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10 font-medium">
                <LogIn className="w-4 h-4 mr-2" />
                Connexion
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-primary-foreground p-2"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-primary/98 backdrop-blur-md rounded-b-2xl"
            >
              <div className="py-5 px-2 space-y-1 border-t border-primary-foreground/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/5 transition-colors py-3 px-4 rounded-xl"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 px-4 space-y-2">
                  <Link href="/boutique" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-accent text-primary hover:bg-accent/90">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Notre Boutique
                    </Button>
                  </Link>
                  <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10">
                      <LogIn className="w-4 h-4 mr-2" />
                      Connexion Admin
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
