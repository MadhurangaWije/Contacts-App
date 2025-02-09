"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { fetchContacts, addContact, updateContact, deleteContact } from "./store/features/contacts/contactsSlice"
import ContactTable from "./components/ContactTable"
import AddContactDialog from "./components/AddContactDialog"
import EditContactDialog from "./components/EditContactDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"
import type { Contact } from "./types"

export default function ContactsApp() {
  const dispatch = useAppDispatch()
  const { items: contacts, status, error, total } = useAppSelector((state) => {
    console.log('API Response Structure:', {
      items: state.contacts.items,
      total: state.contacts.total,
      status: state.contacts.status
    })
    return state.contacts
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  useEffect(() => {
    dispatch(fetchContacts({ page: currentPage, limit: rowsPerPage }))
  }, [currentPage, dispatch])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAddContact = async (newContact: Omit<Contact, "id" | "recordModifiedAt">) => {
    try {
      await dispatch(addContact(newContact)).unwrap()
      setIsAddDialogOpen(false)
    } catch (err) {
      console.error('Failed to add contact:', err)
    }
  }

  const handleEditContact = async (editedContact: Contact) => {
    console.log("edit clicked")
    try {
      await dispatch(updateContact({ 
        id: editedContact.id, 
        contact: editedContact 
      })).unwrap()
      setEditingContact(null)
    } catch (err) {
      console.error('Failed to update contact:', err)
    }
  }

  const handleDeleteContact = async (id: number) => {
    try {
      await dispatch(deleteContact(id)).unwrap()
    } catch (err) {
      console.error('Failed to delete contact:', err)
    }
  }

  if (status === 'loading' && !contacts?.length) {
    return <div className="container mx-auto p-4">Loading contacts...</div>
  }

  if (status === 'failed') {
    return <div className="container mx-auto p-4">Error: {error}</div>
  }

  const filteredContacts = contacts?.filter(
    (contact: any) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  ) || []

  console.log('Filtered Contacts:', filteredContacts)

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>
      {status !== 'loading' && (
        <ContactTable 
          contacts={filteredContacts} 
          onEdit={setEditingContact}
          onDelete={handleDeleteContact}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          total={total || 0}
          rowsPerPage={rowsPerPage}
        />
      )}
      <AddContactDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAdd={handleAddContact} />
      <EditContactDialog 
        contact={editingContact}
        isOpen={!!editingContact}
        onClose={() => setEditingContact(null)}
        onEdit={handleEditContact}
      />
    </div>
  )
}

