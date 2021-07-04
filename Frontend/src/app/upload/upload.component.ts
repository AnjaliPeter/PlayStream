import { Component, OnInit } from '@angular/core';

import { VideoModel } from './video.model';
import { Router } from '@angular/router';
import { VideosService } from '../videos.service';
import { ChannelsService } from '../channels.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private channelsService:ChannelsService,private videosService:VideosService,private router:Router) { }

  videoItem = new VideoModel("","","","","","","","",0,0,0,0);
  channel:any;
  userid:any;

  ngOnInit(): void {

    this.userid = localStorage.getItem("userid");
    if(this.userid != "admin@PlayStream")
    {
      this.channelsService.getOneChannel(this.userid)
      .subscribe(data =>
      {
      this.channel = data;
      console.log(this.channel);
      this.videoItem.channel = this.channel.channel;
      this.videoItem.author = this.channel.firstname+ " " + this.channel.lastname;
      this.videoItem.category = this.channel.category;
      });
    }

  }

  videoObj:any;
  check:any;

  addVideo()
  {
    if($("input[type=checkbox]").is(":checked"))
    {
      this.uploadAlert();
    }
    else
    {
      Swal.fire(
        'Terms & Conditions',
        'Please check this box if you want to proceed !!!',
        'warning'
      ).then(() => {
        // check the box
      });
    }
  }

  uploadAlert(){
    Swal.fire({
      title: 'Upload Video',
      text: 'Are you sure you want to upload this video ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Upload',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // remove
        this.videosService.newVideo(this.videoItem)
        .subscribe(data => {
          this.videoObj = data;
          // alert(this.videoObj);
        });
        Swal.fire(
          'Uploaded!',
          'Video has been uploaded to PlayStream !!!',
          'success'
        ).then(() => {
          this.router.navigate(["/home/channel/"+this.userid]);
        });
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // cancel upload
        this.videoItem.title = "";
        this.videoItem.channel = "";
        this.videoItem.author = "";
        this.videoItem.description = "";
        this.videoItem.category = "";
        this.videoItem.date = "";
        this.videoItem.image = "";
        this.videoItem.video = "";
      }
    });
  }

  url = "../../assets/videos/video1.mp4";
  videoselected(event:any){
    if(event.target.files != null)
    {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e:any) => {
        this.url = e.target.result;
      }
      var files = event.target.files;
      var filename = files[0].name;
      this.videoItem.video = filename;
    }
    else{
      alert("Couldn't upload your design ! Try again...");
    }
  }

  imageselected(event:any){
    if(event.target.files != null)
    {
      var files = event.target.files;
      var filename = files[0].name;
      this.videoItem.image = filename;
    }
  }

}
