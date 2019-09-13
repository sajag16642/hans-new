import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    spinner: boolean = false;

    identity_number = '';
    mobile = '';
    email = '';
    password = '';

    constructor (
        private router: Router,
        private http: HttpClient
    ) {
        if (
            localStorage.getItem('email') && localStorage.getItem('email')!='' && localStorage.getItem('email')!=null && localStorage.getItem('email')!=undefined &&
            localStorage.getItem('password') && localStorage.getItem('password')!='' && localStorage.getItem('password')!=null && localStorage.getItem('password')!=undefined
        ) {
            this.email = localStorage.getItem('email');
            this.password = localStorage.getItem('password');

            const loginData = new FormData();
            loginData.append('email' , this.email);
            loginData.append('password', this.password);

            this.http.post('https://partner.hansmatrimony.com/api/login', loginData ).subscribe((res:any) => {
                if(res.login_status === 'Y') {
                    this.identity_number = res.identity_number;
                    this.router.navigate(['/onboarding']);
                } else {
                    this.identity_number = '';
                    this.mobile = '';
                    this.email = '';
                    this.password = '';
                } 
            })
        }
    }
}
