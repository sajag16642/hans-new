import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import {MatChipsModule} from '@angular/material/chips';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import {
  MatFormFieldModule, MatDatepickerModule, MatIconModule, MatInputModule, MatButtonToggleModule,
  MatAutocompleteModule, MatCheckboxModule, MatSelectModule,MatTabsModule, MatTooltipModule, MatSidenavModule
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
import { SubscriptionService } from './subscription.service';
import { SnotifyModule, SnotifyService , ToastDefaults } from 'ng-snotify';
import { NgxNotificationComponent, NgxNotificationModule } from 'ngx-notification';
import { ViewCentresComponent } from './view-centres/view-centres.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ContactedUserProfileComponent } from './contacted-user-profile/contacted-user-profile.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RegisterOneComponent } from './register-one/register-one.component';
import { RegisterTwoComponent } from './register-two/register-two.component';
import { RegisterThreeComponent } from './register-three/register-three.component';
import { RegisterFourComponent } from './register-four/register-four.component';
import { RegisterFiveComponent } from './register-five/register-five.component';
import { RegisterSixComponent } from './register-six/register-six.component';
import { ChatComponent } from './chat/chat.component';
import { HistoryComponent } from './chat/history/history.component';
import { MyprofileComponent } from './chat/myprofile/myprofile.component';
import { SubscriptionDialogComponent } from './subscription/subscription-dialog/subscription-dialog.component';
import { EditPersonalDialogueComponent } from './chat/myprofile/edit-personal-dialogue/edit-personal-dialogue.component';
import { EditFamilyDialogueComponent } from './chat/myprofile/edit-family-dialogue/edit-family-dialogue.component';
import { EditPreferenceDialogueComponent } from './chat/myprofile/edit-preference-dialogue/edit-preference-dialogue.component';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


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
    RegisterOneComponent,
    RegisterTwoComponent,
    RegisterThreeComponent,
    RegisterFourComponent,
    RegisterFiveComponent,
    RegisterSixComponent,
    ChatComponent,
    HistoryComponent,
    MyprofileComponent,
    SubscriptionDialogComponent,
    EditPersonalDialogueComponent,
    EditFamilyDialogueComponent,
    EditPreferenceDialogueComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBUwQ9bDNmOKANAAyKfa187kHgf30O-IZ4",
      libraries: ["places"]
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    MDBBootstrapModule.forRoot(),FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    GooglePlaceModule,
    Angular5TimePickerModule,
    AngularMultiSelectModule,
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MatChipsModule,
    SnotifyModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatCheckboxModule,
    MatSelectModule,
    SelectDropDownModule,
    MatSidenavModule,
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
    // tslint:disable-next-line: max-line-length
    OwlDateTimeModule,OwlNativeDateTimeModule, RouterModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{provide : 'SnotifyToastConfig' , useValue: ToastDefaults}, AuthService , SnotifyService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  } , SubscriptionService],
  bootstrap: [AppComponent],
  // tslint:disable-next-line: max-line-length
  entryComponents: [SubscriptionDialogComponent, EditPersonalDialogueComponent, EditPreferenceDialogueComponent, EditFamilyDialogueComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
