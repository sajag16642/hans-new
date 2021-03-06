import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubscriptionService } from '../subscription.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { SubscriptionDialogComponent } from './subscription-dialog/subscription-dialog.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  plans: any = [];
  show1 : boolean = true;
  show2 : boolean = false;
  points: any;
  registrationFees: any;
  innerWidth: any;
  dialogData: any;
  formData: any;
  price: any;
  

  // tslint:disable-next-line: max-line-length
  constructor(private http : HttpClient, private subscriptionService : SubscriptionService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    
    this.http.get('https://partner.hansmatrimony.com/api/subscription', {headers : headers}).subscribe((res:any) => {
      this.plans = res;
      console.log(this.plans);
    })

    if (localStorage.getItem('id')) {
      this.getCredits();
    }
  }

  togglePersonalized() {
    if (this.show1 === true) {
      this.show1 = false;
      return this.show2 = true;
    }
  }
  toggleOnline() {
    if (this.show2 === true) {
      this.show2 = false;
      return this.show1 = true;
    }
  }

  getCredits() {
    // tslint:disable-next-line: max-line-length
    return this.http.post('https://partner.hansmatrimony.com/api/getWhatsappPoint?id='+localStorage.getItem('id'),{params:{['id']: localStorage.getItem('id')}}).subscribe(
      (data: any) => {
         this.points = data.whatsapp_points;
         console.log(this.points);
      },
     (error: any) => {
       console.log(error);
     }
    );
   }

   getRazorPay(amt: any, type: any,plan: any,name: any, email: any, phone: any) {
     // plan = 0 for online plans and plan = 1 for personalized plans
     if (plan === 0) {
      return this.subscriptionService.payNowT(amt, type, 0,name,email,phone);
     } else {
          // tslint:disable-next-line: no-unused-expression
          return this.subscriptionService.payNowT(amt, type, 1,name,email,phone);
     }
   }

   changeButtonOnline() {
     if (this.show2 === true) {
       return 'buttonPersonalised';
     } else {return 'buttonOnline'; }
   }
   changeButtonPersonalized() {
    if (this.show2 === true) {
      return 'buttonOnline';
    } else {return 'buttonPersonalised'; }
   }

   @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
  console.log(this.innerWidth);
}

   openDialog(plan: String, benefits: String, value: String , price: String) {
    const dialogConfig = new MatDialogConfig();
    if (this.innerWidth >= 1024) {
      dialogConfig.minWidth = this.innerWidth - 200;
      dialogConfig.minHeight = 600;
    } else {
    dialogConfig.minWidth = this.innerWidth - 50;
    }
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
      dialogConfig.data = {
        plan: plan,
        benefit: benefits,
        value: value,
        price: price
      };
      let dialogRef = this.matDialog.open(SubscriptionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {console.log(data);
        this.dialogData = data;
        this.formData = this.dialogData.formData;
        this.price = this.dialogData.price;
        this.getRazorPay(this.price,'live',0,this.formData.name,this.formData.email,this.formData.mobile)
      }
  );
  }

}

