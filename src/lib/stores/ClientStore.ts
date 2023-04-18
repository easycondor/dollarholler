import { writable } from "svelte/store";
import data from '../../seed.json'

export const clients = writable<Client[]>([]);

export const loadClients = () => {
    clients.set(data.clients);
}

export const addNewClient = (clientToAdd: Client) => {
    clients.update((prev: Client[]) => [...prev, clientToAdd]);
    return clientToAdd;
 }