

//IMPORT DATE-FNS FOR HELP
import { isBefore, format } from 'date-fns';

export const today = format(new Date, 'yyyy-MM-dd')
/**
 * THIS TAKES A DATE YYYY-MM-DD AND RETURN M-D-YYYY
 * @PARM {STRING} MYDATE
 * @RETURN {STRING} D-M-YYYY
 */

export const convertDate = (myDate: string): string => {
//split and destrured
   const [year, month, day] = splitDate(myDate)
    return `${parseInt(day)} / ${month} / ${year}`
}

/**
 * DETERMINE SI LA DATE EST AVANT AUJOURD'HUI (LATE)
 * @param myDate {STRING}
 * @returns {BOOLEAN}
 */
export const isLate = (myDate: string): boolean => {
    const [year, month, day] = splitDate(myDate);
    const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
    const today = new Date();
    return isBefore(dueDate, today);
}

/**
 * SPLIT A DATE IN A ARRAY
 * @param {STRING} myDate 
 * @returns  {ARRAY} [YYYY, MM, DD]
 */
export const splitDate = (myDate: string) => {

   return myDate.split('-');
}

