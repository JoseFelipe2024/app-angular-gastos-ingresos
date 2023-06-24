import { formatDate } from "@angular/common";

export const  getFormatDate = (date: any) => {
    if (!date) return '';
    return new Date(formatDate(date, 'yyyy-MM-dd', 'en-US') + 'T00:00:00'); ;
  }