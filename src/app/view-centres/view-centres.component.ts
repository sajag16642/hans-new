import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-view-centres',
  templateUrl: './view-centres.component.html',
  styleUrls: ['./view-centres.component.css']
})

export class ViewCentresComponent implements OnInit {

  centres : any = [];

  @ViewChild('placesRef') placesRef : GooglePlaceDirective;

  constructor(private http : HttpClient) { }

  ngOnInit() {
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })


    this.http.get('https://partner.hansmatrimony.com/api/viewCentres', {headers : headers}).subscribe((res:any) => {
      this.centres = res;
      console.log(this.centres);

      var l = this.centres.length;
      for(let i=0;i<l;i++)
      if (i%2===0) {
        this.centres[i].profile_photo = 'https://matchmakerz.s3.ap-south-1.amazonaws.com/static/matchmakerz/profile_pic/temple.pngimage.jpg';
      } else {
        this.centres[i].profile_photo = 'https://matchmakerz.s3.ap-south-1.amazonaws.com/static/matchmakerz/profile_pic/temple_yellow.pngimage.jpg';
        
      }
    })
  }
  public handleAddressChange(address: Address) {
    // Do some stuff
    console.log(address);
  }
}
