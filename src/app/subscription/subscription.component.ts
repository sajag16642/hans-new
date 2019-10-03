import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubscriptionService } from '../subscription.service';

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
  

  constructor(private http : HttpClient, private subscriptionService : SubscriptionService) { }

  ngOnInit() {

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

   getRazorPay(amt: any, type: any,plan: any) {
     // plan = 0 for online plans and plan = 1 for personalized plans
     if (plan === 0) {
      return this.subscriptionService.payNowT(amt, type, 0);
     } else {
          // tslint:disable-next-line: no-unused-expression
          return this.subscriptionService.payNowT(amt, type, 1);
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
    } else {return 'buttonPersonalised';}
   }

}

