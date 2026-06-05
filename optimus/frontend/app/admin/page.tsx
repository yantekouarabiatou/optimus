"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Package, ShoppingCart, MessageSquare, TrendingUp,
  CheckCircle2, AlertTriangle, Plus, ChevronRight, Eye,
} from "lucide-react"
import { adminGetStats, getStoredUser } from "@/lib/auth"

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  pending:    { label: "En attente",    bg: "bg-amber-50 dark:bg-amber-900/20",    text: "text-amber-700 dark:text-amber-400",    dot: "#f59e0b" },
  confirmed:  { label: "Confirmée",     bg: "bg-blue-50 dark:bg-blue-900/20",      text: "text-blue-700 dark:text-blue-400",      dot: "#3b82f6" },
  processing: { label: "En traitement", bg: "bg-violet-50 dark:bg-violet-900/20",  text: "text-violet-700 dark:text-violet-400",  dot: "#8b5cf6" },
  delivered:  { label: "Livrée",        bg: "bg-emerald-50 dark:bg-emerald-900/20",text: "text-emerald-700 dark:text-emerald-400",dot: "#10b981" },
  cancelled:  { label: "Annulée",       bg: "bg-red-50 dark:bg-red-900/20",        text: "text-red-700 dark:text-red-400",        dot: "#ef4444" },
}

