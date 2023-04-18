import { writable } from "svelte/store";
import data from "../../seed.json"

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
   invoices.set(data.invoices)
   // invoices.set([])
}

export const deleteInvoice = (invoiceToDelete: Invoice) => {
   invoices.update((prev: Invoice[]) => {
      //filter only return if conditon is true
     const newList = prev.filter((cur: Invoice) => cur.id !== invoiceToDelete.id);
     return newList;
   })
}

export const addInvoice = (invoiceToAdd: Invoice) => {
   //Create an Array ici prev / clone le tableau store / fusionne le nouvel arrary invoiceToAdd
   invoices.update((prev: Invoice[]) =>[...prev, invoiceToAdd])
   return invoiceToAdd;
}

