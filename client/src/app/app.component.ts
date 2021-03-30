import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IG Ice Breaker';
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private accountService: AccountService, private presence: PresenceService) {}
  users: any;

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
    
  }

  getUsers() {
    this.http.get(this.baseUrl + 'users/').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
}
