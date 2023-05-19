import superbase from "$lib/utils/superbase";
import { writable } from "svelte/store";
//import data from '../../seed.json'

export const clients = writable<Client[]>([]);

export const loadClients = async () => {
   //superbase
   const { data, error } = await superbase
   .from('client')
   .select('*, invoice(id, invoiceStatus, lineItems(*))')

if(error){
   console.error(error);
   return;
}
clients.set(data as Client[]);

    //clients.set(data.clients);
}

export const addNewClient = (clientToAdd: Client) => {
    //{...clientToAdd, clientStatus: "active"} => loop all the prop and add par défaut active
    clients.update((prev: Client[]) => [...prev, {...clientToAdd, clientStatus: "active"}]);
    return clientToAdd;
 }

 export const updateClient = (clientToUpdate:Client) => {
    clients.update((prev: Client[]) => prev.map((cur:Client)=>cur.id === clientToUpdate.id ? clientToUpdate : cur));
    return clientToUpdate;
 }

 export const getClientById = async (id: string) => {
//superbase
const { data, error } = await superbase
.from('client')
.select('*, invoice(id, invoiceStatus, invoiceNumber, dueDate, client(id, name), lineItems(*))')
.eq('id', id);

if(error){
   console.error(error);
   return;
}

if(data && data[0]) return data[0] as Client;
    //return data.clients.find((client)=> client.id === id)

    console.warn('we cannot find the client');
    
 }