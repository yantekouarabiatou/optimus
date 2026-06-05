"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { adminLogin } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const user = await adminLogin(email, password)
      if (!user.roles?.includes("admin")) {
        setError("Accès refusé : compte non administrateur.")
        return
      }
      router.push("/admin")
    } catch (err: any) {
      setError(err.message ?? "Identifiants incorrects.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#0a1f52] overflow-hidden">

      {/* ── Formes décoratives ── */}

      {/* ── Formes décoratives ── */}

      {/* Grand cercle haut-gauche */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-white/5 bg-white/[0.03]" />
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full border border-white/5 bg-white/[0.03]" />

      {/* Grand cercle bas-droite */}
      <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full border border-white/5 bg-white/[0.03]" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full border border-white/5 bg-white/[0.03]" />

      {/* Drawer card haut-droite */}
      <div className="absolute top-10 right-10 w-44 h-28 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm rotate-6 shadow-xl" />
      <div className="absolute top-16 right-16 w-44 h-28 rounded-2xl bg-white/[0.03] border border-white/5 rotate-3" />

      {/* Drawer card bas-gauche */}
      <div className="absolute bottom-16 left-10 w-36 h-24 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm -rotate-6 shadow-xl" />
      <div className="absolute bottom-10 left-16 w-36 h-24 rounded-2xl bg-white/[0.03] border border-white/5 -rotate-3" />

      {/* Petits drawers flottants */}
      <div className="absolute top-1/3 left-8 w-20 h-14 rounded-xl bg-accent/20 border border-accent/30 shadow-lg shadow-accent/10 -rotate-12" />
      <div className="absolute top-1/4 right-12 w-16 h-10 rounded-xl bg-white/5 border border-white/10 rotate-12" />
      <div className="absolute bottom-1/3 right-8 w-24 h-14 rounded-xl bg-accent/10 border border-accent/20 rotate-6 shadow-lg shadow-accent/10" />

      {/* Points décoratifs */}
      <div className="absolute top-24 left-1/3 w-2 h-2 rounded-full bg-accent/60" />
      <div className="absolute top-32 left-1/3 translate-x-6 w-1.5 h-1.5 rounded-full bg-white/30" />
      <div className="absolute bottom-28 right-1/3 w-2 h-2 rounded-full bg-accent/50" />
      <div className="absolute bottom-20 right-1/3 -translate-x-5 w-1 h-1 rounded-full bg-white/30" />
      <div className="absolute top-1/2 left-16 w-1.5 h-1.5 rounded-full bg-white/20" />

      {/* Ligne diagonale décorative */}
      <div className="absolute top-0 left-1/2 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* ── Carte de connexion ── */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 dark:bg-[#0f2460]/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">

          {/* Bandeau logo */}
          <div className="bg-primary px-8 py-6 flex flex-col items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Optimus+ Solutions"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
              priority
            />
            <div className="text-center">
              <h1 className="text-white font-bold text-lg tracking-wide">Espace Administration</h1>
              <p className="text-white/60 text-xs mt-0.5">Optimus+ Solutions SARL</p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="px-8 py-7">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl p-3 mb-5 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@optimussolutions.com"
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-11 bg-primary font-semibold mt-2">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connexion...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Se connecter
                  </span>
                )}
              </Button>
            </form>

            <div className="flex items-center justify-between mt-5">
              <p className="text-xs text-muted-foreground">
                Réservé aux administrateurs
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <ArrowLeft className="w-3 h-3" />
                Retour au site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
