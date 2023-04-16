
interface Invoice {
    client: Client
    createAt: string
    dueDate: string
    invoiceNumber: string
    invoiceStatus: InvoiceStatus
    issueDate: string
    lineItems?: LineItem[]
    notes?: string
    subject?: string
    terms?: string
}

interface Client {
    city: string
    clientStatus?: CllientStatus
    email: string
    id: string
    name: string
    state: string
    street: string
    zip: string
}

interface LineItem {
    amount: string
    description: string
    id: string
    quantity: number
}

