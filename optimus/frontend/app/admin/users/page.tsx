"use client"

import { useEffect, useState, useCallback } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { adminGetUsers, adminUpdateUserRole, adminDeleteUser } from "@/lib/auth"
import { DataTable } from "@/components/admin/data-table"
import { AdminSelect } from "@/components/admin/admin-select"
import { Button } from "@/components/ui/button"
import { Trash2, ShieldCheck } from "lucide-react"

const roleOptions = [
  { value: "admin",  label: "Administrateur" },
  { value: "editor", label: "Éditeur" },
]

export default function AdminUsersPage() {
  const [users, setUsers]       = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try { setUsers((await adminGetUsers()).data ?? []) }
    catch { setUsers([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleRoleChange = async (userId: number, role: string) => {
    setUpdating(userId)
    try {
      const res = await adminUpdateUserRole(userId, [role])
      setUsers((p) => p.map((u) => (u.id === userId ? { ...u, roles: [role] } : u)))
    } catch (e: any) { alert(e.message) }
    finally { setUpdating(null) }
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Supprimer l'utilisateur "${name}" ?`)) return
    setDeleting(id)
    try { await adminDeleteUser(id); setUsers((p) => p.filter((u) => u.id !== id)) }
    catch (e: any) { alert(e.message) }
    finally { setDeleting(null) }
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Utilisateur",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold shrink-0">
            {row.original.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-sm">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => <span className="text-sm text-muted-foreground">{getValue() as string}</span>,
    },
    {
      id: "roles",
      header: "Rôle",
      cell: ({ row }) => {
        const currentRole = row.original.roles?.[0] ?? ""
        return (
          <div className="w-44">
            <AdminSelect
              options={roleOptions}
              value={roleOptions.find((o) => o.value === currentRole) ?? null}
              onChange={(opt) => opt && handleRoleChange(row.original.id, opt.value as string)}
              isDisabled={updating === row.original.id}
              placeholder="Aucun rôle"
            />
          </div>
        )
      },
    },
    {
      accessorFn: (r) => r.roles?.includes("admin") ? "admin" : "user",
      id: "badge",
      header: "Accès",
      cell: ({ row }) => {
        const isAdm = row.original.roles?.includes("admin")
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${isAdm ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"}`}>
            <ShieldCheck className="w-3 h-3" />
            {isAdm ? "Admin" : "Standard"}
          </span>
        )
      },
    },
    {
      id: "actions", header: "",
      cell: ({ row }) => (
        <div className="flex justify-end">
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Utilisateurs</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{users.length} utilisateur(s) enregistré(s)</p>
      </div>
      <div className="bg-white dark:bg-card rounded-2xl border border-border p-5 shadow-sm">
        <DataTable columns={columns} data={users} loading={loading} searchPlaceholder="Rechercher un utilisateur..." />
      </div>
    </div>
  )
}
