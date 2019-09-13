import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  plans: any = [];
  show1 : boolean = true;
  show2 : boolean = false;

  constructor(private http : HttpClient) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    
    this.http.get('https://partner.hansmatrimony.com/api/subscription', {headers : headers}).subscribe((res:any) => {
      this.plans = res;
      console.log(this.plans);
    })
  }

  toggle(){
    if(!this.show1)
     return this.show1 != this.show1;

    if(!this.show2) 
     return this.show1 != this.show1;
  }
  

}

