"use client"

import { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { adminGetPermissions } from "@/lib/auth"
import { DataTable } from "@/components/admin/data-table"
import { Shield, Lock } from "lucide-react"

const groupColor: Record<string, string> = {
  products:    "bg-blue-100 text-blue-700",
  categories:  "bg-violet-100 text-violet-700",
  orders:      "bg-amber-100 text-amber-700",
  contacts:    "bg-teal-100 text-teal-700",
  dashboard:   "bg-green-100 text-green-700",
}

export default function AdminPermissionsPage() {
  const [permissions, setPermissions] = useState<any[]>([])
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    adminGetPermissions()
      .then((r) => setPermissions(r.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Permission",
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="font-mono text-sm text-foreground">{getValue() as string}</span>
        </div>
      ),
    },
    {
      id: "group",
      header: "Groupe",
      accessorFn: (r) => (r.name as string).split(".")[0],
      cell: ({ getValue }) => {
        const g = getValue() as string
        const cls = groupColor[g] ?? "bg-slate-100 text-slate-600"
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{g}</span>
      },
    },
    {
      id: "action",
      header: "Action",
      accessorFn: (r) => (r.name as string).split(".")[1] ?? "",
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground capitalize">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "guard_name",
      header: "Guard",
      cell: ({ getValue }) => (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
          <Shield className="w-3 h-3" />{getValue() as string}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Permissions</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{permissions.length} permission(s) définies</p>
      </div>

      {/* Récap par rôle */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { role: "admin",  label: "Administrateur", desc: "Accès complet à toutes les fonctionnalités", color: "border-primary/30 bg-primary/5" },
          { role: "editor", label: "Éditeur",         desc: "Lecture, création et modification des produits", color: "border-violet-300 bg-violet-50 dark:bg-violet-900/10" },
        ].map((r) => (
          <div key={r.role} className={`rounded-xl border p-4 ${r.color}`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">{r.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">{r.desc}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {permissions
                .filter((p) => r.role === "admin" ? true : ["products.view","products.create","products.edit"].includes(p.name))
                .map((p) => (
                  <span key={p.id} className="text-[10px] bg-white/70 dark:bg-white/10 border border-border px-1.5 py-0.5 rounded font-mono">
                    {p.name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-card rounded-2xl border border-border p-5 shadow-sm">
        <DataTable columns={columns} data={permissions} loading={loading} searchPlaceholder="Rechercher une permission..." />
      </div>
    </div>
  )
}
