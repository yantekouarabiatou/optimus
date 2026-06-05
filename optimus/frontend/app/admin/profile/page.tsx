"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Lock, CheckCircle2, AlertCircle } from "lucide-react"
import { getStoredUser, adminUpdateProfile } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminProfilePage() {
  const user = getStoredUser()

  const [name, setName]             = useState(user?.name ?? "")
  const [currentPwd, setCurrentPwd] = useState("")
  const [newPwd, setNewPwd]         = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")

  const [loadingName, setLoadingName]   = useState(false)
  const [loadingPwd, setLoadingPwd]     = useState(false)
  const [nameMsg, setNameMsg]           = useState<{ ok: boolean; text: string } | null>(null)
  const [pwdMsg, setPwdMsg]             = useState<{ ok: boolean; text: string } | null>(null)

  const showMsg = (setter: typeof setNameMsg, ok: boolean, text: string) => {
    setter({ ok, text })
    setTimeout(() => setter(null), 4000)
  }

  const saveName = async () => {
    if (!name.trim() || name.trim() === user?.name) return
    setLoadingName(true)
    try {
      await adminUpdateProfile({ name: name.trim() })
      showMsg(setNameMsg, true, "Nom mis à jour avec succès.")
    } catch (e: any) {
      showMsg(setNameMsg, false, e.message ?? "Erreur")
    } finally {
      setLoadingName(false)
    }
  }

  const savePassword = async () => {
    if (!currentPwd || !newPwd || !confirmPwd) {
      showMsg(setPwdMsg, false, "Tous les champs sont requis.")
      return
    }
    if (newPwd !== confirmPwd) {
      showMsg(setPwdMsg, false, "Les mots de passe ne correspondent pas.")
      return
    }
    if (newPwd.length < 8) {
      showMsg(setPwdMsg, false, "Le mot de passe doit contenir au moins 8 caractères.")
      return
    }
    setLoadingPwd(true)
    try {
      await adminUpdateProfile({
        current_password: currentPwd,
        password: newPwd,
        password_confirmation: confirmPwd,
      })
      setCurrentPwd("")
      setNewPwd("")
      setConfirmPwd("")
      showMsg(setPwdMsg, true, "Mot de passe modifié avec succès.")
    } catch (e: any) {
      showMsg(setPwdMsg, false, e.message ?? "Erreur")
    } finally {
      setLoadingPwd(false)
    }
  }

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mon profil</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Modifiez votre nom et mot de passe.</p>
      </div>

      {/* Avatar header */}
      <div className="flex items-center gap-4 bg-white dark:bg-card rounded-2xl border border-border p-5 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
          <span className="text-primary text-xl font-bold">
            {(user?.name ?? "A")[0].toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-semibold text-foreground">{user?.name ?? "Admin"}</p>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            Administrateur
          </span>
        </div>
      </div>

      {/* Name section */}
      <div className="bg-white dark:bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <User className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Informations générales</h2>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="profile-name">Nom complet</Label>
          <Input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="max-w-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input value={user?.email ?? ""} disabled className="max-w-sm bg-muted/40" />
          <p className="text-xs text-muted-foreground">L&apos;email ne peut pas être modifié.</p>
        </div>

        <AnimatePresence>
          {nameMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${nameMsg.ok ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}
            >
              {nameMsg.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              {nameMsg.text}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={saveName}
          disabled={loadingName || !name.trim() || name.trim() === user?.name}
          className="bg-primary text-white hover:bg-primary/90"
        >
          {loadingName ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>

      {/* Password section */}
      <div className="bg-white dark:bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Changer le mot de passe</h2>
        </div>

        <div className="space-y-3 max-w-sm">
          <div className="space-y-1.5">
            <Label htmlFor="current-pwd">Mot de passe actuel</Label>
            <Input
              id="current-pwd"
              type="password"
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-pwd">Nouveau mot de passe</Label>
            <Input
              id="new-pwd"
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm-pwd">Confirmer le mot de passe</Label>
            <Input
              id="confirm-pwd"
              type="password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
        </div>

        <AnimatePresence>
          {pwdMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${pwdMsg.ok ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}
            >
              {pwdMsg.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              {pwdMsg.text}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={savePassword}
          disabled={loadingPwd}
          className="bg-primary text-white hover:bg-primary/90"
        >
          {loadingPwd ? "Modification…" : "Modifier le mot de passe"}
        </Button>
      </div>
    </div>
  )
}
