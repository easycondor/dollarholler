//

import { getInvoiceById } from "$lib/stores/InvoiceStore";

interface Props {
    params : {
        id: string
    }
}


export function load( {params} ):Props{
    //params.id = url pass dynamic [id] folder
    const id = params?.id;
    //
    const invoice = getInvoiceById(id);
    // console.log({invoice});
    
    return {invoice};
}