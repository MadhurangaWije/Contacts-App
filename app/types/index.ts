export interface Contact {
  id: number
  name: string
  email: string
  mobileNumber: string
  homeNumber: string
  address: string
  recordModifiedAt: string
}

export interface ContactsState {
  items: Contact[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  selectedContact: Contact | null
  total: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
} 