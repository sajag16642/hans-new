import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Observable } from 'rxjs';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { skip } from 'rxjs/operators';

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
  langChanged = false;


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
            if (this.langChanged === true) {
              this.changeLanguage(localStorage.getItem('mobile_number'), localStorage.getItem('language')).subscribe(
                (data : any) => {
                  console.log(data);
                }, 
                (error:any) => {
                  console.log(error);
                }
                );
              this.langChanged = false;
            }
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
                  if (this.langChanged === true) {
                    this.changeLanguage(this.currentUrl, localStorage.getItem('language')).subscribe(
                      (data : any) => {
                        console.log(data);
                      }, 
                      (error:any) => {
                        console.log(error);
                      }
                      );
                    this.langChanged = false;
                  }
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
                  if (this.langChanged === true) {
                    this.changeLanguage(res.value, localStorage.getItem('language')).subscribe(
                      (data : any) => {
                        console.log(data);
                      }, 
                      (error:any) => {
                        console.log(error);
                      }
                      );
                    this.langChanged = false;
                  }
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
      if (this.langChanged === true) {
        this.changeLanguage(res.value, localStorage.getItem('language')).subscribe(
          (data : any) => {
            console.log(data);
          }, 
          (error:any) => {
            console.log(error);
          }
          );
        this.langChanged = false;
      }
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

     return this.http.post<any>(' https://partner.hansmatrimony.com/api/sendMessages' , data1 );
   }
   checkUrl(num: string): Observable<any> {
       return this.http.get<any>(' https://partner.hansmatrimony.com/api/auth', {params: { ['phone_number'] : num}});
   }

   repeatMEssage(ans: String, mob) {
         this.chatRequest(ans, mob).subscribe(
           (data: any) => {
             console.log(data);
             if (data.type === 'profile') {
                 let values = data.apiwha_autoreply;
                 console.log(values.photo);
                 this.botui.message.add({
                   type: 'html',
                   content: '<img src='+this.getProfilePhoto(values.photo, values.gender)+' width="200" >'
                 }).then(() => {
                   if (values.language === 'English') {
                     this.botui.message.add({
                       type: 'html',
                       // tslint:disable-next-line: max-line-length
                       content:'<b> &#128100 Personal Details</b> <br> <br>' +
                       'Name: ' +values.name +'<br>'+
                       // tslint:disable-next-line: max-line-length
                       this.profileSet('Age: ' , String(Math.floor((Date.now() - new Date(values.birth_date).getTime())/(1000*60*60*24*365))))+
                       this.profileSet('Height: ',values.height)+
                       this.profileSet('Weight: ',values.weight)+
                       this.profileSet('Religion: ',values.religion)+
                       this.profileSet('Caste: ',values.caste)+
                       this.profileSet('Food Choice: ',values.food_choice)+
                       this.profileSet('Locality: ',values.locality)+
                       this.profileSet('Marital Status: ',values.marital_status)+
                       this.profileSet('Disability: ',values.disability) +' <br> <br>'
                        +
                       '<b> &#9803 Horoscope Details</b> <br><br>' +
                       this.profileSet('Birth Date: ',values.birth_date)+
                       this.profileSet('Birth Time: ',values.birth_time)+
                       this.profileSet('Bith Place: ',values.birth_place)+
                       this.profileSet('Manglik: ',values.manglik)+' <br> <br>'
                       +
                       '<b> &#128218 Education Details</b> <br><br>' +
                       this.profileSet('Education: ',values.education)+
                       this.profileSet('Degree: ',values.degree)+
                       this.profileSet('College: ',values.college)+' <br><br>'
                       +
                       '<b> &#128188 Work Details</b> <br><br>' +
                       this.profileSet('Occupation: ',values.occupation)+'<br>'+
                       this.profileSet('Annual Income: ',String(values.monthly_income/100000))+
                       this.profileSet('Profession: ',values.profession)+
                       this.profileSet('Working City: ',values.working_city)+' <br><br>'
                       +
                       '<b> &#128106 Family Details</b> <br><br>' +
                       this.profileSet('Family Type: ',values.family_type)+
                       this.profileSet('House Type: ',values.house_type)+
                       this.profileSet('Mother Status: ',values.mother_status)+
                       this.profileSet('Father Status: ',values.father_status)+
                       this.profileSet('Mothers Occupation: ',values.mother_occupation)+
                       this.profileSet('Fathers Occupation: ',values.father_occupation)+
                       this.profileSet('Family Income: ',String(values.family_income/100000))+
                       this.profileSet('Married Brothers: ',values.married_sons)+
                       this.profileSet('Married Sisters: ',values.married_daughters)+
                       this.profileSet('Unmarried Brothers: ',values.unmarried_sons)+
                       this.profileSet('UnMarried Sisters: ',values.unmarried_daughters)
                   }).then(() => {
                       if (data.buttons.match('Yes' || 'No')) {
                         return this.botui.action.button({
                           cssClass: 'styleButton',
                           action: [
                             { text: 'YES', value: 'YES'},
                             {text: 'NO', value: 'NO' }
                           ]
                       }).then(res => {
                        if (this.langChanged === true) {
                          this.changeLanguage(mob, localStorage.getItem('language')).subscribe(
                            (data : any) => {
                              console.log(data);
                            }, 
                            (error:any) => {
                              console.log(error);
                            }
                            );
                          this.langChanged = false;
                        }
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
                        if (this.langChanged === true) {
                          this.changeLanguage(mob, localStorage.getItem('language')).subscribe(
                            (data : any) => {
                              console.log(data);
                            }, 
                            (error:any) => {
                              console.log(error);
                            }
                            );
                          this.langChanged = false;
                        }
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
                       // tslint:disable-next-line: max-line-length
                       this.profileSet('उम्र: ',String((Math.floor((Date.now() - new Date(values.birth_date).getTime())/(1000*60*60*24*365)))))+
                       this.profileSet('कद: ',this.getHeight(Number(values.height)))+
                       this.profileSet('वजन: ',values.weight)+
                       this.profileSet('धर्म: ',values.religion)+
                       this.profileSet('जाती: ',values.caste)+
                       this.profileSet('खान-पान: ',values.food_choice)+
                       this.profileSet('पता: ',values.locality)+
                       this.profileSet('वैवाहिक स्तिथि: ',values.marital_status)+
                       this.profileSet('विकलांगता: ',values.disability)+' <br> <br>'
                        +
                       '<b> &#9803 होरोस्कोप डिटेल्स</b> <br><br>' +
                       this.profileSet('जन्म दिवस: ',values.birth_date)+
                       this.profileSet('जन्म का समय: ',values.birth_time)+
                       this.profileSet('जन्म स्थान: ',values.birth_place)+
                       this.profileSet('मांगलिक: ',values.manglik)+' <br> <br>'
                       +
                       '<b> &#128218 एजुकेशन डिटेल्स</b> <br><br>' +
                       this.profileSet('शिक्षा: ',values.education)+
                       this.profileSet('डिग्री: ',values.degree)+
                       this.profileSet('कॉलेज: ',values.college)+' <br><br>'
                       +
                       '<b> &#128188 वर्क डिटेल्स</b> <br><br>' +
                       this.profileSet('व्यसाय: ',values.occupation)+
                       this.profileSet('वार्षिक आय: ',String(values.monthly_income/100000))+
                       this.profileSet('पेशा: ',values.profession)+
                       this.profileSet('कार्य स्थान: ',values.working_city)+' <br><br>'
                       +
                       '<b> &#128106 फॅमिली डिटेल्स</b> <br><br>' +
                       this.profileSet('परिवार: ',values.family_type)+
                       this.profileSet('घर: ',values.house_type)+
                       this.profileSet('मदर स्टेटस: ',values.mother_status)+
                       this.profileSet('फादर स्टेटस: ',values.father_status)+
                       this.profileSet('माता का व्यसाय: ',values.mother_occupation)+
                       this.profileSet('पिता का व्यसाय : ',values.father_occupation)+
                       this.profileSet('पारिवारिक आय: ',String(values.family_income/100000))+
                       this.profileSet('मैरिड भाई: ',values.married_sons)+
                       this.profileSet('मैरिड बेहेने : ',values.married_daughters)+
                       this.profileSet('अव्यावाहित भाई: ',values.unmarried_sons)+
                       this.profileSet('अव्यावाहित बेहेने : ',values.unmarried_daughters)
                   }).then(() => {
                       if (data.buttons.match('Yes' || 'No')) {
                         return this.botui.action.button({
                           cssClass: 'styleButton',
                           action: [
                             { text: 'YES', value: 'YES'},
                             {text: 'NO', value: 'NO' }
                           ]
                       }).then(res => {
                        if (this.langChanged === true) {
                          this.changeLanguage(mob, localStorage.getItem('language')).subscribe(
                            (data : any) => {
                              console.log(data);
                            }, 
                            (error:any) => {
                              console.log(error);
                            }
                            );
                          this.langChanged = false;
                        }
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
                        if (this.langChanged === true) {
                          this.changeLanguage(mob, localStorage.getItem('language')).subscribe(
                            (data : any) => {
                              console.log(data);
                            }, 
                            (error:any) => {
                              console.log(error);
                            }
                            );
                          this.langChanged = false;
                        }
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
                 if (data.buttons.match('No')) {
                   return this.botui.action.button({
                     action: [
                       { text: 'YES', value: 'YES'},
                       {text: 'NO', value: 'NO' }
                     ]
                 }).then(res => {
                  if (this.langChanged === true) {
                    this.changeLanguage(mob, localStorage.getItem('language')).subscribe(
                      (data : any) => {
                        console.log(data);
                      }, 
                      (error:any) => {
                        console.log(error);
                      }
                      );
                    this.langChanged = false;
                  }
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
                  if (this.langChanged === true) {
                    this.changeLanguage(mob, localStorage.getItem('language')).subscribe(
                      (data : any) => {
                        console.log(data);
                      }, 
                      (error:any) => {
                        console.log(error);
                      }
                      );
                    this.langChanged = false;
                  }
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
 getFoodChoiceString(num: string): String {
 if (num === null) {
 return 'N/A';
 } else {
 return num;
 }
 }
 getMaritalStatusString(num: string): String {
 switch (num) {
 case null:
 return 'N/A';
 default:
 return num;
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
 
 getManglikString(num: String): String {
 switch (num) {
 case null:
 return 'N/A';
 default:
 return num;
 }
 }
 getOccupationString(num: String): String {
 switch (num) {
 case null:
 return 'N/A';
 default:
 return num;
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

 getSiblingCount(num: string): String {
 if (num === null) {
 return 'N/A';
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
 getReligion(num: String): String {
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
 getStringForm(num: String): String {
  if (num === null) {
  return 'N/A';
  } else {
  return num;
  }
}
 getHeight(num:number){
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
     default: return null
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
   console.log('changing language');
  return this.http.get<any>(' https://partner.hansmatrimony.com/api/language', {params: { ['phone_number'] : phon,['language'] : lang}});
 }
 languageEnglish() {
  localStorage.setItem('language','English');
  this.langChanged = true;
  console.log('language changed to english');
 }
 languageHindi() {
  localStorage.setItem('language','Hindi');
  this.langChanged = true;
  console.log('language changed to hindi');
   }

   profileSet(key:string,value:string): String {
    if (value != null) {
      return key+': '+value+'<br>'
    } else {return ""}
   }
}
