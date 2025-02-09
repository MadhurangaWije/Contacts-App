import { render, screen, fireEvent } from '@testing-library/react'
import ContactTable from '../ContactTable'
import { Contact } from '@/app/types'

// Add these mocks at the top
jest.mock('lucide-react', () => ({
  ChevronDown: () => <span>ChevronDown</span>,
  ChevronUp: () => <span>ChevronUp</span>,
  Edit: () => <span>Edit</span>,
  Trash2: () => <span>Trash2</span>,
}))

// Mock the UI components
jest.mock('@/components/ui/table', () => ({
  Table: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TableBody: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TableCell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TableHead: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TableHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TableRow: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => 
    <button onClick={onClick}>{children}</button>,
}))

describe('ContactTable', () => {
  const mockContacts: Contact[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      mobileNumber: '+1234567890',
      homeNumber: '+1987654321',
      address: '123 Main St',
      recordModifiedAt: '2024-03-20T10:00:00Z'
    }
  ]

  const mockProps = {
    contacts: mockContacts,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    currentPage: 1,
    onPageChange: jest.fn(),
    total: 20,
    rowsPerPage: 10
  }

  it('renders contact table with data', () => {
    render(<ContactTable {...mockProps} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    render(<ContactTable {...mockProps} />)
    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)
    expect(mockProps.onEdit).toHaveBeenCalledWith(mockContacts[0])
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<ContactTable {...mockProps} />)
    const deleteButton = screen.getByRole('button', { name: /trash2/i })
    fireEvent.click(deleteButton)
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockContacts[0].id)
  })

  it('handles pagination correctly', () => {
    render(<ContactTable {...mockProps} />)
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    expect(mockProps.onPageChange).toHaveBeenCalledWith(2)
  })
}) 