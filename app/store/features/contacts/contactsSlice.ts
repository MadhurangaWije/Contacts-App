import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { contactsApi } from '@/app/services/api'
import type { Contact, ContactsState } from '@/app/types'
import { toast } from 'react-hot-toast'

const initialState: ContactsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedContact: null,
  total: 0,
}

interface FetchContactsParams {
  page: number
  limit: number
}

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async ({ page, limit }: FetchContactsParams) => {
    const response = await contactsApi.getAll(page, limit)
    console.log('Thunk received data:', response.data)
    return response.data
  }
)

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact: Omit<Contact, 'id' | 'recordModifiedAt'>) => {
    const response = await contactsApi.create(contact)
    return response.data
  }
)

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, contact }: { id: number; contact: Partial<Contact> }) => {
    const response = await contactsApi.update(id, contact)
    return response.data
  }
)

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id: number) => {
    await contactsApi.delete(id)
    return id
  }
)

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading'
        console.log('Fetch pending')
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        console.log('Fetch fulfilled with:', action.payload)
        state.status = 'succeeded'
        state.items = action.payload.items
        state.total = action.payload.total
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        console.log('Fetch rejected:', action.error)
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch contacts'
        toast.error(`Error loading contacts: ${state.error}`)
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload)
        toast.success('Contact added successfully')
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to add contact'
        toast.error(`Error adding contact: ${state.error}`)
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex((contact) => contact.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
          toast.success('Contact updated successfully')
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to update contact'
        toast.error(`Error updating contact: ${state.error}`)
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload)
        toast.success('Contact deleted successfully')
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to delete contact'
        toast.error(`Error deleting contact: ${state.error}`)
      })
  },
})

export const { setSelectedContact } = contactsSlice.actions
export default contactsSlice.reducer 