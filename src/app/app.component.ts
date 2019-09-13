import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginComponent } from '../app/login/login.component';
import { SocialLoginService } from './social-login.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Location } from '@angular/common';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  toggled: boolean;
  animal: string = "zebra";
  name: string = "amit";
  socialInfo:string;
  routerUrl: string;
  isLogin='false';
  footer=true;
  header=true;
  clickToggle=false;
  btnToggle;
  clickEvent:any;
  constructor(private _location: Location,public dialog: MatDialog, public router: Router, private socialAuth : SocialLoginService, route:ActivatedRoute) {
      
  }

  ngOnInit() {
    this.btnToggle = document.getElementById('toggle');
  if(localStorage.getItem('loggedIn'))  
  this.isLogin = localStorage.getItem('loggedIn');
      console.log("wegrefgr",this.isLogin);

      this.changeOfRoutes();
      
      this.clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
      });     
}

  logout()
  {
    localStorage.setItem('loggedIn','false');
    if(localStorage.getItem('loggedIn')) 
    this.isLogin = localStorage.getItem('loggedIn');

    this.router.navigateByUrl('home');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.socialInfo = result;
      console.log("sfd",this.socialInfo);
    });
  }

  subscription() {
    this.router.navigateByUrl('/subscription');
  }

  back()
  {
    this._location.back();
    console.log('backed');
    }

  changeOfRoutes()
  {
     if(location.href.indexOf('dash')>-1 || location.href.indexOf('Edit')>-1 || location.href.indexOf('contactedUserProfiles')>-1 || location.href.indexOf('chat')>-1|| location.href.indexOf('register')>-1)
    { this.footer=false;
      if(location.href.indexOf('chat')>-1){
        this.header=false;
      }
      this.isLogin='true';
      document.getElementById('navbar').style.zIndex='200';
    }
    else
    {
      this.footer=true;
      if(localStorage.getItem('loggedIn')!='true')
      this.isLogin='false';
      document.getElementById('navbar').style.zIndex='1';
     }   
     if(this.clickToggle==true)
     {
      this.btnToggle.dispatchEvent(this.clickEvent);
     }
     if(location.href.indexOf('home')>-1 || location.href.indexOf('register')>-1 || location.href.indexOf('subscription')>-1)
     {
        document.getElementById('backBtn').style.display = 'none';
     }
     else
     {
      document.getElementById('backBtn').style.display = '';     
     }
  }
 
  myFunction()
  {
   this.clickToggle = true;

  }
}
