import { Component, OnInit } from '@angular/core';

import { VideosService } from '../videos.service';
import { ChannelsService } from '../channels.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import * as $ from "jquery";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(private channelsService:ChannelsService,private videosService:VideosService,private router:Router,private activatedRoute:ActivatedRoute) { }

  id:any;
  video:any;
  videos:any;
  channel:any;
  rating:any = [0,1,2,3,4,5];
  item:any;
  num:any;
  rate:any = 0;
  like:any = 0;
  dislike:any = 0;
  inlike:any;
  indislike:any;
 
  ngOnInit(): void {

    if(localStorage.getItem("userid") == "admin@PlayStream")
    {
      $("#remove-btn").show();
    }
    else
    {
      $("#remove-btn").hide();
    }

    this.activatedRoute.paramMap.subscribe(params => { 

      this.id = params.get("id");

      this.videosService.getOneVideo(this.id)
        .subscribe(data =>
        {
          this.video = data;
          console.log(this.video);
          this.inlike = this.video.likes;
          this.indislike = this.video.dislike;

          this.channelsService.getChannelpic(this.video.channel)
          .subscribe(data =>
          {
            this.channel = data;
            console.log(this.channel);
          });

          this.videosService.getRelated(this.video.category,this.video._id)
          .subscribe(data =>
          {
            this.videos = data;
            console.log(this.videos);

          });
         
        });
      });
  }

  removeAlert(id:any){
    Swal.fire({
      title: 'Remove video',
      text: 'Are you sure you want to remove this video ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // remove
        this.videosService.removeVideo(id)
        .subscribe(data => 
        {
          // video removed
        });
        Swal.fire(
          'Removed!',
          'Video has been removed from PlayStream !!!',
          'success'
        ).then(() => {
          this.router.navigate(["/home/videos/category/AllCategories"]);
        });
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // cancel
      }
    });
  }

  removeVideo(id:any){
    this.removeAlert(id);
  }

  updateLikes(id:any){
    this.like ++;
    this.item = "likes";
    this.num = this.video.likes ++;
    this.videosService.updateVideo(id,this.item,this.num)
    .subscribe(data =>
    {
      this.video = data;
      console.log(this.video);
    });
    if(this.like == 2)
    {
      this.inlike ++;
      Swal.fire(
        'Liked',
        'Hope you really enjoyed this video !!!',
        'success'
      ).then(() => {
        // like
      });
      $(".like").attr("disabled");
    }
  }

  updateDislikes(id:any){
    this.dislike ++;
    this.item = "dislikes";
    this.num = this.video.dislike ++;
    this.videosService.updateVideo(id,this.item,this.num)
    .subscribe(data =>
    {
      this.video = data;
      console.log(this.video);
    });
    if(this.dislike == 2)
    {
      this.indislike ++;
      Swal.fire(
        'Disliked',
        "Oops, please comment why you didn't like this video !!!",
        'info'
      ).then(() => {
        // dislike
      });
    }
  }

  rateVideo(){
    this.rate ++;
    if(this.rate <= 5)
    {
      Swal.fire(
        this.rate+' star Rating',
        'Click again to update the rating !!!',
        'success'
      ).then(() => {
        // rate
      });
    }
    else
    {
      this.rate --;
      Swal.fire(
        this.rate+' star Rating',
        'You have already given the rating !!!',
        'info'
      ).then(() => {
        // rate
      });
    }
   
  }

 
}
