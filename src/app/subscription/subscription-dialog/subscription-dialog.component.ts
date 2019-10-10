import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-subscription-dialog',
  templateUrl: './subscription-dialog.component.html',
  styleUrls: ['./subscription-dialog.component.css']
})
export class SubscriptionDialogComponent implements OnInit {
data: any;
plan: String = '';
benefits: String = '';
value: String = '';
price: String = ''
    constructor(public dialogRef: MatDialogRef<SubscriptionDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit() {
    this.plan = this.data.plan;
    this.benefits = this.data.benefit;
    this.value = this.data.value;
    this.price = this.data.price;
  }

  close() {
    this.dialogRef.close();
  }
}
