import { contactsApi } from '../api'
import axios from 'axios'

jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
  return {
    create: () => mockAxiosInstance
  }
})

describe('contactsApi', () => {
  const mockContact = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    mobileNumber: '+1234567890',
    homeNumber: '+1987654321',
    address: '123 Main St',
    recordModifiedAt: '2024-03-20T10:00:00Z'
  }

  const mockAxiosInstance = (axios.create() as any)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch contacts with pagination', async () => {
    const mockResponse = { data: {
      items: [mockContact],
      total: 1,
      page: 1,
      limit: 10
    }}
    mockAxiosInstance.get.mockResolvedValueOnce(mockResponse)

    const result = await contactsApi.getAll(1, 10)
    expect(result.data).toEqual(mockResponse.data)
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/contacts?page=1&limit=10')
  })

  it('should create a new contact', async () => {
    const newContact = {
      name: 'John Doe',
      email: 'john@example.com',
      mobileNumber: '+1234567890',
      homeNumber: '+1987654321',
      address: '123 Main St'
    }
    mockAxiosInstance.post.mockResolvedValueOnce({ data: mockContact })

    const result = await contactsApi.create(newContact)
    expect(result.data).toEqual(mockContact)
    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/contacts', newContact)
  })

  it('should update a contact', async () => {
    const updatedContact = { ...mockContact, name: 'Jane Doe' }
    mockAxiosInstance.put.mockResolvedValueOnce({ data: updatedContact })

    const result = await contactsApi.update(1, { name: 'Jane Doe' })
    expect(result.data).toEqual(updatedContact)
    expect(mockAxiosInstance.put).toHaveBeenCalledWith('/contacts/1', { name: 'Jane Doe' })
  })

  it('should delete a contact', async () => {
    mockAxiosInstance.delete.mockResolvedValueOnce({ data: {} })

    await contactsApi.delete(1)
    expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/contacts/1')
  })
}) 