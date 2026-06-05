"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingCart, Search, ArrowLeft, Plus, Minus, X, Trash2,
  Monitor, Cpu, Network, ShieldCheck, Package, ShoppingBag,
  ArrowRight, MessageCircle, MapPin, Smartphone,
  HardDrive, Wifi, Battery, Camera, Server, Zap, Globe, Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogoWordmark } from "@/components/logo"
import { getProducts, getCategories, createOrder } from "@/lib/api"

// ── Icon lookup (DB stores icon name as string) ───────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor, Cpu, Network, ShieldCheck, HardDrive, Wifi, Battery,
  Camera, Server, Zap, Globe, Lock, Package,
}

function CategoryIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && ICON_MAP[name]) ? ICON_MAP[name] : Package
  return <Icon className={className} />
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface ApiProduct {
  id: number
  name: string
  price: number
  image: string | null
  badge: string | null
  stock: number
  active: boolean
  category: { id: number; name: string; slug: string; icon?: string; image?: string } | null
}

interface ApiCategory {
  id: number
  name: string
  slug: string
  icon?: string
  image?: string
  products_count?: number
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
}

const CART_KEY = "optimus_cart"
const FALLBACK_IMG = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"

// ── Skeletons ─────────────────────────────────────────────────────────────────
function ProductSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="flex justify-between items-center mt-3">
          <div className="h-5 bg-muted rounded w-24" />
          <div className="h-8 bg-muted rounded w-20" />
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BoutiquePage() {
  // Data
  const [products, setProducts]         = useState<ApiProduct[]>([])
  const [categories, setCategories]     = useState<ApiCategory[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [currentPage, setCurrentPage]   = useState(1)
  const [lastPage, setLastPage]         = useState(1)
  const [loadingMore, setLoadingMore]   = useState(false)

  // Filters
  const [searchQuery, setSearchQuery]           = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Cart
  const [cart, setCart]         = useState<CartItem[]>([])
  const [cartReady, setCartReady] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Checkout
  const [customerName, setCustomerName]   = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [address, setAddress]             = useState("")
  const [isSubmitting, setIsSubmitting]   = useState(false)

  // ── Cart persistence ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY)
      if (saved) setCart(JSON.parse(saved))
    } catch {}
    setCartReady(true)
  }, [])

  useEffect(() => {
    if (!cartReady) return
    if (cart.length === 0) localStorage.removeItem(CART_KEY)
    else localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart, cartReady])

  // ── Fetch categories ──
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data ?? []))
      .catch(() => {})
      .finally(() => setCategoriesLoading(false))
  }, [])

  // ── Fetch products ──
  const fetchProducts = useCallback(async (page = 1, append = false) => {
    if (page === 1) setProductsLoading(true)
    else setLoadingMore(true)

    const params: Record<string, string> = { page: String(page), per_page: "12" }
    if (selectedCategory) params.category = selectedCategory
    if (searchQuery.trim()) params.search = searchQuery.trim()

    try {
      const res = await getProducts(params)
      const data = res.data
      const items: ApiProduct[] = Array.isArray(data) ? data : (data?.data ?? [])
      setLastPage(data?.last_page ?? 1)
      setCurrentPage(data?.current_page ?? 1)
      setProducts((prev) => append ? [...prev, ...items] : items)
    } catch {}
    finally {
      setProductsLoading(false)
      setLoadingMore(false)
    }
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    const timer = setTimeout(() => fetchProducts(1), searchQuery ? 400 : 0)
    return () => clearTimeout(timer)
  }, [fetchProducts, searchQuery])

  // ── Cart actions ──
  const addToCart = (product: ApiProduct) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image ?? FALLBACK_IMG,
      }]
    })
  }

  const updateQuantity = (id: number, delta: number) =>
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
          .filter((i) => i.quantity > 0)
    )

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id))

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  // ── WhatsApp + save order ──
  const openWhatsApp = async () => {
    if (!customerName.trim()) {
      alert("Veuillez entrer votre nom avant de continuer.")
      return
    }
    setIsSubmitting(true)
    let reference = ""
    try {
      const res = await createOrder({
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim() || undefined,
        customer_address: address.trim() || undefined,
        items: cart.map((i) => ({ product_name: i.name, product_price: i.price, quantity: i.quantity })),
      })
      reference = res.reference ?? ""
      setCart([])
      setCustomerName("")
      setCustomerPhone("")
      setAddress("")
    } catch {}
    finally { setIsSubmitting(false) }

    const lines = [
      "Bonjour Optimus+ Solutions !",
      "",
      "Je souhaite passer une commande :",
      ...(reference ? [`Ref commande : ${reference}`, ""] : []),
      `Nom : ${customerName.trim()}`,
      ...(customerPhone.trim() ? [`Tel : ${customerPhone.trim()}`] : []),
      "",
      "Detail de la commande :",
      ...cart.map((i) => `- ${i.name} x${i.quantity} : ${formatPrice(i.price * i.quantity)}`),
      "",
      `Total : ${formatPrice(cartTotal)}`,
      "",
      `Adresse de livraison : ${address.trim() || "a preciser"}`,
      "",
      "Je vais effectuer le depot et vous envoyer la preuve de paiement.",
      "Merci !",
    ]
    window.open(`https://wa.me/22953860857?text=${encodeURIComponent(lines.join("\n"))}`, "_blank")
  }

  // ── Category select ──
  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-40 bg-primary/95 backdrop-blur-md shadow-lg shadow-primary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/" className="flex items-center gap-1.5 text-primary-foreground/60 hover:text-accent transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Accueil</span>
              </Link>
              <div className="h-5 w-px bg-primary-foreground/20" />
              <LogoWordmark />
            </div>

            <div className="flex-1 max-w-sm hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                <Input
                  type="search"
                  placeholder="Rechercher un produit…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-accent"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-primary-foreground hover:text-accent transition-colors"
              aria-label="Voir le panier"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>

          <div className="pb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
              <Input
                type="search" placeholder="Rechercher…"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80" alt="" aria-hidden="true" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="shopGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#shopGrid)" />
          </svg>
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full mb-6">
              <ShoppingBag className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Boutique Optimus+</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 text-balance leading-[1.1]">
              Matériaux &amp; Équipements Tech
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-xl mx-auto mb-8">
              Sélection professionnelle de produits IT, énergie et sécurité livrés partout en Afrique.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-bold px-8 shadow-xl shadow-accent/30 group" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
                Voir nos produits
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-foreground mb-8 text-center">
            Catégories de produits
          </motion.h2>

          {categoriesLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <div key={i} className="h-44 bg-muted/50 rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {categories.map((cat, index) => (
                <motion.button
                  type="button" key={cat.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                  onClick={() => handleCategorySelect(selectedCategory === cat.slug ? null : cat.slug)}
                  className={`group relative rounded-2xl overflow-hidden border text-left transition-all hover:-translate-y-1 hover:shadow-xl ${selectedCategory === cat.slug ? "border-accent ring-2 ring-accent/30" : "border-border hover:border-accent/50"}`}
                >
                  <div className="relative h-32 overflow-hidden">
                    {cat.image ? (
                      <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/60 to-primary/40" />
                    )}
                    <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/50 transition-colors" />
                    <CategoryIcon name={cat.icon} className="absolute top-4 left-4 w-7 h-7 text-accent" />
                  </div>
                  <div className={`p-4 ${selectedCategory === cat.slug ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                    <p className="font-semibold text-sm">{cat.name}</p>
                    <p className={`text-xs mt-0.5 ${selectedCategory === cat.slug ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {cat.products_count ?? 0} produit{(cat.products_count ?? 0) !== 1 ? "s" : ""}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory ? categories.find((c) => c.slug === selectedCategory)?.name ?? "Produits" : "Tous les produits"}
              </h2>
              {!productsLoading && (
                <p className="text-muted-foreground text-sm mt-1">{products.length} produit{products.length !== 1 ? "s" : ""}</p>
              )}
            </div>
            {selectedCategory && (
              <button type="button" onClick={() => handleCategorySelect(null)} className="text-sm text-accent hover:underline flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Effacer le filtre
              </button>
            )}
          </div>

          {productsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Aucun produit trouvé</p>
              <button type="button" onClick={() => { setSearchQuery(""); handleCategorySelect(null) }} className="mt-3 text-accent text-sm hover:underline">
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={product.image ?? FALLBACK_IMG}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                      {product.badge && (
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold shadow-md ${product.badge.toLowerCase() === "nouveau" ? "bg-accent text-primary" : "bg-destructive text-white"}`}>
                          {product.badge}
                        </span>
                      )}

                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full">Rupture de stock</span>
                        </div>
                      )}

                      {product.stock > 0 && (
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="absolute bottom-3 right-3 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-primary transition-all translate-y-2 group-hover:translate-y-0"
                          aria-label={`Ajouter ${product.name} au panier`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                        {product.category?.name ?? "—"}
                      </p>
                      <h3 className="font-semibold text-foreground mb-3 line-clamp-2 text-sm leading-snug min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base font-bold text-accent leading-none">{formatPrice(product.price)}</span>
                        <Button
                          size="sm"
                          disabled={product.stock === 0}
                          onClick={() => addToCart(product)}
                          className="bg-primary text-primary-foreground hover:bg-accent hover:text-primary transition-colors text-xs shrink-0 disabled:opacity-50"
                        >
                          {product.stock === 0 ? "Indisponible" : "Ajouter"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load more */}
              {currentPage < lastPage && (
                <div className="text-center mt-10">
                  <Button variant="outline" size="lg" disabled={loadingMore} onClick={() => fetchProducts(currentPage + 1, true)}>
                    {loadingMore ? "Chargement…" : "Charger plus de produits"}
                    {!loadingMore && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Cart sidebar ── */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-card z-50 shadow-2xl flex flex-col border-l border-border"
            >
              <div className="p-5 border-b border-border flex items-center justify-between bg-primary">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-bold text-primary-foreground">
                    Panier
                    {cartCount > 0 && <span className="ml-2 px-2 py-0.5 bg-accent text-primary text-xs font-bold rounded-full">{cartCount}</span>}
                  </h2>
                </div>
                <button type="button" onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors text-primary-foreground" aria-label="Fermer le panier">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                    <ShoppingCart className="w-16 h-16 text-muted-foreground/20" />
                    <p className="text-muted-foreground font-medium">Votre panier est vide</p>
                    <button type="button" onClick={() => setIsCartOpen(false)} className="text-accent text-sm hover:underline">Continuer mes achats</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-xl border border-border">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm line-clamp-1">{item.name}</h4>
                          <p className="text-accent font-bold text-sm mt-0.5">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button type="button" aria-label="Diminuer la quantité" onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                            <button type="button" aria-label="Augmenter la quantité" onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start mt-1" aria-label="Supprimer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-border space-y-4 bg-card">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Total estimé</span>
                    <span className="text-xl font-extrabold text-foreground">{formatPrice(cartTotal)}</span>
                  </div>

                  <div className="space-y-2">
                    <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Votre nom complet *" className="h-10 text-sm" required />
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Téléphone (optionnel)" className="pl-9 h-10 text-sm" />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse de livraison (ville, quartier…)" className="pl-9 h-10 text-sm" />
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-xl p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-green-800 dark:text-green-400 uppercase tracking-wide">Dépôt après confirmation</p>
                    <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                      <Smartphone className="w-3.5 h-3.5 shrink-0" />
                      <span>MTN MoMo : <strong>+229 53 86 08 57</strong></span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-500">Envoyez la preuve de paiement via WhatsApp après le dépôt.</p>
                  </div>

                  <button
                    type="button" onClick={openWhatsApp} disabled={isSubmitting}
                    className="w-full h-12 flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-70 text-white font-bold rounded-xl text-base shadow-lg shadow-green-500/20 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {isSubmitting ? "Enregistrement…" : "Commander via WhatsApp"}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">WhatsApp s&apos;ouvre avec votre commande pré-remplie</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
