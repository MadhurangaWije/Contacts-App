"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Contact } from "@/app/types"

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPhoneNumber = (number: string) => {
  const phoneRegex = /^\+?[0-9]{10,}$/
  return phoneRegex.test(number)
}

interface AddContactDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (contact: Omit<Contact, "id" | "recordModifiedAt">) => void
}

export default function AddContactDialog({ isOpen, onClose, onAdd }: AddContactDialogProps) {
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    homeNumber: "",
    address: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    homeNumber: "",
    address: "",
  })
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {
        name: "",
        email: "",
        mobileNumber: "",
        homeNumber: "",
        address: "",
      }

      if (newContact.name.length < 3) {
        newErrors.name = "Name should be at least 3 characters long"
      }

      if (!isValidEmail(newContact.email)) {
        newErrors.email = "Please enter a valid email address"
      }

      if (!isValidPhoneNumber(newContact.mobileNumber)) {
        newErrors.mobileNumber =
          "Mobile number should be at least 10 digits and contain only numbers and optionally a + sign"
      }

      if (newContact.homeNumber && !isValidPhoneNumber(newContact.homeNumber)) {
        newErrors.homeNumber =
          "Home number should be at least 10 digits and contain only numbers and optionally a + sign"
      }

      if (newContact.address.length < 5) {
        newErrors.address = "Address should be at least 5 characters long"
      }

      setErrors(newErrors)

      const isValid = Object.values(newErrors).every((error) => error === "")
      setIsFormValid(isValid)
    }

    validateForm()
  }, [newContact])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewContact((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid) {
      onAdd(newContact)
      setNewContact({ name: "", email: "", mobileNumber: "", homeNumber: "", address: "" })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  className={errors.name ? "border-red-500" : ""}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newContact.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mobileNumber" className="text-right">
                Mobile Number
              </Label>
              <div className="col-span-3">
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  value={newContact.mobileNumber}
                  onChange={handleInputChange}
                  className={errors.mobileNumber ? "border-red-500" : ""}
                  required
                />
                {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="homeNumber" className="text-right">
                Home Number
              </Label>
              <div className="col-span-3">
                <Input
                  id="homeNumber"
                  name="homeNumber"
                  value={newContact.homeNumber}
                  onChange={handleInputChange}
                  className={errors.homeNumber ? "border-red-500" : ""}
                />
                {errors.homeNumber && <p className="text-red-500 text-sm mt-1">{errors.homeNumber}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <div className="col-span-3">
                <Input
                  id="address"
                  name="address"
                  value={newContact.address}
                  onChange={handleInputChange}
                  className={errors.address ? "border-red-500" : ""}
                  required
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

