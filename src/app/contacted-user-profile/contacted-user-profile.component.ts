import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-contacted-user-profile',
  templateUrl: './contacted-user-profile.component.html',
  styleUrls: ['./contacted-user-profile.component.css']
})
export class ContactedUserProfileComponent implements OnInit {
  @ViewChild('contactModal') private contactModal :any;
  monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

  isClicked : Boolean = true;
  userProfileDetails: any = {};
  userFamilyDetails: any = {};
  userPreferenceDetails: any = {};
  userBirthDay;
  currentAge : any;
  carouselcontactedUserPics :any = [];
  contactedUserGender;
  whatsappCredit;
  id: any;
  identityNumber = localStorage.getItem('identityNumber');

  private sub: any;
  status : string;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {

    this.status = (this.route.snapshot.paramMap.get('status'));
    console.log(this.status);

    this.id = (this.route.snapshot.paramMap.get('userId'));
    // (+) converts string 'id' to a number
      console.log(this.id);
      let iden = { id : this.id }
      console.log(iden);
      this.authService.getRecommendedProfileDetails(iden).subscribe((res:any)=>{
        console.log(res);

        let carouselData = JSON.parse(res.profile["carousel"]);
        if(carouselData)
      {  
        for(let key in (carouselData))
       { 
        if (carouselData.hasOwnProperty(key)) {
          this.carouselcontactedUserPics.push(carouselData[key]);
       }
       }
      }
        console.log(this.carouselcontactedUserPics);


        let d = new Date(res.profile.birth_date);
        this.userBirthDay = d.getDate()+' '+ this.monthNames[d.getMonth()] + ' '+d.getFullYear();
        console.log("The current month is " + this.userBirthDay);

        this.userProfileDetails = res.profile;
        this.contactedUserGender = this.userProfileDetails.gender;
      this.userFamilyDetails = res.family;
      this.userPreferenceDetails = res.preferences;
      const timediffernce = Math.abs(Date.now() - new Date(this.userProfileDetails.birth_date).getTime());
      this.currentAge = Math.floor((timediffernce / (1000 * 3600 * 24)) / 365);

      })
      // In a real app: dispatch action to load the details here.
    
  }

  @Input() headerPosition;
  scroll(anchor: string) {
    const element = < HTMLElement > document.querySelector('#' + anchor);
    element.scrollIntoView({
      behavior: 'smooth',
    });
    this.isClicked = false;
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
      });
    })
    console.log(data);
  }

  getWhatsappPoints()
  {
    const data = { id : JSON.parse(localStorage.getItem('loggedInUserId')) }
    this.authService.getWhatsappPoints(data).subscribe(res=>{
      console.log(res);
      this.whatsappCredit = res.whatsapp_points;
      this.openDialog(this.contactModal);
    })
  }

  contactUser()
  {
    this.updateProfileStatus(this.id,'C');
    this.router.navigate(['/contactedUserProfiles',this.id,'contacted']);
    this.Cross_click();
    
  }
}
