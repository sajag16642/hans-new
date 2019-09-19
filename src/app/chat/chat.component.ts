import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Observable } from 'rxjs';

declare let BotUI: Function;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  user_profile: any = [];
  answer: FormGroup;
  show1: boolean = true;
  sent: any = [];
  profile:  any;
  messageRecieved:  string;
  personal: any;
  button: String;
  Data: any;
  given: String;
  Data1: any;
  response_arr: any = [];
  show_arr: any = [];
  type_arr: any = [];
  previous_chats: any;
  user: any;
  DoNotshowfull: boolean ;
  number: String;
  text: String;
  currentUrl: string;
  botui: any;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public userObj: UserService
  ) {
    this.answer = this._formBuilder.group({
      'ans': [''],
    });
  }

  ngOnInit() {
    this.currentUrl = this.router.url.substring(13);
    console.log(this.currentUrl);
    this.botui =  BotUI('my-botui-app');
    if (localStorage.getItem('mobile_number')) {
      this.botui.message.add({
        content: 'Click show to starting seeing some profiles'
      }).then(() => {
        this.botui.action.button({
          action: [{
            text: 'SHOW',
            value: 'SHOW'
          }]
        }).then(res => {
            this.repeatMEssage(res.value, localStorage.getItem('number'));
      });
    });
    } else if (this.currentUrl) {
      this.checkUrl(this.currentUrl).subscribe(
        (data: any) => {
          let text: String = data.apiwha_autoreply;
          console.log(text);
          if (text.match('Show')) {
            this.botui.message.add({
              type: 'html',
              content: '<h6>'+text+'</h6>'
            }).then(() => {
                this.botui.action.button({
                  action: [{
                    text: 'SHOW',
                    value: 'SHOW'
                  }]
                }).then(res => {
                  this.repeatMEssage(res.value, this.currentUrl);
                });
          });
        } else {
                this.botui.action.text({
                  action: {
                    sub_type: 'number',
                    placeholder: 'कृपया अपना १० अंको का मोबाइल नंबर डालें'
                  }
                }).then(res => {
                  this.repeatMEssage('SHOW', res.value);
                });
              }
        },
        (error: any) => {
          console.log(error);
    });
  } else {
    this.botui.message.add({
      type: 'html',
      content: '<h6>कृपया अपना १० अंको का मोबाइल नंबर डालें</h6>'
    }).then(() => {
    this.botui.action.text({
      action: {
        sub_type: 'number',
        placeholder: 'Enter your mobile number'
      }
    }).then(res => {
      this.numberValidation(res.value);
    });
  });
  }
    const data = new FormData();
    data.append('identity_number', localStorage.getItem('identity_number'));;

    this.http.post('https://partner.hansmatrimony.com/api/getProfile', data ).subscribe((res : any) =>{
      this.user = res;
      //console.log('mobile number = ',this.user.family.mobile);
      //localStorage.setItem('mobile_number','91'+this.user.family.mobile);
      console.log(localStorage.getItem('mobile_number'));

    })

    this.http.get('https://partner.hansmatrimony.com/api/getMessages?from='+localStorage.getItem('mobile_number')).subscribe((res : any) => {
      this.previous_chats = res;
      let l = this.previous_chats.length;
      for(let i=0;i<l;i++){
          if(this.previous_chats[i].type === 'IN'){
            this.show_arr.push({'side':1,'data':this.previous_chats[i].message,'sent':1,'message':0,'profile':0});
          }

          else if(this.previous_chats[i].type === 'OUT'){
              if(JSON.parse(this.previous_chats[i].message).type === 'message'){
                this.show_arr.push({'side':1,'data':JSON.parse(this.previous_chats[i].message).apiwha_autoreply,'sent':0,'message':1,'profile':0});
              }
              else{
                this.show_arr.push({'side':1,'data':JSON.parse(this.previous_chats[i].message).apiwha_autoreply,'sent':0,'message':0,'profile':1});
              }
            }

      }
      var div = (<HTMLInputElement>document.getElementById('body'));
      // div.scrollIntoView(false);
      console.log(div.clientHeight)
      console.log(div.scrollHeight);
      console.log(div.offsetHeight);
  })
      console.log(this.show_arr);
      this.DoNotshowfull = true;

  }

  knowMore() {
    this.DoNotshowfull = false;
   }

   read(data) {
     (<HTMLInputElement>document.getElementById('text')).value = '';
     this.show_arr.push({'side':1,'data':this.answer.value.ans,'sent':1,'message':0,'profile':0})
     // this.chatRequest(data);
   }

   sendresponse(data){
     this.show_arr.push({'side':1,'data':data,'sent':1,'message':0,'profile':0})
     // this.chatRequest(data);
   }

   showProfile(value) {
         // const Data = new FormData();
         // Data.append('identity_number' , localStorage.getItem('identity_number'));
         // this.sent = false;
         // this.profile = true;

         // this.http.post('https://partner.hansmatrimony.com/api/getRecommendedProfiles' , Data).subscribe((res : any) => {
         //   this.user_profile = res;
         //   console.log(res);
         // })

         this.show_arr.push({'side':1,'data':value,'sent':1,'message':0,'profile':0}) ;
         // this.chatRequest(value);
   }

   chatRequest(data, mobile): Observable<any> {
       this.Data = {
         from : mobile,
          to : mobile,
          event : "INBOX",
          text : data,
          channel_name : 'app'
       }

     var myJSON = JSON.stringify(this.Data);
     console.log(myJSON);

     const data1 = new FormData();
     data1.append('data', myJSON);

     return this.http.post<any>(' https://matchmakerz.in/api/v1/sendMessages' , data1 );
   }
   revertResponse(mobile) {
     this.Data1 = {
       to : mobile,
       event : "MESSAGEPROCESSED",
     }
 
     var myJSON2 = JSON.stringify(this.Data1);
     console.log(myJSON2);
 
     const data2 = new FormData();
     data2.append('data', myJSON2);
 
     this.http.post(' https://matchmakerz.in/api/v1/sendMessages' , data2 ).subscribe((data) => {
       console.log(data);
     })
   }
   checkUrl(num: string): Observable<any> {
       return this.http.get<any>(' https://matchmakerz.in/api/v1/auth', {params: { ['phone_number'] : num}});
   }

   repeatMEssage(ans: String, mob) {
         this.chatRequest(ans, mob).subscribe(
           (data: any) => {
             console.log(data);
             if (data.type === 'profile') {
                 let values = data.apiwha_autoreply;
                 console.log(values.profile_photo);
                 this.botui.message.add({
                   type: 'html',
                   content: '<img src='+this.getProfilePhoto(values.profile_photo, values.gender)+'>'
                 }).then(() => {
                   if (values.language === 'English') {
                     this.botui.message.add({
                       type: 'html',
                       // tslint:disable-next-line: max-line-length
                       content:'<b> &#128100 Personal Details</b> <br> <br>' +
                       'Name: ' +values.name +'<br>'+
                       'Age: ' +values.age+ '<br>'+
                       'Height: '+this.getHeight(values.height) +' <br>'+
                       'Weight: '+ values.weight+' <br>'+
                       'Religion: '+values.religion+' <br>'+
                       'Caste: '+values.caste+' <br>'+
                       'Food Choice: '+this.getFoodChoiceString(values.food_choice)+' <br>'+
                       'Locality: '+values.current_city+' <br>'+
                       'Marital Status: '+this.getMaritalStatusString(values.marital_status)+' <br>'+
                       'Disability: '+this.getMaritalStatusString(values.disability) +' <br> <br>'
                        +
                       '<b> &#9803 Horoscope Details</b> <br><br>' +
                       'Birth Date: '+values.birth_date+' <br>'+
                       'Birth Time: '+values.birth_time+' <br>'+
                       'Bith Place: '+values.birth_place+' <br>'+
                       'Manglik: '+this.getManglikString(values.manglik)+' <br> <br>'
                       +
                       '<b> &#128218 Education Details</b> <br><br>' +
                       'Education: '+values.education+' <br>'+
                       'Degree: '+values.degree+' <br>'+
                       'College: '+values.college+' <br><br>'
                       +
                       '<b> &#128188 Work Details</b> <br><br>' +
                       'Occupation: '+this.getOccupationString(values.occupation)+'<br>'+
                       'Annual Income: '+values.yearly_income+' LPA<br>'+
                       'Profession: '+this.getSubOccupation(values.sub_occupation)+' <br>'+
                       'Working City: '+this.getHomeTown(values.office_address)+' <br><br>'
                       +
                       '<b> &#128106 Family Details</b> <br><br>' +
                       'Family Type: '+this.getFamilyTypeString(values.family_type)+' <br>'+
                       'House Type: '+this.getHouseTypeString(values.house_type)+' <br>'+
                       'Mother Status: '+this.getLifeStatusString(values.mother_status)+' <br>'+
                       'Father Status: '+this.getLifeStatusString(values.father_status)+' <br>'+
                       'Mothers Occupation: '+this.getOccupationString(values.mother_occupation)+' <br>'+
                       'Fathers Occupation: '+this.getOccupationString(values.mother_occupation)+' <br>'+
                       'Family Income: '+values.family_income+' LPA <br>'+
                       'Married Brothers: '+this.getSiblingCount(values.married_son)+' <br>'+
                       'Married Sisters: '+this.getSiblingCount(values.married_daughter)+' <br>'+
                       'Unmarried Brothers: '+this.getSiblingCount(values.unmarried_son)+' <br>'+
                       'UnMarried Sisters: '+this.getSiblingCount(values.unmarried_daughter)+' <br>'+
                       'Home Town: '+this.getHomeTown(values.hometown)+' <br>'
                   }).then(() => {
                       if (data.buttons.match('Yes' || 'No')) {
                         return this.botui.action.button({
                           cssClass: 'styleButton',
                           action: [
                             { text: 'YES', value: 'YES'},
                             {text: 'NO', value: 'NO' }
                           ]
                       }).then(res => {
                         this.answer = res.value;
                         console.log('chose' + res.value);
                         this.repeatMEssage(res.value, mob);
                       });
                       } else if (data.buttons.match('Show')) {
                         return this.botui.action.button({
                           action: [
                             { text: 'SHOW', value: 'SHOW'},
                           ]
                       }).then(res => {
                         console.log('chose' + res.value);
                         this.answer = res.value;
                         this.repeatMEssage(res.value, mob);
                       });
                       }
                   });
                   } else {
                     this.botui.message.add({
                       type: 'html',
                       // tslint:disable-next-line: max-line-length
                       content:'<b> &#128100 पर्सनल डिटेल्स</b> <br> <br>' +
                       'नाम: ' +values.name +'<br>'+
                       'उम्र: ' +values.age+ '<br>'+
                       'कद: '+this.getHeight(values.height) +' <br>'+
                       'वजन: '+ values.weight+' <br>'+
                       'धर्म: '+values.religion+' <br>'+
                       'जाती: '+values.caste+' <br>'+
                       'खान-पान: '+this.getFoodChoiceString(values.food_choice)+' <br>'+
                       'पता: '+values.current_city+' <br>'+
                       'वैवाहिक स्तिथि: '+this.getMaritalStatusString(values.marital_status)+' <br>'+
                       'विकलांगता: '+this.getMaritalStatusString(values.disability) +' <br> <br>'
                        +
                       '<b> &#9803 होरोस्कोप डिटेल्स</b> <br><br>' +
                       'जन्म दिवस: '+values.birth_date+' <br>'+
                       'जन्म का समय: '+values.birth_time+' <br>'+
                       'जन्म स्थान: '+values.birth_place+' <br>'+
                       'मांगलिक: '+this.getManglikString(values.manglik)+' <br> <br>'
                       +
                       '<b> &#128218 एजुकेशन डिटेल्स</b> <br><br>' +
                       'शिक्षा: '+values.education+' <br>'+
                       'डिग्री: '+values.degree+' <br>'+
                       'कॉलेज: '+values.college+' <br><br>'
                       +
                       '<b> &#128188 वर्क डिटेल्स</b> <br><br>' +
                       'व्यसाय: '+this.getOccupationString(values.occupation)+'<br>'+
                       'वार्षिक आय: '+values.yearly_income+' LPA<br>'+
                       'पेशा: '+this.getSubOccupation(values.sub_occupation)+' <br>'+
                       'कार्य स्थान: '+this.getHomeTown(values.office_address)+' <br><br>'
                       +
                       '<b> &#128106 फॅमिली डिटेल्स</b> <br><br>' +
                       'परिवार: '+this.getFamilyTypeString(values.family_type)+' <br>'+
                       'घर: '+this.getHouseTypeString(values.house_type)+' <br>'+
                       'मदर स्टेटस: '+this.getLifeStatusString(values.mother_status)+' <br>'+
                       'फादर स्टेटस: '+this.getLifeStatusString(values.father_status)+' <br>'+
                       'माता का व्यसाय: '+this.getOccupationString(values.mother_occupation)+' <br>'+
                       'पिता का व्यसाय : '+this.getOccupationString(values.mother_occupation)+' <br>'+
                       'पारिवारिक आय: '+values.family_income+' LPA <br>'+
                       'मैरिड भाई: '+this.getSiblingCount(values.married_son)+' <br>'+
                       'मैरिड बेहेने : '+this.getSiblingCount(values.married_daughter)+' <br>'+
                       'अव्यावाहित भाई: '+this.getSiblingCount(values.unmarried_son)+' <br>'+
                       'अव्यावाहित बेहेने : '+this.getSiblingCount(values.unmarried_daughter)+' <br>'+
                       'होम टाउन: '+this.getHomeTown(values.hometown)+' <br>'
                   }).then(() => {
                       if (data.buttons.match('Yes' || 'No')) {
                         return this.botui.action.button({
                           cssClass: 'styleButton',
                           action: [
                             { text: 'YES', value: 'YES'},
                             {text: 'NO', value: 'NO' }
                           ]
                       }).then(res => {
                         this.answer = res.value;
                         console.log('chose' + res.value);
                         this.repeatMEssage(res.value, mob);
                       });
                       } else if (data.buttons.match('Show')) {
                         return this.botui.action.button({
                           action: [
                             { text: 'SHOW', value: 'SHOW'},
                           ]
                       }).then(res => {
                         console.log('chose' + res.value);
                         this.answer = res.value;
                         this.repeatMEssage(res.value, mob);
                       });
                       }
                   });
                   }
                 });
             } else {
             this.botui.message.add({
                type: 'html',
                 content: '<h6>'+data.apiwha_autoreply+'</h6>'
             }).then(() => {
                 if (data.buttons.match('Yes' || 'No')) {
                   return this.botui.action.button({
                     cssClass: 'styleButton',
                     action: [
                       { text: 'YES', value: 'YES'},
                       {text: 'NO', value: 'NO' }
                     ]
                 }).then(res => {
                   console.log('chose' + res.value);
                   this.answer = res.value;
                   this.repeatMEssage(res.value, mob);
                 });
                 }  else if (data.buttons.match('Register')) {
                   this.botui.action.button({
                     action: [{
                       text: 'REGISTER',
                       value: 'REGISTER'
                     }]
                   }).then(() => {
                     this.router.navigateByUrl('register');
                   });
                 } else {
                  return this.botui.action.button({
                    action: [
                      { text: 'SHOW', value: 'SHOW'},
                    ]
                }).then(res => {
                  console.log('chose' + res.value);
                  this.answer = res.value;
                  this.repeatMEssage(res.value, mob);
                });
                }
             });
           }
           },
           (error: any) => {
             console.log(error);
           }
         );
 }
 getFoodChoiceString(num: Number): String {
 if (num === 0) {
 return 'Vegetarian';
 } else {
 return 'Non Vegetarian';
 }
 }
 getMaritalStatusString(num: Number): String {
 switch (num) {
 case 0:
 return 'Never Married';
 case 1:
 return 'Divorced';
 case 2:
 return 'Widowed';
 default:
 return 'N/A';
 }
 }
 getDisabilityString(num: Number): String {
 switch (num) {
 case 0:
 return 'No';
 case 1:
 return 'Yes';
 default:
 return 'NONE';
 }
 }
 
 getManglikString(num: Number): String {
 switch (num) {
 case 0:
 return 'Non Manglik';
 case 1:
 return 'Manglik';
 case 2:
 return 'Anshik Manglik';
 default:
 return 'N/A';
 }
 }
 getOccupationString(num: Number): String {
 switch (num) {
 case 0:
 return 'Not Working';
 case 1:
 return 'Private Job';
 case 2:
 return 'Self Employed';
 case 3:
 return 'Government Job';
 case 4:
 return 'Doctor';
 case 5:
 return 'Teacher';
 default:
 return 'N/A';
 }
 }
 getFamilyTypeString(num: Number): String {
 switch (num) {
 case 0:
 return 'Nuclear';
 case 1:
 return 'Joint Family';
 default:
 return 'N/A';
 }
 }
 
 getHouseTypeString(num: Number): String {
 switch (num) {
 case 0:
 return 'Owned';
 case 1:
 return 'Rented';
 default:
 return 'N/A';
 }
 }
 getLifeStatusString(num: Number): String {
 switch (num) {
 case 0:
 return 'Alive';
 case 1:
 return 'Dead';
 default:
 return 'N/A';
 }
 }
 
 getProfilePhoto(num: String, gen: number): String {
 if (num === null) {
   if (gen === 0) {
     return '../../assets/male_pic.png';
   } else {
     return '../../assets/female_pic.png';
   }
 } else {
 return num;
 }
 }

 getSiblingCount(num: Number): Number {
 if (num === null) {
 return 0;
 } else {
 return num;
 }
 }
 
 getHomeTown(num: String): String {
 if (num === null) {
 return 'N/A';
 } else {
 return num;
 }
 }
 getSubOccupation(num: String): String {
 if (num === null) {
 return 'N/A';
 } else {
 return num;
 }
 }
 getHeight(num:Number){
   switch (num) {
    case 53: return "4\'5\""
    case 54: return "4\'6\""
    case 55: return "4\'7\""
    case 56: return "4\'8\""
    case 57: return "4\'9\""
    case 58: return "4\'10\""
    case 59: return "4\'11\""
    case 60: return "5\'"
    case 61: return "5\'1\""
    case 62: return "5\'2\""
    case 63: return "5\'3\""
    case 64: return "5\'4\""
    case 65: return "5\'5\""
    case 66: return "5\'6\""
    case 67: return "5\'7\""
    case 68: return "5\'8\""
    case 69: return "5\'9\""
    case 70: return "5\'10\""
    case 71: return "5\'11\""
    case 72: return "6\'"
    case 73: return "6\'1\""
    case 74: return "6\'2\""
    case 75: return "6\'3\""
     case 76: return "6\'4\""
     case 77: return "6\'5\""
     case 78: return "6\'6\""
     case 79: return "6\'7\""
     case 80: return "6\'8\""
     case 81: return "6\'9\""
     case 82: return "6\'10\""
     case 83: return "6\'11\""
     case 84: return "7\'"
     default: return 'N/A'
 }
 }
 numberValidation(num: string) {
  if (num.length === 10 && num.match('(0/91)?[6-9][0-9]{9}')) {
    this.repeatMEssage('SHOW', num);
  } else {
    this.botui.message.add({
      content: 'कृपया अपना १० अंको का मोबाइल नंबर डालें'
    }).then(() => {
    this.botui.action.text({
      action: {
        sub_type: 'number',
        placeholder: 'Enter your mobile number'
      }
    }).then(res => {
      this.numberValidation(res.value);
    });
  });
  }
 }
 changeLanguage(phon:string,lang:string):Observable<any> {
  return this.http.get<any>(' https://matchmakerz.in/api/v1/auth', {params: { ['phone_number'] : phon,['language'] : lang}});
 }
}
