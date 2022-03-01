import { Injectable } from '@angular/core';
// import { AnyMxRecord } from 'dns';

import {HttpClient,HttpHeaders} from '@angular/common/http';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  searchChannel(userObj:any)
  {
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.post<any>("http://localhost:9999/channels/searchchannel",userObj,{headers:httpHeaders});
    
  } 

}
