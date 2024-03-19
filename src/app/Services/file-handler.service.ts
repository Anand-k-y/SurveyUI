import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

declare var cordova: any; // Declare cordova object

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {

  ExportToXLS(filename: string, json: any) {
    // Implement your XLS export logic here if needed
  }

  ExportToCsv(filename: string, json: any[]) {
    const fields = Object.keys(json[0]);
    const replacer = (key: any, value: any) => value === null ? '' : value;
    const csv = json.map((row) =>
      fields.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(',')
    );
    csv.unshift(fields.join(',')); // add header column
    const csvString = csv.join('\r\n');
  
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
}
