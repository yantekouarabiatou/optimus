"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { adminGetProducts, adminDeleteProduct } from "@/lib/auth"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState("")
  const [deleting, setDeleting] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true); setError("")
    try {
      const res = await adminGetProducts()
      setProducts(res.data?.data ?? res.data ?? [])
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Supprimer "${name}" ?`)) return
    setDeleting(id)
    try {
      await adminDeleteProduct(id)
      setProducts((p) => p.filter((x) => x.id !== id))
    } catch (e: any) { alert(e.message) }
    finally { setDeleting(null) }
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Produit",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.original.image && (
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-border shrink-0">
              <Image src={row.original.image} alt="" fill className="object-cover" />
            </div>
          )}
          <div>
            <p className="font-medium text-foreground text-sm leading-tight">{row.original.name}</p>
            {row.original.badge && (
              <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded font-medium">{row.original.badge}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorFn: (r) => r.category?.name ?? "",
      id: "category",
      header: "Catégorie",
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">{getValue() as string || "—"}</span>
      ),
    },
    {
      accessorKey: "price",
      header: "Prix (FCFA)",
      cell: ({ getValue }) => (
        <span className="font-semibold tabular-nums text-sm">{Number(getValue()).toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ getValue }) => {
        const v = Number(getValue())
        return (
          <span className={`font-medium text-sm ${v > 5 ? "text-green-600" : v > 0 ? "text-amber-500" : "text-red-500"}`}>
            {v}
          </span>
        )
      },
    },
    {
      accessorKey: "active",
      header: "Statut",
      cell: ({ getValue }) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
          getValue() ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                     : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${getValue() ? "bg-green-500" : "bg-slate-400"}`} />
          {getValue() ? "Actif" : "Inactif"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Link href={`/admin/products/${row.original.id}/edit`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600">
              <Pencil className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Button
            variant="ghost" size="icon"
            className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
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
          <h1 className="text-2xl font-bold text-foreground">Produits</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{products.length} produit(s)</p>
        </div>
        <Link href="/admin/products/create">
          <Button className="gap-2 shadow-sm"><Plus className="w-4 h-4" />Nouveau produit</Button>
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

      <div className="bg-white dark:bg-card rounded-2xl border border-border p-5 shadow-sm">
        <DataTable columns={columns} data={products} loading={loading} searchPlaceholder="Rechercher un produit..." />
      </div>
    </div>
  )
}
