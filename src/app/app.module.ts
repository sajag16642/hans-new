import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import {
  MatFormFieldModule, MatDatepickerModule, MatIconModule, MatInputModule, MatButtonToggleModule,
  MatAutocompleteModule, MatCheckboxModule, MatSelectModule,MatTabsModule, MatTooltipModule
} from '@angular/material';

import { Angular5TimePickerModule } from 'angular5-time-picker';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material';
import { HomeComponent } from './LandingPage/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SubscriptionComponent } from './subscription/subscription.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Services
import { AuthService } from '../app/Services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { SnotifyModule, SnotifyService , ToastDefaults } from 'ng-snotify';
import { NgxNotificationComponent, NgxNotificationModule } from 'ngx-notification';
import { ViewCentresComponent } from './view-centres/view-centres.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ContactedUserProfileComponent } from './contacted-user-profile/contacted-user-profile.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { RegisterOneComponent } from './register-one/register-one.component';
import { RegisterTwoComponent } from './register-two/register-two.component';
import { RegisterThreeComponent } from './register-three/register-three.component';
import { RegisterFourComponent } from './register-four/register-four.component';
import { RegisterFiveComponent } from './register-five/register-five.component';
import { RegisterSixComponent } from './register-six/register-six.component';
import { ChatComponent } from './chat/chat.component';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);

export function provideConfig() {
  return config;
}  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SubscriptionComponent,
    DashboardComponent,
    EditProfileComponent,
    ViewCentresComponent,
    ContactedUserProfileComponent,
    OnboardingComponent,
    RegisterOneComponent,
    RegisterTwoComponent,
    RegisterThreeComponent,
    RegisterFourComponent,
    RegisterFiveComponent,
    RegisterSixComponent,
    ChatComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyADj37ebmp8y5eGpy3C5GhjTY7Gzuo3Y6U",
      libraries: ["places"]
    }),
    MDBBootstrapModule.forRoot(),FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    Angular5TimePickerModule,
    AngularMultiSelectModule,
    CommonModule,
    BrowserModule,
    SnotifyModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatDialogModule,
    MatAutocompleteModule,
    SocialLoginModule,
    HttpClientModule,MatTooltipModule,
    MatTabsModule,NgxNotificationModule,FormsModule,HttpClientModule,
    OwlDateTimeModule,OwlNativeDateTimeModule
  ],
  providers: [{provide : 'SnotifyToastConfig' , useValue: ToastDefaults}, AuthService , SnotifyService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
