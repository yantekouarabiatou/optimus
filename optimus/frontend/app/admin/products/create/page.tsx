"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { adminCreateProduct, adminGetCategories, adminUploadImage } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminSelect } from "@/components/admin/admin-select"
import { ArrowLeft, Save, AlertCircle, Upload, X, ImageIcon } from "lucide-react"

export default function AdminCreateProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    badge: "",
    stock: "",
    active: true,
  })

  useEffect(() => {
    adminGetCategories().then((res) => setCategories(res.data ?? []))
  }, [])

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      let imageUrl: string | undefined
      if (imageFile) imageUrl = await adminUploadImage(imageFile)

      await adminCreateProduct({
        category_id: Number(form.category_id),
        name: form.name,
        description: form.description || undefined,
        price: Number(form.price),
        image: imageUrl,
        badge: form.badge || undefined,
        stock: form.stock ? Number(form.stock) : undefined,
        active: form.active,
      })
      router.push("/admin/products")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nouveau produit</h1>
          <p className="text-muted-foreground text-sm">Remplissez les informations du produit</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl p-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Champs du formulaire ── */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 space-y-5">

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Nom du produit *</label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex: Serveur Dell PowerEdge" required className="h-11" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <AdminSelect
                label="Catégorie *"
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                value={form.category_id ? { value: Number(form.category_id), label: categories.find((c) => c.id === Number(form.category_id))?.name ?? "" } : null}
                onChange={(opt) => set("category_id", opt ? String(opt.value) : "")}
                placeholder="Sélectionner une catégorie..."
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Prix (FCFA) *</label>
                <Input type="number" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="Ex: 250000" required className="h-11" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Description détaillée du produit..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Stock</label>
                <Input type="number" min="0" value={form.stock} onChange={(e) => set("stock", e.target.value)} placeholder="0" className="h-11" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Badge</label>
                <Input value={form.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Ex: Nouveau, Promo..." className="h-11" />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input
                id="active"
                type="checkbox"
                checked={form.active}
                onChange={(e) => set("active", e.target.checked)}
                className="w-4 h-4 rounded border-input accent-primary"
              />
              <label htmlFor="active" className="text-sm font-medium text-foreground cursor-pointer">
                Produit actif (visible sur la boutique)
              </label>
            </div>

            <div className="flex gap-3 pt-2 border-t border-border">
              <Link href="/admin/products" className="flex-1">
                <Button type="button" variant="outline" className="w-full h-11">Annuler</Button>
              </Link>
              <Button type="submit" disabled={saving} className="flex-1 h-11 gap-2">
                {saving
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Enregistrement...</>
                  : <><Save className="w-4 h-4" />Enregistrer le produit</>
                }
              </Button>
            </div>
          </div>

          {/* ── Zone image ── */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Image du produit</h3>
                <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WEBP — max 5 Mo</p>
              </div>

              <input
                ref={fileInputRef}
                id="product-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreview} alt="Aperçu" className="w-full aspect-video object-cover" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <label
                    htmlFor="product-image"
                    className="flex items-center justify-center gap-2 w-full h-9 border border-dashed border-border rounded-lg text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Changer l&apos;image
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="product-image"
                  className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border hover:border-primary/40 rounded-xl p-10 cursor-pointer transition-colors group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <ImageIcon className="w-7 h-7 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">Cliquez pour choisir</p>
                    <p className="text-xs text-muted-foreground mt-1">ou glissez-déposez un fichier ici</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-lg text-xs font-medium text-primary group-hover:bg-primary/20 transition-colors">
                    <Upload className="w-3 h-3" />
                    Parcourir
                  </span>
                </label>
              )}
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
