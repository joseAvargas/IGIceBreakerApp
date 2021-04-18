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

  ExchageCodeForToken(code: string) {
    return this.http.post(this.baseUrl + 'ig/ig-long-lived-token/' + code, {});
  }
 
}