"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft, Phone, MapPin, StickyNote, Package,
  CheckCircle2, Clock, Loader2, Truck, XCircle, RefreshCw,
} from "lucide-react"
import { adminGetOrder, adminUpdateOrderStatus, adminDeleteOrder } from "@/lib/auth"
import { Button } from "@/components/ui/button"

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUSES = [
  {
    value: "pending",
    label: "En attente",
    description: "Commande reçue, en attente de confirmation",
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800/40",
    ring: "ring-amber-400",
    dot: "bg-amber-400",
  },
  {
    value: "confirmed",
    label: "Confirmée",
    description: "Commande acceptée, en attente de préparation",
    icon: CheckCircle2,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800/40",
    ring: "ring-blue-400",
    dot: "bg-blue-500",
  },
  {
    value: "processing",
    label: "En traitement",
    description: "Commande en cours de préparation",
    icon: RefreshCw,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    border: "border-violet-200 dark:border-violet-800/40",
    ring: "ring-violet-400",
    dot: "bg-violet-500",
  },
  {
    value: "delivered",
    label: "Livrée",
    description: "Commande remise au client",
    icon: Truck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800/40",
    ring: "ring-emerald-400",
    dot: "bg-emerald-500",
  },
  {
    value: "cancelled",
    label: "Annulée",
    description: "Commande annulée",
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800/40",
    ring: "ring-red-400",
    dot: "bg-red-500",
  },
]

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA"
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [order, setOrder]       = useState<any>(null)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [selected, setSelected] = useState<string>("")
  const [saved, setSaved]       = useState(false)

  useEffect(() => {
    adminGetOrder(Number(id))
      .then((res) => {
        setOrder(res.data)
        setSelected(res.data.status)
      })
      .catch(() => router.push("/admin/orders"))
      .finally(() => setLoading(false))
  }, [id, router])

  const handleSave = async () => {
    if (!order || selected === order.status) return
    setSaving(true)
    try {
      await adminUpdateOrderStatus(order.id, selected)
      setOrder((prev: any) => ({ ...prev, status: selected }))
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Supprimer définitivement cette commande ?")) return
    setDeleting(true)
    try {
      await adminDeleteOrder(order.id)
      router.push("/admin/orders")
    } catch (e: any) {
      alert(e.message)
      setDeleting(false)
    }
  }

  // ── Loading ──

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!order) return null

  const currentStatus = STATUSES.find((s) => s.value === order.status)
  const hasChanged = selected !== order.status

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/orders"
          className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold text-foreground">Commande</h1>
            <span className="font-mono text-sm bg-muted px-2.5 py-1 rounded-lg font-semibold">
              {order.reference}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Passée le {new Date(order.created_at).toLocaleDateString("fr-FR", {
              day: "2-digit", month: "long", year: "numeric",
            })}
          </p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          disabled={deleting}
          onClick={handleDelete}
          className="shrink-0"
        >
          {deleting
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : "Supprimer"}
        </Button>
      </div>

      <div className="grid md:grid-cols-5 gap-5">

        {/* ── Left: statut + infos client ── */}
        <div className="md:col-span-3 space-y-5">

          {/* Modifier le statut */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h2 className="font-semibold text-foreground mb-1">Statut de la commande</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Statut actuel :
              {currentStatus && (
                <span
                  className={`ml-1.5 inline-flex items-center gap-1 font-medium ${currentStatus.color}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
                  {currentStatus.label}
                </span>
              )}
            </p>

            <div className="space-y-2.5">
              {STATUSES.map((s) => {
                const Icon = s.icon
                const isSelected = selected === s.value
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSelected(s.value)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? `${s.bg} ${s.border} ring-2 ${s.ring}/30`
                        : "bg-muted/20 border-transparent hover:border-border"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? s.bg : "bg-muted/40"}`}>
                      <Icon className={`w-[1.1rem] h-[1.1rem] ${isSelected ? s.color : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${isSelected ? s.color : "text-foreground"}`}>
                        {s.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{s.description}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                      isSelected ? `${s.border} bg-white dark:bg-card` : "border-border"
                    }`}>
                      {isSelected && (
                        <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Button
                onClick={handleSave}
                disabled={!hasChanged || saving}
                className="flex-1"
              >
                {saving
                  ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enregistrement…</>
                  : saved
                  ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Enregistré !</>
                  : "Enregistrer le statut"}
              </Button>
              {hasChanged && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelected(order.status)}
                  className="text-muted-foreground"
                >
                  Annuler
                </Button>
              )}
            </div>
          </div>

          {/* Infos client */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h2 className="font-semibold text-foreground mb-4">Informations client</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Nom</p>
                <p className="font-medium text-foreground">{order.customer_name}</p>
              </div>
              {order.customer_email && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <a href={`mailto:${order.customer_email}`} className="text-accent hover:underline text-sm">
                    {order.customer_email}
                  </a>
                </div>
              )}
              {order.customer_phone && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Téléphone</p>
                  <a href={`tel:${order.customer_phone}`} className="flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    {order.customer_phone}
                  </a>
                </div>
              )}
              {order.customer_address && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Adresse de livraison</p>
                  <p className="flex items-start gap-1.5 text-sm text-foreground">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    {order.customer_address}
                  </p>
                </div>
              )}
              {order.notes && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Notes</p>
                  <p className="flex items-start gap-1.5 text-sm text-foreground">
                    <StickyNote className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    {order.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: articles + total ── */}
        <div className="md:col-span-2 space-y-5">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h2 className="font-semibold text-foreground mb-4">
              Articles
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                ({order.items?.length ?? 0})
              </span>
            </h2>

            {order.items?.length ? (
              <div className="space-y-2.5">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-muted/30 rounded-xl">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">{item.product_name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Intl.NumberFormat("fr-FR").format(item.product_price)} FCFA × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-foreground shrink-0 self-center">
                      {new Intl.NumberFormat("fr-FR").format(item.subtotal)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">Aucun article</p>
            )}

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-foreground">{fmt(order.total)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
