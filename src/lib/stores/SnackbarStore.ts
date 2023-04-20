import { writable } from "svelte/store";
import {v4 as uuidv4} from 'uuid';

const newSnackbar = ()=>{
   const {update, subscribe } = writable<Snackbar[]>([])

   function send(content: {message: string, type: NotificationType}){
   //construit un nouvle object
    const newContent = {id: uuidv4(), ...content}
    //update (oldStort, => allArrayInStore, +newContent )
    update(store => [...store, newContent])
   }

   function remove(id: string | null = null){
update(store => {
    if(id){
        //retourne le store sans item avec meme id passé
        return store.filter(item => item.id !== id)
    }
    //destructuring [firstElement, restofElement]
    const [, ...rest] = store;
    //retourne tous les items sauf le premier
    return [...rest];
})
   }

   return {subscribe, send, remove};
}

export const snackbar = newSnackbar();

