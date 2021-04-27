import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../_services/instagram.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private igService: InstagramService) { }

  ngOnInit(): void {
    this.checkForToken()
  }

  checkForToken() {
    var tokenObj = this.igService.GetUserToken();
    if(tokenObj === null)
      window.location.href = "https://api.instagram.com/oauth/authorize?client_id=480434256457208&redirect_uri=https://localhost:4200/test-ig/&scope=user_profile,user_media&response_type=code";
    else{
      console.log(tokenObj);
    }
  }

}
