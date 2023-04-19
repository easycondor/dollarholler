import { writable } from "svelte/store";
import data from "../../seed.json"

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
   invoices.set(data.invoices)
   // invoices.set([])
}

export const deleteInvoice = (invoiceToDelete: Invoice) => {
   invoices.update((prev: Invoice[]) => {
      //filter only return if conditon is true (on garde uniquement les él. qui n'ont pas meme id que l'él à éliminer)
     const newList = prev.filter((cur: Invoice) => cur.id !== invoiceToDelete.id);
     return newList;
   })
}

export const addInvoice = (invoiceToAdd: Invoice) => {
   //Create an Array ici prev / clone le tableau store / fusionne le nouvel arrary invoiceToAdd
   invoices.update((prev: Invoice[]) =>[...prev, invoiceToAdd])
   return invoiceToAdd;
}

export const updateInvoice =  (invoiceToUpdate: Invoice) => {
   //map crée un nouveau tableau avec les résultat de l'appel à la fonction const double = array.map(x=> x*2)
   // ? return this : or this
   //if cur.id = to invoiceToUpdate.id return invoiceToUpdate(invoice change) Sinon retrun Invoice inchangé
   invoices.update((prev: Invoice[]) => prev.map((cur: Invoice) => cur.id === invoiceToUpdate.id ? invoiceToUpdate : cur));
   return invoiceToUpdate;
}

