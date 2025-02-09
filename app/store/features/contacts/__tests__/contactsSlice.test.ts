import contactsReducer, {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from '../contactsSlice'
import type { Contact, ContactsState } from '@/app/types'

describe('contacts reducer', () => {
  const initialState: ContactsState = {
    items: [],
    status: 'idle' as const,
    error: null,
    selectedContact: null,
    total: 0,
  }

  const mockContact: Contact = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    mobileNumber: '+1234567890',
    homeNumber: '+1987654321',
    address: '123 Main St',
    recordModifiedAt: '2024-03-20T10:00:00Z'
  }

  it('should handle initial state', () => {
    expect(contactsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle fetchContacts.pending', () => {
    const actual = contactsReducer(
      initialState, 
      fetchContacts.pending('', { page: 1, limit: 10 })
    )
    expect(actual.status).toEqual('loading')
  })

  it('should handle fetchContacts.fulfilled', () => {
    const payload = {
      items: [mockContact],
      total: 1,
      page: 1,
      limit: 10
    }
    const actual = contactsReducer(
      initialState,
      fetchContacts.fulfilled(payload, '', { page: 1, limit: 10 })
    )
    expect(actual.status).toEqual('succeeded')
    expect(actual.items).toEqual([mockContact])
    expect(actual.total).toEqual(1)
  })

  it('should handle fetchContacts.rejected', () => {
    const error = new Error('Failed to fetch')
    const actual = contactsReducer(
      initialState,
      fetchContacts.rejected(error, '', { page: 1, limit: 10 })
    )
    expect(actual.status).toEqual('failed')
    expect(actual.error).toEqual('Failed to fetch')
  })

  it('should handle addContact.fulfilled', () => {
    const actual = contactsReducer(
      initialState,
      addContact.fulfilled(mockContact, '', {
        name: mockContact.name,
        email: mockContact.email,
        mobileNumber: mockContact.mobileNumber,
        homeNumber: mockContact.homeNumber,
        address: mockContact.address,
      })
    )
    expect(actual.items).toContainEqual(mockContact)
  })

  it('should handle updateContact.fulfilled', () => {
    const updatedContact = { ...mockContact, name: 'Jane Doe' }
    const state = {
      ...initialState,
      items: [mockContact]
    }
    const actual = contactsReducer(
      state,
      updateContact.fulfilled(updatedContact, '', { 
        id: mockContact.id, 
        contact: { name: 'Jane Doe' } 
      })
    )
    expect(actual.items[0].name).toEqual('Jane Doe')
  })

  it('should handle deleteContact.fulfilled', () => {
    const state = {
      ...initialState,
      items: [mockContact]
    }
    const actual = contactsReducer(
      state,
      deleteContact.fulfilled(mockContact.id, '', mockContact.id)
    )
    expect(actual.items).toHaveLength(0)
  })
}) 