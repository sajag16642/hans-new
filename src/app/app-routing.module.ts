import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './LandingPage/home.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from '../../src/app/edit-profile/edit-profile.component';
import { ViewCentresComponent } from './view-centres/view-centres.component';
import { GaurdService } from './Services/gaurd.service';
import { ContactedUserProfileComponent } from './contacted-user-profile/contacted-user-profile.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { RegisterOneComponent } from './register-one/register-one.component';
import { RegisterTwoComponent } from './register-two/register-two.component';
import { RegisterThreeComponent } from './register-three/register-three.component';
import { RegisterFourComponent } from './register-four/register-four.component';
import { RegisterFiveComponent } from './register-five/register-five.component';
import { RegisterSixComponent } from './register-six/register-six.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', pathMatch: 'full',component: HomeComponent },
  { path: 'home',redirectTo: '',  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[GaurdService]},
  { path: 'EditProfile', component: EditProfileComponent, canActivate:[GaurdService]},
  { path: 'viewCentres', component: ViewCentresComponent},
  { path: 'contactedUserProfiles/:userId/:status', component:ContactedUserProfileComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'register-one', component: RegisterOneComponent},
  { path: 'register-two', component: RegisterTwoComponent},
  { path: 'register-three', component: RegisterThreeComponent},
  { path: 'register-four', component: RegisterFourComponent},
  { path: 'register-five', component: RegisterFiveComponent},
  { path: 'register-six', component: RegisterSixComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
