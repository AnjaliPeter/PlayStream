import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private http:HttpClient) { }

  newChannel(channel:any)
  {
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.post<any>("http://localhost:9999/channels/addchannel",channel,{headers:httpHeaders});
    
  }

  searchChannel(email:any)
  {
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels/searchchannel/"+email,{headers:httpHeaders});
    
  } 

  getChannels()
  {
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels",{headers:httpHeaders});
  }

  getOneChannel(id:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels/single/"+id,{headers:httpHeaders});
  }

  getChannelpic(channel:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels/logo/"+channel,{headers:httpHeaders});
  }

  getOneCategory(category:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels/category/"+category,{headers:httpHeaders});
  }

  getRelated(category:any,id:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels/related/"+category+"/"+id,{headers:httpHeaders});
  }

  removeChannel(id:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels/remove/"+id,{headers:httpHeaders});
  }

  sortChannels(item:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels/sort/"+item,{headers:httpHeaders});
  }

  updateChannel(id:any,num:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels/update/"+id+"/"+num,{headers:httpHeaders});
  }

  updatePassword(email:any,phone:any,password:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/channels/reset/"+email+"/"+phone+"/"+password,{headers:httpHeaders});
  }

}
