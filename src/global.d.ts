
interface Invoice {
    client: Client
    createAt?: string
    discount?: number
    dueDate: string
    id: string
    invoiceNumber: string
    invoiceStatus: InvoiceStatus
    issueDate: string
    lineItems?: LineItem[]
    notes?: string
    subject?: string
    terms?: string
}

interface Client {
    city?: string
    clientStatus?: ClientStatus
    email: string
    id: string
    name: string
    state?: string
    street?: string
    zip?: string
}

interface LineItem {
    amount: number
    description: string
    id: string
    quantity: number
}

type NotificationType = "success" | "error" | "info" | "warning";

interface Snackbar {
    id: string
    message: string
    type: NotificationType
}

