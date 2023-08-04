import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-toaster',
  templateUrl: './custom-toaster.component.html',
  styleUrls: ['./custom-toaster.component.scss']
})
export class CustomToasterComponent implements OnInit {
 
  constructor( private dialogRef: MatDialogRef<CustomToasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
      this.close();
  }
  close() {
    this.dialogRef.close()
  }


}
