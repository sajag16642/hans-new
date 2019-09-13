import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

callback(data)
{
  return this.http.post('https://partner.hansmatrimony.com/api/callBack',data);
}

firstPage(data) {
  return this.http.post('https://partner.hansmatrimony.com/api/' + 'createZeroPageProfilePWA?' + data , null);
}

sendOtp(num)
{
   return this.http.post<{otp:any}>('https://partner.hansmatrimony.com/api/sendOTP',num);
}

resendOtp(num)
{
   return this.http.post<{otp:any}>('https://partner.hansmatrimony.com/api/resendOTP',num);
}

verifyOtp(num)
{
   return this.http.post<{type:any,message:any}>('https://partner.hansmatrimony.com/api/verifyOTP',num);
}

secondPage(data) {
  return this.http.post('https://partner.hansmatrimony.com/api/' + 'createFirstPageProfilePWA', data);
}

newPage(data) {
  return this.http.post('https://partner.hansmatrimony.com/api/' + 'createSecondPageProfilePWA', data);
}

thirdPage(data) {
  return this.http.post('https://partner.hansmatrimony.com/api/' + 'createThirdPageProfilePWA', data);
}
FourthPage(data) {
  return this.http.post('https://partner.hansmatrimony.com/api/' + 'createFourthPageProfile', data);
}

FifthPage(data) {
  return this.http.post('https://partner.hansmatrimony.com/api/' + 'createFifthPageProfile', data);
}

SixthPage(data) {
  return this.http.post('https://partner.hansmatrimony.com/api/' + 'createSixthPageProfile', data);
}
getcastes() {
  return this.http.get('https://partner.hansmatrimony.com/api/getAllCaste');
}
getAlldegree(){
  return this.http.get('https://partner.hansmatrimony.com/api/getAllDegree');
}
getOccupation(){
  return this.http.get('https://partner.hansmatrimony.com/api/getAllOccupation');
}
getState(){
  return this.http.get('https://partner.hansmatrimony.com/api/getAllState');
}
getcity(){
  return this.http.get('https://partner.hansmatrimony.com/api/getAllCity');
}
getViewCenters()
{
  return this.http.get('https://partner.hansmatrimony.com/api/viewCentres');
}
login(data){
  return this.http.post('https://partner.hansmatrimony.com/api/login', data);
}

reset(data){
  return this.http.post('https://partner.hansmatrimony.com/api/resetPassword', data);
}

getRecommendedProfile(data){
  return this.http.post('https://partner.hansmatrimony.com/api/getRecommendedProfiles', data);
}


getProfile(data){
  return this.http.post<{ profile:{},family:{}, preferences:{} }>('https://partner.hansmatrimony.com/api/getProfile', data);
}

getHistory(data)
{
  return this.http.post<{ contacted:[],shortlisted:[],rejected:[] }>('https://partner.hansmatrimony.com/api/history',data);
}

getCentres(data)
{
  return this.http.get('https://partner.hansmatrimony.com/api/viewCentres',data);
}

creditsRemaining(data)
{
  return this.http.post<{ credits:string }>('https://partner.hansmatrimony.com/api/creditsRemaining',data);
}

editPersonalDetails(data)
{
   return this.http.post('https://partner.hansmatrimony.com/api/updatePersonalDetails',data);
}
editFamilyDetails(data)
{
   return this.http.post('https://partner.hansmatrimony.com/api/updateFamilyDetails',data);
}
editPreferencesDetails(data)
{
   return this.http.post('https://partner.hansmatrimony.com/api/updatePreferencesDetails',data);
}

getSubscription()
{
   return this.http.get('https://partner.hansmatrimony.com/api/subscription');
}


updateUser(data)
{
   return this.http.post('https://partner.hansmatrimony.com/api/updateUser',data);
}

checkExist(data)
{
  return this.http.post<{ error_message:string , isUnique:string  }>('https://partner.hansmatrimony.com/api/checkExist',data);
}

getCastes()
{
  return this.http.get<{ mapping_id:number, castes:any }>('https://partner.hansmatrimony.com/api/caste_mapping');
}

updateProfileStatus(data)
{
  return this.http.post('https://partner.hansmatrimony.com/api/updateProfileStatus',data)
}

updateProfilePic(data)
{
  return this.http.post<{ profile_pic_url:string }>('https://partner.hansmatrimony.com/api/uploadProfilePicture',data)  
}

getRecommendedProfileDetails(data)
{
  return this.http.post<{ profile:{},family:{}, preferences:{} }>('https://partner.hansmatrimony.com/api/getRecommendedProfileDetails',data)  
}

getWhatsappPoints(data)
{
  return this.http.post<{ whatsapp_points:number}>('https://partner.hansmatrimony.com/api/getWhatsappPoint',data)  
}
}
