const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

export interface AdminUser {
  id: number
  name: string
  email: string
  roles: string[]
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}

export function setToken(token: string): void {
  localStorage.setItem('admin_token', token)
}

export function removeToken(): void {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('admin_user')
  return raw ? JSON.parse(raw) : null
}

export function isAdmin(): boolean {
  const user = getStoredUser()
  return user?.roles?.includes('admin') ?? false
}

export async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'Erreur API')
  return json
}

// ── Auth ─────────────────────────────────────────────────────────────────────
export async function adminLogin(email: string, password: string): Promise<AdminUser> {
  const data = await adminFetch<{ success: boolean; token: string; user: AdminUser }>(
    '/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) }
  )
  setToken(data.token)
  localStorage.setItem('admin_user', JSON.stringify(data.user))
  return data.user
}

export async function adminLogout(): Promise<void> {
  try { await adminFetch('/auth/logout', { method: 'POST' }) } finally { removeToken() }
}

export interface ProfilePayload {
  name?: string
  current_password?: string
  password?: string
  password_confirmation?: string
}

export async function adminUpdateProfile(payload: ProfilePayload): Promise<{ success: boolean; message: string; user: AdminUser }> {
  const res = await adminFetch<{ success: boolean; message: string; user: AdminUser }>(
    '/auth/profile',
    { method: 'PUT', body: JSON.stringify(payload) }
  )
  if (res.user) localStorage.setItem('admin_user', JSON.stringify(res.user))
  return res
}

// ── Produits ─────────────────────────────────────────────────────────────────
export interface ProductPayload {
  category_id: number
  name: string
  description?: string
  price: number
  image?: string
  badge?: string
  stock?: number
  active?: boolean
}

export const adminGetProducts = (params?: Record<string, string>) => {
  const qs = params ? '?' + new URLSearchParams(params).toString() : ''
  return adminFetch<{ success: boolean; data: any }>(`/products${qs}`)
}

export const adminCreateProduct = (payload: ProductPayload) =>
  adminFetch<{ success: boolean; data: any }>('/products', { method: 'POST', body: JSON.stringify(payload) })

export const adminUpdateProduct = (id: number, payload: Partial<ProductPayload>) =>
  adminFetch<{ success: boolean; data: any }>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) })

export const adminDeleteProduct = (id: number) =>
  adminFetch<{ success: boolean; message: string }>(`/products/${id}`, { method: 'DELETE' })

// ── Catégories ────────────────────────────────────────────────────────────────
export interface CategoryPayload { name: string; icon?: string; image?: string; active?: boolean }

export const adminGetCategories = () =>
  adminFetch<{ success: boolean; data: any[] }>('/categories')

export const adminCreateCategory = (payload: CategoryPayload) =>
  adminFetch<{ success: boolean; data: any }>('/categories', { method: 'POST', body: JSON.stringify(payload) })

export const adminUpdateCategory = (id: number, payload: Partial<CategoryPayload>) =>
  adminFetch<{ success: boolean; data: any }>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(payload) })

export const adminDeleteCategory = (id: number) =>
  adminFetch<{ success: boolean; message: string }>(`/categories/${id}`, { method: 'DELETE' })

// ── Commandes ────────────────────────────────────────────────────────────────
export const adminGetOrders = () =>
  adminFetch<{ success: boolean; data: any[] }>('/orders')

export const adminGetOrder = (id: number) =>
  adminFetch<{ success: boolean; data: any }>(`/orders/${id}`)

export const adminUpdateOrderStatus = (id: number, status: string) =>
  adminFetch<{ success: boolean; data: any }>(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })

export const adminDeleteOrder = (id: number) =>
  adminFetch<{ success: boolean }>(`/orders/${id}`, { method: 'DELETE' })

// ── Messages contact ──────────────────────────────────────────────────────────
export const adminGetContacts = () =>
  adminFetch<{ success: boolean; data: any[] }>('/contact')

export const adminMarkContactRead = (id: number) =>
  adminFetch<{ success: boolean }>(`/contact/${id}/read`, { method: 'PATCH' })

export const adminDeleteContact = (id: number) =>
  adminFetch<{ success: boolean }>(`/contact/${id}`, { method: 'DELETE' })

// ── Utilisateurs ──────────────────────────────────────────────────────────────
export const adminGetUsers = () =>
  adminFetch<{ success: boolean; data: any[] }>('/users')

export const adminUpdateUserRole = (id: number, roles: string[]) =>
  adminFetch<{ success: boolean; data: any }>(`/users/${id}/roles`, { method: 'PUT', body: JSON.stringify({ roles }) })

export const adminDeleteUser = (id: number) =>
  adminFetch<{ success: boolean }>(`/users/${id}`, { method: 'DELETE' })

// ── Permissions ───────────────────────────────────────────────────────────────
export const adminGetPermissions = () =>
  adminFetch<{ success: boolean; data: any[] }>('/permissions')

// ── Upload ────────────────────────────────────────────────────────────────────
export async function adminUploadImage(file: File): Promise<string> {
  const token = getToken()
  if (!token) throw new Error('Non authentifié')
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    body: formData,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? "Erreur lors de l'upload")
  return json.data.url as string
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const adminGetStats = () =>
  adminFetch<{ success: boolean; data: any }>('/dashboard/stats')

export const adminGetNotifications = () =>
  adminFetch<{ success: boolean; data: { pending_orders: number; unread_messages: number } }>('/dashboard/notifications')
