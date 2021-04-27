import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  GetUserMediaToken(code: string) {
    return this.http.post(this.baseUrl + 'ig/get-user-media-and-token/' + code, {});
  }

  SetUserToken(objName: any, tokenObj: any) {
    let newtokenObj = {
      "access_token" : tokenObj['access_token'],
      "expiration_date": this.CreateExperiationDate(tokenObj),
      "token_type": tokenObj['token_type']
    }
    localStorage.setItem(objName, JSON.stringify(newtokenObj));
  }

  GetUserToken() {
    return localStorage.getItem('ig-token');
  }

  RemoveUserToken(){
    localStorage.removeItem('ig-token');
  }

  CreateExperiationDate(tokenObj: any) {
    let today = new Date();
    let expirationDate = new Date(Date.UTC(today.getFullYear(), today.getMonth()));
    expirationDate.setUTCSeconds(tokenObj['expires_in']);
    return expirationDate.toUTCString();
  }
 
}