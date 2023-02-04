import { formatDate } from "@angular/common";

export const  getFormatDate = (date: any) => {
    if (!date) return '';
    return formatDate(date, 'MM-yyyy-dd', 'en-US');
  }