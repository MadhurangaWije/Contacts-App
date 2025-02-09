"use client"

import { useState } from "react"
import type { Contact } from "@/app/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react"
import ExpandedCard from "./ExpandedCard"
import React from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchContacts } from "../store/features/contacts/contactsSlice"

interface ContactTableProps {
  contacts: Contact[]
  onEdit: (contact: Contact) => void
  onDelete: (id: number) => void
  currentPage: number
  onPageChange: (page: number) => void
  total: number
  rowsPerPage: number
}

export default function ContactTable({ 
  contacts, 
  onEdit, 
  onDelete, 
  currentPage,
  onPageChange,
  total,
  rowsPerPage 
}: ContactTableProps) {
  console.log('Raw Contacts Received:', contacts)

  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [sortColumn, setSortColumn] = useState<"name" | "recordModifiedAt">("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const sortedContacts = [...contacts].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  console.log('Sorted Contacts:', sortedContacts)

  const toggleSort = (column: "name" | "recordModifiedAt") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" onClick={() => toggleSort("name")}>
                Name
                {sortColumn === "name" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("recordModifiedAt")}>
                Date Added/Modified
                {sortColumn === "recordModifiedAt" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedContacts.map((contact) => (
            <React.Fragment key={contact.id}>
              <TableRow
                className="cursor-pointer"
                onClick={() => setExpandedRow(expandedRow === contact.id ? null : contact.id)}
              >
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.recordModifiedAt}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(contact)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(contact.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRow === contact.id && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <ExpandedCard contact={contact} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Page {currentPage} of {Math.ceil(total / rowsPerPage)}
        </div>
        <div>
          <Button 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))} 
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => onPageChange(Math.min(Math.ceil(total / rowsPerPage), currentPage + 1))}
            disabled={currentPage === Math.ceil(total / rowsPerPage)}
            className="ml-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

