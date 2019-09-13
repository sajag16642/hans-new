import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../Services/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  @ViewChild('contactModal') private contactModal :any;
 monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
 recommendedProfileBirthDay;
 userProfileBirthDay;
  

  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) {}


  recommendedProfileDetails = [];
  userProfileDetails: any = {};
  userFamilyDetails: any = {};
  userPreferenceDetails: any = {};
  likedUserHistory:any[];
  dislikedUserHistory:any[];
  contactedUserHistory:any[];
  isClicked = true;
  credits;
  currentAge;
  recommendedUserAge;
  message;
  fullimagePath;
  fullimgURL;
  identityNumber = localStorage.getItem('identityNumber');
  loggedInUserId : any;
  whatsappCredit : number;
  carouselLoggedInUserPics :any = [];
  carouselrecommendedUserPics :any = [];
  loggedInUserGender;
  recommendedUserGender;
  recommendedUserId;

  @Input() headerPosition;
  scroll(anchor: string) {
     const element = < HTMLElement > document.querySelector('#' + anchor);
    // const about = < HTMLElement > document.querySelector('#About');
    // const family = < HTMLElement > document.querySelector('#Familydetails');
    // const pref = < HTMLElement > document.querySelector('#preference');
    element.scrollIntoView({
      behavior: 'smooth',
    });

    // if (anchor == 'About') {
    //   element.style.display = 'inline';
    //   family.style.display = 'none';
    //   pref.style.display = 'none';
    // }

    // if (anchor == 'Familydetails') {
    //   family.style.display = 'inline';
    //   about.style.display = 'none';
    //   pref.style.display = 'none';
    // }

    // if (anchor == 'preference') {
    //   element.style.display = 'inline';
    //   family.style.display = 'none';
    //   about.style.display = 'none';
    // }
    this.isClicked = false;
  }

  navigateToEditProfile() {
    this.router.navigateByUrl('EditProfile');
  }
  ngOnInit() {

    this.authService.getCastes().subscribe(res => {
      console.log('cluster',res);
    });

    const iden = new FormData();
    iden.append('identity_number', this.identityNumber);
    this.authService.getRecommendedProfile(iden).subscribe((res: any) => {
      console.log("res1", res);
    
      if(res)
  {    var carouselData = JSON.parse(res[0].profile.carousel);
      if(carouselData)
    {  
      for(let key in (carouselData))
     { 
      if (carouselData.hasOwnProperty(key)) {
        this.carouselrecommendedUserPics.push(carouselData[key]);
     }
     }
    }
  }
   //   console.log(this.carouselrecommendedUserPics);
   let d = new Date(res[0].profile.birth_date);
   this.recommendedProfileBirthDay = d.getDate()+' '+ this.monthNames[d.getMonth()] + ' '+d.getFullYear();
   console.log("The current month is " + this.recommendedProfileBirthDay);
   
      this.recommendedProfileDetails = res;
      this.recommendedUserGender = res[0].profile.gender;
      this.recommendedUserId = res[0].profile.id;
      console.log('recommnedId',this.recommendedUserId);
      const timediffernce = Math.abs(Date.now() - new Date(this.recommendedProfileDetails[0].profile.birth_date).getTime());
      this.recommendedUserAge = Math.floor((timediffernce / (1000 * 3600 * 24)) / 365);
      //console.log('rAge',this.recommendedUserAge);
    });
   
    this.getProfile(iden);
    this.getHistory(iden);

    this.authService.creditsRemaining(iden).subscribe(res => {
      this.credits = res.credits;
    })
  }
                                           
  updateProfileStatus(id, profileStatus) {
    let data = {
      identity_number: this.identityNumber,
      id: id,
      status: profileStatus
    }
    this.authService.updateProfileStatus(data).subscribe(res => {
      console.log(res);
      const iden = new FormData();
      iden.append('identity_number', this.identityNumber);
      this.Cross_click();
      this.authService.getRecommendedProfile(iden).subscribe((res: any) => {
        console.log("res1", res);
        this.recommendedProfileDetails = res;
        this.getHistory(iden);
      });
    })
    console.log(data);
  }

  contactUser()
  {
    this.updateProfileStatus(this.recommendedUserId,'C');
    this.router.navigate(['/contactedUserProfiles',this.recommendedUserId,'contacted']);
    this.Cross_click();
    
  }

  ngAfterViewInit() {}

  getHistory(iden)
  {
    this.authService.getHistory(iden).subscribe((res1) => {
      this.likedUserHistory = res1.shortlisted;
      this.dislikedUserHistory = res1.rejected;
      this.contactedUserHistory = res1.contacted;
      console.log('resH',res1);
    });
  }

  getProfile(iden)
  {
    this.authService.getProfile(iden).subscribe((res: any) => {
      console.log("res", res);
      // this.carouselLoggedInUserPics.push(res.profile.photo);
      let carouselData = JSON.parse(res.profile.carousel);
      if(carouselData)
    {  
      for(let key in (carouselData))
     { 
      if (carouselData.hasOwnProperty(key)) {
        this.carouselLoggedInUserPics.push(carouselData[key]);
     }
     }
    }
      console.log('carousel pics',this.carouselLoggedInUserPics);
      let d = new Date(res.profile.birth_date);
   this.userProfileBirthDay = d.getDate()+' '+ this.monthNames[d.getMonth()] + ' '+d.getFullYear();
   console.log("The current month is " + this.userProfileBirthDay);
      this.loggedInUserId = res.profile.id;
      localStorage.setItem('loggedInUserId',res.profile.id);
      this.userProfileDetails = res.profile;
      this.userFamilyDetails = res.family;
      this.userPreferenceDetails = res.preferences;

      this.loggedInUserGender = res.profile.gender;

    //  console.log("userProfile", this.userProfileDetails);
      //console.log("userfam", this.userFamilyDetails);
      //console.log("userPref", this.userPreferenceDetails);
      const timediffernce = Math.abs(Date.now() - new Date(this.userProfileDetails.birth_date).getTime());
      this.currentAge = Math.floor((timediffernce / (1000 * 3600 * 24)) / 365);

      console.log(this.currentAge);
    });
  }

  openDialog(dialog): void {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(dialog,{
      
      // panelClass: 'custom-modalbox'
    });
  }

  Cross_click(){
      this.dialog.closeAll();
  }

  previewFull(files,index) {
    if (files.length === 0) {
      return;
    } else {
      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      const reader = new FileReader();
      this.fullimagePath = files[0];
      console.log( this.fullimagePath)
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.fullimgURL = reader.result;
        console.log(this.fullimgURL);
        console.log(index);
        this.updateProfilePic(index,this.fullimagePath);
      };
    }
    }

    updateProfilePic(index,imagePath) {
      const updateDP = new FormData();
      updateDP.append('identity_number' ,this.identityNumber);
      updateDP.append('image' , imagePath);
      updateDP.append('index' , index);

      this.authService.updateProfilePic(updateDP).subscribe(suc => {
             console.log('photo res',suc);
            const pro = document.getElementById('proPic'+index) as HTMLImageElement;
            pro.src = suc.profile_pic_url;
            console.log(pro.src);
      });
    }

    getWhatsappPoints()
    {
      const data = { id : this.loggedInUserId }
      this.authService.getWhatsappPoints(data).subscribe(res=>{
        console.log(res);
        this.whatsappCredit = res.whatsapp_points;
        this.openDialog(this.contactModal);
      })
    }
}