function fmt(n: number | string | undefined) {
  const num = Number(n ?? 0)
  return new Intl.NumberFormat("fr-FR").format(isNaN(num) ? 0 : num)
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_MAP[status] ?? { label: status, bg: "bg-muted", text: "text-muted-foreground", dot: "#94a3b8" }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${cfg.bg} ${cfg.text}`}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg.dot }} />
      {cfg.label}
    </span>
  )
}

// ── SVG Donut ─────────────────────────────────────────────────────────────────

function DonutChart({ segments }: { segments: { value: number; color: string }[] }) {
  const total = segments.reduce((s, d) => s + d.value, 0) || 1
  const R = 38
  const C = 2 * Math.PI * R
  const gap = 4
  let cum = 0
  const arcs = segments.map((seg) => {
    const frac = seg.value / total
    const dash = Math.max(0, frac * C - (seg.value > 0 ? gap : 0))
    const arc = { color: seg.color, value: seg.value, dash, offset: cum }
    cum += frac * C
    return arc
  })
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g transform="rotate(-90 50 50)">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#e2e8f0" strokeWidth="13" />
        {arcs.map((a, i) =>
          a.value > 0 ? (
            <circle
              key={i} cx="50" cy="50" r={R} fill="none"
              stroke={a.color} strokeWidth="13"
              strokeDasharray={`${a.dash} ${C - a.dash}`}
              strokeDashoffset={-a.offset}
            />
          ) : null
        )}
      </g>
    </svg>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [stats, setStats]   = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const user = getStoredUser()

  useEffect(() => {
    adminGetStats()
      .then((res: any) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const o = stats?.orders   ?? {}
  const p = stats?.products ?? {}
  const m = stats?.messages ?? {}
  const recent: any[] = stats?.recent_orders ?? []

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Bonjour"
    if (h < 18) return "Bon après-midi"
    return "Bonsoir"
  })()

  const todayStr = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })

  const kpis = [
    {
      label: "Chiffre d'affaires",
      value: o.revenue ? fmt(o.revenue) + " FCFA" : "0 FCFA",
      sub: `${fmt(o.total ?? 0)} commandes au total`,
      icon: TrendingUp,
      iconBg: "from-amber-500 to-orange-400",
      cardBg: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/10",
      border: "border-amber-200/70 dark:border-amber-800/30",
      href: "/admin/orders",
    },
    {
      label: "Commandes",
      value: fmt(o.total ?? 0),
      sub: `${o.pending ?? 0} en attente de traitement`,
      subWarning: (o.pending ?? 0) > 0,
      icon: ShoppingCart,
      iconBg: "from-blue-500 to-indigo-500",
      cardBg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/15 dark:to-indigo-900/10",
      border: "border-blue-200/70 dark:border-blue-800/30",
      href: "/admin/orders",
    },
    {
      label: "Produits actifs",
      value: fmt(p.active ?? 0),
      sub: (p.low_stock ?? 0) > 0 ? `${p.low_stock} produit(s) en stock faible` : `${fmt(p.total ?? 0)} produits enregistrés`,
      subWarning: (p.low_stock ?? 0) > 0,
      icon: Package,
      iconBg: "from-emerald-500 to-teal-400",
      cardBg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/15 dark:to-teal-900/10",
      border: "border-emerald-200/70 dark:border-emerald-800/30",
      href: "/admin/products",
    },
    {
      label: "Messages non lus",
      value: fmt(m.unread ?? 0),
      sub: `${fmt(m.total ?? 0)} messages au total`,
      badge: (m.unread ?? 0) > 0 ? m.unread : null,
      icon: MessageSquare,
      iconBg: "from-violet-500 to-purple-500",
      cardBg: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/15 dark:to-purple-900/10",
      border: "border-violet-200/70 dark:border-violet-800/30",
      href: "/admin/contacts",
    },
  ]

  const orderSegments = [
    { value: o.pending    ?? 0, color: "#f59e0b", label: "En attente" },
    { value: o.confirmed  ?? 0, color: "#3b82f6", label: "Confirmées" },
    { value: o.processing ?? 0, color: "#8b5cf6", label: "En traitement" },
    { value: o.delivered  ?? 0, color: "#10b981", label: "Livrées" },
    { value: o.cancelled  ?? 0, color: "#ef4444", label: "Annulées" },
  ]
  const totalSeg = orderSegments.reduce((s, x) => s + x.value, 0) || 1

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, {user?.name?.split(" ")[0] ?? "Admin"} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5 capitalize">{todayStr}</p>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          Nouveau produit
        </Link>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className={`relative rounded-2xl border ${kpi.border} ${kpi.cardBg} p-5 flex flex-col gap-4 hover:shadow-md transition-all group`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 bg-gradient-to-br ${kpi.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                <kpi.icon className="w-5 h-5 text-white" />
              </div>
              {kpi.badge ? (
                <span className="flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {kpi.badge}
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
              )}
            </div>
            <div>
              {loading
                ? <span className="block w-20 h-7 bg-white/60 dark:bg-white/10 rounded-lg animate-pulse mb-1.5" />
                : <div className="text-2xl font-bold text-foreground leading-none">{kpi.value}</div>
              }
              {loading
                ? <span className="block w-32 h-3 bg-white/40 dark:bg-white/5 rounded animate-pulse mt-2" />
                : <div className={`text-xs mt-1.5 font-medium ${kpi.subWarning ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
                    {kpi.subWarning && <AlertTriangle className="w-3 h-3 inline mr-0.5 -mt-px" />}
                    {kpi.sub}
                  </div>
              }
            </div>
          </Link>
        ))}
      </div>

      {/* ── Middle section ── */}
      <div className="grid lg:grid-cols-5 gap-5">

        {/* Recent orders (3/5) */}
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
            <div>
              <h2 className="font-semibold text-foreground">Dernières commandes</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Les 5 commandes les plus récentes</p>
            </div>
            <Link href="/admin/orders" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline shrink-0">
              Voir tout <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="divide-y divide-border">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                    <span className="w-20 h-4 bg-muted/50 rounded animate-pulse" />
                    <span className="flex-1 h-4 bg-muted/30 rounded animate-pulse" />
                    <span className="w-20 h-5 bg-muted/30 rounded-full animate-pulse" />
                    <span className="w-24 h-4 bg-muted/30 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : recent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 gap-3 text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 opacity-40" />
                </div>
                <p className="text-sm">Aucune commande pour le moment</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recent.map((order: any) => (
                  <div key={order.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors">
                    <div className="shrink-0 min-w-[5rem]">
                      <div className="text-xs font-mono font-semibold text-foreground">{order.reference}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{fmtDate(order.created_at)}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{order.customer_name}</div>
                      <div className="text-xs text-muted-foreground">
                        {order.items?.length ?? 0} article(s)
                      </div>
                    </div>
                    <StatusBadge status={order.status} />
                    <div className="text-sm font-semibold text-foreground text-right shrink-0 min-w-[5rem]">
                      {fmt(order.total)}
                      <span className="text-[10px] font-normal text-muted-foreground ml-0.5">FCFA</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column (2/5) */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Donut — order status */}
          <div className="bg-card rounded-2xl border border-border p-5 flex-1">
            <h2 className="font-semibold text-foreground">Statut des commandes</h2>
            <p className="text-xs text-muted-foreground mt-0.5 mb-4">Répartition par état</p>

            {loading ? (
              <div className="flex items-center justify-center py-4">
                <span className="w-28 h-28 rounded-full border-[13px] border-muted/40 animate-pulse" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 shrink-0 relative">
                  <DonutChart segments={orderSegments} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold text-foreground leading-none">{o.total ?? 0}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">total</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2.5">
                  {orderSegments.map((seg) => (
                    <div key={seg.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                          {seg.label}
                        </span>
                        <span className="font-semibold text-foreground">{seg.value}</span>
                      </div>
                      <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${(seg.value / totalSeg) * 100}%`, backgroundColor: seg.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product health */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-foreground">Catalogue produits</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {loading ? "—" : `${fmt(p.total ?? 0)} produits enregistrés`}
                </p>
              </div>
              <Link
                href="/admin/products"
                className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Eye className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-100 dark:border-emerald-800/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Actifs</span>
                </div>
                {loading
                  ? <span className="w-8 h-6 bg-emerald-200/50 rounded animate-pulse" />
                  : <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{p.active ?? 0}</span>
                }
              </div>

              {!loading && (p.low_stock ?? 0) > 0 && (
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/15 border border-amber-100 dark:border-amber-800/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-400 rounded-lg flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-amber-800 dark:text-amber-300">Stock faible</span>
                  </div>
                  <span className="text-xl font-bold text-amber-700 dark:text-amber-400">{p.low_stock}</span>
                </div>
              )}

              <Link
                href="/admin/products/create"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Plus className="w-4 h-4" />
                Ajouter un produit
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Actions rapides</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "Nouveau produit",     desc: "Ajouter au catalogue",        href: "/admin/products/create", icon: Package,       color: "from-emerald-500 to-teal-400" },
            { label: "Gérer les commandes", desc: "Traiter les commandes",        href: "/admin/orders",          icon: ShoppingCart,  color: "from-blue-500 to-indigo-500" },
            { label: "Lire les messages",   desc: "Répondre aux contacts",        href: "/admin/contacts",        icon: MessageSquare, color: "from-violet-500 to-purple-500" },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/30 hover:border-primary/30 transition-all group"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${a.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm`}>
                <a.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground">{a.label}</div>
                <div className="text-xs text-muted-foreground">{a.desc}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
