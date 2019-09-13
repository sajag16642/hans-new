import { Injectable } from '@angular/core';
declare var Razorpay: any; 
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() { }
  payNowT(amt,type) {
    var notes = {service:''};
    var keyId;
    if(amt==5100)
    {
      notes.service="Limited";
    }else 
    if(amt==7100){
      notes.service="Supreme";
    }else 
    if(amt==11000){
      notes.service="Premium";
    }
    if(type == 'test')
    {
      keyId="rzp_test_kmaBmqJE4QobLi";
    }else
    if(type=='live'){
      keyId="rzp_live_e6JpOKoIUEouZT";
    }
    const key = keyId;

    var options = {
      "key": key,
      "amount":amt*100,
      "name": " Hans Matrimony",
      "description": "Order #",
     
      "handler": function (response){
          console.log(response);
          alert(response.razorpay_payment_id);
         },
      "prefill": {
          "name":  'test',
          "email": 'test@xyz.com',
          "contact": '1234567890',
     
      },
      "notes": notes,
      "theme": {
          "color": "blue"
      }
  };
  return(new Razorpay(options));
} 
}
