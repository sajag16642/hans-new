import { Injectable } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
 
@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  constructor(private authService: AuthService) { }
 
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data)=>{
      console.log(data);
    });
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data)=>{
      console.log(data);
    });
  }
 
  signOut(): void {
    this.authService.signOut();
  }
}
