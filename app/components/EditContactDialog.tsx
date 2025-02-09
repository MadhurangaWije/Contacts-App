"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Contact } from "@/app/types"

interface EditContactDialogProps {
  contact: Contact | null
  isOpen: boolean
  onClose: () => void
  onEdit: (contact: Contact) => void
}

export default function EditContactDialog({ contact, isOpen, onClose, onEdit }: EditContactDialogProps) {
  const [editedContact, setEditedContact] = useState<Contact | null>(contact)

  useEffect(() => {
    setEditedContact(contact)
  }, [contact])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedContact((prev) => prev ? ({ ...prev, [name]: value }) : null)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editedContact) {
      onEdit(editedContact)
      onClose()
    }
  }

  if (!editedContact) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={editedContact.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                value={editedContact.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mobileNumber" className="text-right">Mobile</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                value={editedContact.mobileNumber}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="homeNumber" className="text-right">Home</Label>
              <Input
                id="homeNumber"
                name="homeNumber"
                value={editedContact.homeNumber}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">Address</Label>
              <Input
                id="address"
                name="address"
                value={editedContact.address}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 