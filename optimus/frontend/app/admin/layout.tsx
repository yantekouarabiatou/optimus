"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getStoredUser, isAdmin, adminLogout, adminGetNotifications } from "@/lib/auth"
import {
  LayoutDashboard, Package, ShoppingCart, Users, Shield,
  MessageSquare, Tag, LogOut, Menu, X, ChevronRight,
  Bell, UserCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notifs { pending_orders: number; unread_messages: number }

const navGroups = [
  {
    label: "Principal",
    items: [
      { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true, badge: null as keyof Notifs | null },
    ],
  },
  {
    label: "Catalogue",
    items: [
      { href: "/admin/products",   label: "Produits",   icon: Package, exact: false, badge: null as keyof Notifs | null },
      { href: "/admin/categories", label: "Catégories", icon: Tag,     exact: false, badge: null as keyof Notifs | null },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/admin/orders",   label: "Commandes", icon: ShoppingCart, exact: false, badge: "pending_orders"  as keyof Notifs | null },
      { href: "/admin/contacts", label: "Messages",  icon: MessageSquare, exact: false, badge: "unread_messages" as keyof Notifs | null },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/admin/users",       label: "Utilisateurs", icon: Users,  exact: false, badge: null as keyof Notifs | null },
      { href: "/admin/permissions", label: "Permissions",  icon: Shield, exact: false, badge: null as keyof Notifs | null },
    ],
  },
]

function Badge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span className="ml-auto flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-red-500 text-white leading-none">
      {count > 99 ? "99+" : count}
    </span>
  )
}

function NavItem({
  item, pathname, notifs, onClick,
}: {
  item: (typeof navGroups)[0]["items"][0]
  pathname: string
  notifs: Notifs
  onClick?: () => void
}) {
  const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
  const badgeCount = item.badge ? notifs[item.badge] : 0
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-white/15 text-white shadow-sm"
          : "text-white/65 hover:bg-white/8 hover:text-white/90"
      }`}
    >
      <item.icon className={`w-4 h-4 shrink-0 ${active ? "text-accent" : ""}`} />
      <span className="flex-1">{item.label}</span>
      {badgeCount > 0 && <Badge count={badgeCount} />}
      {active && badgeCount === 0 && <ChevronRight className="w-3 h-3 opacity-60" />}
    </Link>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [ready, setReady]             = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifs, setNotifs]           = useState<Notifs>({ pending_orders: 0, unread_messages: 0 })
  const user = getStoredUser()

  useEffect(() => {
    if (pathname === "/admin/login") { setReady(true); return }
    if (!isAdmin()) { router.replace("/admin/login"); return }
    setReady(true)
  }, [pathname, router])

  const fetchNotifs = useCallback(async () => {
    try {
      const res = await adminGetNotifications()
      setNotifs(res.data)
    } catch { /* silently ignore */ }
  }, [])

  useEffect(() => {
    if (!ready || pathname === "/admin/login") return
    fetchNotifs()
    const id = setInterval(fetchNotifs, 30_000)
    return () => clearInterval(id)
  }, [ready, pathname, fetchNotifs])

  // Refresh notifs when navigating away from orders/contacts (status may have changed)
  useEffect(() => {
    if (ready && pathname !== "/admin/login") fetchNotifs()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) return null
  if (pathname === "/admin/login") return <>{children}</>

  const handleLogout = async () => {
    await adminLogout()
    router.replace("/admin/login")
  }

  const totalNotifs = notifs.pending_orders + notifs.unread_messages

  const Sidebar = ({ mobile = false }) => (
    <aside className={`flex flex-col h-full bg-[#0D2B6E] ${mobile ? "w-72" : "w-64"}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 shrink-0">
        <Image src="/logo.jpg" alt="Optimus+" width={36} height={36} className="rounded-lg shrink-0" />
        <div className="min-w-0">
          <div className="font-bold text-white text-sm leading-none">OPTIMUS+</div>
          <div className="text-white/50 text-[10px] tracking-wider mt-0.5">Administration</div>
        </div>
        {mobile && (
          <button type="button" onClick={() => setSidebarOpen(false)} className="ml-auto text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-3 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  notifs={notifs}
                  onClick={() => setSidebarOpen(false)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10 shrink-0 space-y-1">
        <Link
          href="/admin/profile"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
            <span className="text-accent text-xs font-bold">
              {user?.name?.[0]?.toUpperCase() ?? "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.name ?? "Admin"}</p>
            <p className="text-white/40 text-[10px] truncate">{user?.email}</p>
          </div>
          <UserCircle className="w-3.5 h-3.5 text-white/30" />
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors text-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          Déconnexion
        </button>
      </div>
    </aside>
  )

  const crumb = navGroups.flatMap((g) => g.items).find((n) =>
    n.exact ? pathname === n.href : pathname.startsWith(n.href)
  )

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-3 shrink-0 shadow-sm">
          <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm flex-1">
            <span className="text-muted-foreground">Admin</span>
            {crumb && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground">{crumb.label}</span>
              </>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 relative" title="Notifications">
              <Bell className="w-4 h-4" />
              {totalNotifs > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold rounded-full bg-red-500 text-white leading-none">
                  {totalNotifs > 99 ? "99+" : totalNotifs}
                </span>
              )}
            </Button>
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 hidden sm:flex">
                Voir le site
              </Button>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}
