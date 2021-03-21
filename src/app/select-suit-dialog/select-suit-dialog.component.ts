import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-suit-dialog',
  templateUrl: './select-suit-dialog.component.html',
  styleUrls: ['./select-suit-dialog.component.css']
})
export class SelectSuitDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectSuitDialogComponent>) { }

  ngOnInit() {
  }

  onSuitClick(suit: string): void {
    this.dialogRef.close(suit);
  }
}
