import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface WinnerDialogData {
  winnerName: string;
}

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.css']
})
export class WinnerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WinnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WinnerDialogData) { }

  ngOnInit() {
  }

}
