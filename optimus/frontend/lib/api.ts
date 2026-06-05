const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'Erreur API')
  return json
}

// ── Produits ────────────────────────────────────────────────
export const getProducts = (params?: Record<string, string>) => {
  const qs = params ? '?' + new URLSearchParams(params).toString() : ''
  return apiFetch<{ success: boolean; data: any }>(`/products${qs}`)
}

export const getProduct = (id: number) =>
  apiFetch<{ success: boolean; data: any }>(`/products/${id}`)

// ── Catégories ──────────────────────────────────────────────
export const getCategories = () =>
  apiFetch<{ success: boolean; data: any[] }>('/categories')

// ── Commandes ───────────────────────────────────────────────
export interface OrderItem {
  product_id?: number
  product_name?: string
  product_price?: number
  quantity: number
}

export interface OrderPayload {
  customer_name: string
  customer_email?: string
  customer_phone?: string
  customer_address?: string
  notes?: string
  items: OrderItem[]
}

export const createOrder = (payload: OrderPayload) =>
  apiFetch<{ success: boolean; message: string; reference: string; data: any }>('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

// ── Contact ─────────────────────────────────────────────────
export interface ContactPayload {
  name: string
  email: string
  subject?: string
  message: string
}

export const sendContact = (payload: ContactPayload) =>
  apiFetch<{ success: boolean; message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

// ── Auth (admin) ────────────────────────────────────────────
export const login = (email: string, password: string) =>
  apiFetch<{ success: boolean; token: string; user: any }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
