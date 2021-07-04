import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http:HttpClient) { }

  newVideo(video:any)
  {
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.post<any>("http://localhost:9999/videos/addvideo",video,{headers:httpHeaders});
    
  }

  getVideos()
  {
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/videos",{headers:httpHeaders});
  }

  getOneVideo(id:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/videos/single/"+id,{headers:httpHeaders});
  }

  getOneCategory(category:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/videos/category/"+category,{headers:httpHeaders});
  }

  getOneChannel(channelname:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/videos/channel/"+channelname,{headers:httpHeaders});
  }

  getRelated(category:any,id:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/videos/related/"+category+"/"+id,{headers:httpHeaders});
  }

  removeVideo(id:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/videos/remove/"+id,{headers:httpHeaders});
  }

  removeVideos(channel:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/videos/removechannel/"+channel,{headers:httpHeaders});
  }

  updateVideo(id:any,item:any,num:any){
    let httpHeaders = new HttpHeaders({
      "content-Type" : "application/json"
    });
    return this.http.get<any>("http://localhost:9999/videos/update/"+id+"/"+item+"/"+num,{headers:httpHeaders});
  }

}
