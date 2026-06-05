"use client"

import { useEffect, useState, useCallback } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { adminGetContacts, adminMarkContactRead, adminDeleteContact } from "@/lib/auth"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Trash2, MailOpen, Mail, X } from "lucide-react"

function MessageModal({ msg, onClose }: { msg: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-bold text-foreground">{msg.subject || "(Sans sujet)"}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{msg.name} · {msg.email}</p>
          </div>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground ml-4">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-muted/40 rounded-xl p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
          {msg.message}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Reçu le {new Date(msg.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
    </div>
  )
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try { setContacts((await adminGetContacts()).data ?? []) }
    catch { setContacts([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleRead = async (id: number) => {
    try {
      await adminMarkContactRead(id)
      setContacts((p) => p.map((c) => (c.id === id ? { ...c, is_read: true } : c)))
    } catch {}
  }

  const openMessage = (msg: any) => {
    setSelected(msg)
    if (!msg.is_read) handleRead(msg.id)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce message ?")) return
    setDeleting(id)
    try { await adminDeleteContact(id); setContacts((p) => p.filter((c) => c.id !== id)) }
    catch (e: any) { alert(e.message) }
    finally { setDeleting(null) }
  }

  const unread = contacts.filter((c) => !c.is_read).length

  const columns: ColumnDef<any>[] = [
    {
      id: "unread",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {!row.original.is_read
            ? <span className="w-2 h-2 rounded-full bg-accent" />
            : <span className="w-2 h-2 rounded-full bg-transparent" />
          }
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Expéditeur",
      cell: ({ row }) => (
        <div>
          <p className={`text-sm ${!row.original.is_read ? "font-semibold" : "font-medium"}`}>{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: "Sujet",
      cell: ({ row }) => (
        <span className={`text-sm ${!row.original.is_read ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
          {row.original.subject || "(Sans sujet)"}
        </span>
      ),
    },
    {
      accessorKey: "message",
      header: "Aperçu",
      cell: ({ getValue }) => (
        <span className="text-xs text-muted-foreground line-clamp-1 max-w-xs">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ getValue }) => (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {new Date(getValue() as string).toLocaleDateString("fr-FR")}
        </span>
      ),
    },
    {
      id: "actions", header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" onClick={() => openMessage(row.original)}>
            {row.original.is_read ? <MailOpen className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
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
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{contacts.length} message(s)</p>
        </div>
        {unread > 0 && (
          <span className="px-2.5 py-1 bg-accent text-primary text-xs font-bold rounded-full">{unread} non lu(s)</span>
        )}
      </div>
      <div className="bg-white dark:bg-card rounded-2xl border border-border p-5 shadow-sm">
        <DataTable columns={columns} data={contacts} loading={loading} searchPlaceholder="Rechercher un message..." />
      </div>
      {selected && <MessageModal msg={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
