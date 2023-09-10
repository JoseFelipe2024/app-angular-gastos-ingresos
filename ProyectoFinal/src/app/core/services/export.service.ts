import { Injectable } from "@angular/core";
import * as FileSaver from  "file-saver"
import { read, utils, WorkBook, WorkSheet, write, writeFile} from "xlsx"
@Injectable()
export class ExportService {
  readonly EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  readonly EXCEL_EXT = '.xlsx';

  exportToExcelSpecificColumns(json:any[], headers:string[][], fileName:string, customHeaderNames = false){
      const workBook = utils.book_new();
      const workSheet = utils.json_to_sheet([]);
      
      let properties = Object.getOwnPropertyNames(json[0]);
      if(customHeaderNames == true){
          properties = headers[1];
      }
      let resultList = this.mapSelectedProps(json, properties);
      utils.sheet_add_aoa(workSheet, headers);
      utils.sheet_add_json(workSheet, resultList, {origin:'A2', skipHeader:true});
      utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
      writeFile(workBook,`${fileName}-${new Date().getTime()}${this.EXCEL_EXT}`);
  }

  private mapSelectedProps(list:any[], properties?:string[]){
      return list.map(data=> properties?.reduce((o: any,k) => (o[k] = data[k], o),{}));
  }

  importExcel<T>(file: File): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: T[] = utils.sheet_to_json(sheet, { raw: false });
        resolve(jsonData);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

}
