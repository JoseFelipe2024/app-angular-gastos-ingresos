import { formatDate } from "@angular/common";

export const  getFormatDate = (date: any) => {
    if(!date) return '';
    const dateFormated = formatDate(date, 'dd-MM-yyyy', 'en-US');
    const listDate = dateFormated.split('-').map(d => +d);
    const day = listDate[0];
    const month = listDate[1];
    const year = listDate[2];
    return new Date(year, month, day);
  }