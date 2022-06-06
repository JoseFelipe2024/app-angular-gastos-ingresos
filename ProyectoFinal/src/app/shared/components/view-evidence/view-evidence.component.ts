import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-evidence',
  templateUrl: './view-evidence.component.html',
  styleUrls: ['./view-evidence.component.css']
})
export class ViewEvidenceComponent implements OnInit {
  typeFile!: string;
  base64!: string;
  
  constructor( public dialogRef: MatDialogRef<ViewEvidenceComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private _sanitizer: DomSanitizer) { 
      this.typeFile = this.data.typeFile;
      this.base64 = this.data.base64;

     
    }

  ngOnInit(): void {
    if(this.typeFile.includes('pdf')){
      let divpdf = document.getElementById('pdf');
      if(divpdf){
        divpdf!.style.display = 'block';
        divpdf.innerHTML = `<iframe src="${this.getPdf()}" width="700px" height="600px"></iframe>`
      }
    }
    
  }

  close(){
    this.dialogRef.close();
  }

  getImage(){
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.base64);
  }

  getPdf(){
    return (this._sanitizer.bypassSecurityTrustResourceUrl(this.base64) as any).changingThisBreaksApplicationSecurity;
  }

}