import type { Contact } from "@/app/types"
import { Card, CardContent } from "@/components/ui/card"

interface ExpandedCardProps {
  contact: Contact
}

export default function ExpandedCard({ contact }: ExpandedCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <p>
          <strong>Email:</strong> {contact.email}
        </p>
        <p>
          <strong>Mobile Number:</strong> {contact.mobileNumber}
        </p>
        <p>
          <strong>Home Number:</strong> {contact.homeNumber}
        </p>
        <p>
          <strong>Address:</strong> {contact.address}
        </p>
      </CardContent>
    </Card>
  )
}

