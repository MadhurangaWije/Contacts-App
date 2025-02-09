import axios from 'axios'
import type { Contact, PaginatedResponse } from '../types'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

const handleApiError = (error: any) => {
  const message = error.response?.data?.message || 'An error occurred'
  toast.error(message)
  throw error
}

export const contactsApi = {
  getAll: (page = 1, limit = 10) => {
    console.log('Making API request with:', { page, limit })
    return api.get<PaginatedResponse<Contact>>(`/contacts?page=${page}&limit=${limit}`)
      .then(response => {
        console.log('Raw API response:', response.data)
        return response
      })
      .catch(handleApiError)
  },
  getById: (id: number) => api.get<Contact>(`/contacts/${id}`),
  create: (contact: Omit<Contact, 'id' | 'recordModifiedAt'>) => 
    api.post<Contact>('/contacts', contact),
  update: (id: number, contact: Partial<Contact>) => {
    console.log("Contact upadte payload: ", contact)
    return api.put<Contact>(`/contacts/${id}`, contact)
  },
  delete: (id: number) => api.delete(`/contacts/${id}`),
}

export default api 