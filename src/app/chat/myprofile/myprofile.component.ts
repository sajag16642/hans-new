import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  @Input() personalProfileData: any;
  @Input() familyProfileData: any;

  constructor() { }

  ngOnInit() {
  }
  setAge(dob: string) {
    if (dob != null) {
    return (Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365)));
    } else {
      return null;
    }
  }

}
