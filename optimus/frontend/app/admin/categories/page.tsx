"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { adminGetCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory, adminUploadImage } from "@/lib/auth"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, X, Save, Upload, ImageIcon } from "lucide-react"

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

const emptyForm = { name: "", icon: "", active: true }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const [modal, setModal]           = useState<"create" | "edit" | null>(null)
  const [editing, setEditing]       = useState<any>(null)
  const [form, setForm]             = useState(emptyForm)
  const [imageFile, setImageFile]   = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef                = useRef<HTMLInputElement>(null)
  const [saving, setSaving]         = useState(false)
  const [deleting, setDeleting]     = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try { setCategories((await adminGetCategories()).data ?? []) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const resetImageState = () => {
    setImageFile(null)
    setImagePreview("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const openCreate = () => { setForm(emptyForm); resetImageState(); setEditing(null); setModal("create") }
  const openEdit   = (cat: any) => {
    setForm({ name: cat.name, icon: cat.icon ?? "", active: cat.active ?? true })
    resetImageState()
    if (cat.image) setImagePreview(cat.image)
    setEditing(cat); setModal("edit")
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    try {
      let imageUrl: string | undefined = imagePreview || undefined
      if (imageFile) imageUrl = await adminUploadImage(imageFile)

      const payload = { ...form, image: imageUrl }
      if (modal === "create") {
        const res = await adminCreateCategory(payload)
        setCategories((p) => [...p, res.data])
      } else {
        const res = await adminUpdateCategory(editing.id, payload)
        setCategories((p) => p.map((c) => (c.id === editing.id ? res.data : c)))
      }
      setModal(null)
    } catch (e: any) { alert(e.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Supprimer "${name}" ?`)) return
    setDeleting(id)
    try {
      await adminDeleteCategory(id)
      setCategories((p) => p.filter((c) => c.id !== id))
    } catch (e: any) { alert(e.message) }
    finally { setDeleting(null) }
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.original.image
            ? <img src={row.original.image} alt="" className="w-8 h-8 rounded-lg object-cover border border-border shrink-0" /> // eslint-disable-line
            : <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold shrink-0">{row.original.name[0]}</div>
          }
          <span className="font-medium text-sm">{row.original.name}</span>
        </div>
      ),
    },
    { accessorKey: "icon", header: "Icône", cell: ({ getValue }) => <span className="text-sm text-muted-foreground">{getValue() as string || "—"}</span> },
    {
      accessorFn: (r) => r.products_count ?? 0,
      id: "products",
      header: "Produits",
      cell: ({ getValue }) => <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold">{getValue() as number}</span>,
    },
    {
      accessorKey: "active",
      header: "Statut",
      cell: ({ getValue }) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getValue() ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${getValue() ? "bg-green-500" : "bg-slate-400"}`} />
          {getValue() ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      id: "actions", header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" onClick={() => openEdit(row.original)}>
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
            disabled={deleting === row.original.id}
            onClick={() => handleDelete(row.original.id, row.original.name)}
          >
            {deleting === row.original.id
              ? <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
              : <Trash2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Catégories</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{categories.length} catégorie(s)</p>
        </div>
        <Button className="gap-2 shadow-sm" onClick={openCreate}><Plus className="w-4 h-4" />Nouvelle catégorie</Button>
      </div>

      <div className="bg-white dark:bg-card rounded-2xl border border-border p-5 shadow-sm">
        <DataTable columns={columns} data={categories} loading={loading} searchPlaceholder="Rechercher une catégorie..." />
      </div>

      {modal && (
        <Modal title={modal === "create" ? "Nouvelle catégorie" : "Modifier la catégorie"} onClose={() => setModal(null)}>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Nom *</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="h-10" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Icône (nom Lucide)</label>
              <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Ex: Monitor, Cpu..." className="h-10" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Image</label>
              <input ref={fileInputRef} id="cat-image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {imagePreview ? (
                <div className="flex items-center gap-3 p-2 border border-border rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="" className="w-12 h-12 rounded-lg object-cover border border-border shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{imageFile?.name ?? "Image actuelle"}</p>
                    <label htmlFor="cat-image" className="text-xs text-primary cursor-pointer hover:underline">Changer</label>
                  </div>
                  <button type="button" onClick={() => { resetImageState() }} className="text-muted-foreground hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label htmlFor="cat-image" className="flex items-center gap-3 p-3 border-2 border-dashed border-border hover:border-primary/40 rounded-lg cursor-pointer transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors shrink-0">
                    <ImageIcon className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Choisir une image</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP · max 5 Mo</p>
                  </div>
                  <Upload className="w-4 h-4 text-muted-foreground ml-auto" />
                </label>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="cat-active" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-primary" />
              <label htmlFor="cat-active" className="text-sm font-medium cursor-pointer">Catégorie active</label>
            </div>
            <div className="flex gap-3 pt-1">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setModal(null)}>Annuler</Button>
              <Button type="submit" className="flex-1 gap-2" disabled={saving}>
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                Enregistrer
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
