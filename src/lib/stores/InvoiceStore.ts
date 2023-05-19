import superbase from "$lib/utils/superbase";
import { writable } from "svelte/store";
//import data from "../../seed.json" //seulement avec seed.json not superbase


export const invoices = writable<Invoice[]>([]);

export const loadInvoices = async () => {
   //code from api superbase

const { data, error } = await superbase
.from('invoice')
.select('*, client(id, name), lineItems(*)')

//console.log(data);

if(error) {
   console.error(error);
   return
   
}
   //
   invoices.set(data as Invoice[])
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

export const getInvoiceById = async (id:string) =>{
   //from superbase
   const { data, error } = await superbase
   .from('invoice')
   .select('*, client(id, name), lineItems(*)')
   .eq('id', id)

   if(error){
      console.error(error);
      return
   }

   if(data && data[0]) return data[0] as Invoice;
   console.warn('cannot find invoice id'+id);
   
   //return data.invoices.find(invoice => invoice.id === id)
}

