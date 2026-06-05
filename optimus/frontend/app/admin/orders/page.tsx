"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { adminGetOrders, adminUpdateOrderStatus, adminDeleteOrder } from "@/lib/auth"
import { DataTable } from "@/components/admin/data-table"
import { AdminSelect } from "@/components/admin/admin-select"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"

const STATUS_OPTIONS = [
  { value: "pending",    label: "En attente" },
  { value: "confirmed",  label: "Confirmée" },
  { value: "processing", label: "En traitement" },
  { value: "delivered",  label: "Livrée" },
  { value: "cancelled",  label: "Annulée" },
]

const statusStyle: Record<string, { bg: string; text: string; dot: string }> = {
  pending:    { bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-400"  },
  confirmed:  { bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-500"   },
  processing: { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
  delivered:  { bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500"  },
  cancelled:  { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500"    },
}

function StatusBadge({ status }: { status: string }) {
  const s = statusStyle[status] ?? { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-slate-400" }
  const label = STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {label}
    </span>
  )
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders]     = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try { setOrders((await adminGetOrders()).data ?? []) }
    catch { setOrders([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleStatus = async (id: number, status: string) => {
    setUpdating(id)
    try {
      await adminUpdateOrderStatus(id, status)
      setOrders((p) => p.map((o) => (o.id === id ? { ...o, status } : o)))
    } catch (e: any) { alert(e.message) }
    finally { setUpdating(null) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette commande ?")) return
    setDeleting(id)
    try {
      await adminDeleteOrder(id)
      setOrders((p) => p.filter((o) => o.id !== id))
    } catch (e: any) { alert(e.message) }
    finally { setDeleting(null) }
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "reference",
      header: "Référence",
      cell: ({ getValue }) => (
        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "customer_name",
      header: "Client",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">{row.original.customer_name}</p>
          {row.original.customer_phone && (
            <p className="text-xs text-muted-foreground">{row.original.customer_phone}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: "Montant",
      cell: ({ getValue }) => (
        <span className="font-semibold tabular-nums text-sm">
          {Number(getValue() ?? 0).toLocaleString("fr-FR")} FCFA
        </span>
      ),
    },
    {
      id: "status",
      header: "Statut",
      cell: ({ row }) => (
        <div className="w-44">
          <AdminSelect
            options={STATUS_OPTIONS}
            value={STATUS_OPTIONS.find((o) => o.value === row.original.status) ?? null}
            onChange={(opt) => opt && handleStatus(row.original.id, opt.value as string)}
            isDisabled={updating === row.original.id}
          />
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ getValue }) => (
        <span className="text-xs text-muted-foreground">
          {new Date(getValue() as string).toLocaleDateString("fr-FR")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost" size="icon"
            className="h-8 w-8 hover:bg-muted"
            title="Voir le détail"
            onClick={() => router.push(`/admin/orders/${row.original.id}`)}
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost" size="icon"
            className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
            title="Supprimer"
            disabled={deleting === row.original.id}
            onClick={() => handleDelete(row.original.id)}
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Commandes</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{orders.length} commande(s)</p>
      </div>

      {/* Résumé par statut */}
      {!loading && orders.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map(({ value, label }) => {
            const count = orders.filter((o) => o.status === value).length
            if (!count) return null
            const s = statusStyle[value] ?? { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-slate-400" }
            return (
              <span key={value} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                {label} <span className="font-bold ml-0.5">({count})</span>
              </span>
            )
          })}
        </div>
      )}

      <div className="bg-white dark:bg-card rounded-2xl border border-border p-5 shadow-sm">
        <DataTable
          columns={columns}
          data={orders}
          loading={loading}
          searchPlaceholder="Rechercher une commande..."
        />
      </div>
    </div>
  )
}
