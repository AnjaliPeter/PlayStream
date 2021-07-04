import { Component, OnInit } from '@angular/core';

import { ChannelsService } from '../channels.service';
import { VideosService } from '../videos.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(private channelsService:ChannelsService,private videosService:VideosService,private router:Router,private activatedRoute:ActivatedRoute) { }

  id:any;
  channel:any;
  videos:any;
  rating:any = [0,1,2,3,4,5];
  rate:any = 0;
  num:any;
  sub:any = 0;
  subscribers:any;
  subscribed:boolean = false;
  rated:boolean = false;
  remove:any;

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

      if(this.id == localStorage.getItem("userid"))
      {
        $("#subscribe-btn").hide();
        $("#rate-btn").hide();
      }

      this.channelsService.getOneChannel(this.id)
        .subscribe(data =>
        {
          this.channel = data;
          console.log(this.channel);
          this.subscribers = this.channel.subscribers;

          this.videosService.getOneChannel(this.channel.channel)
          .subscribe(data =>
          {
            this.videos = data;
            console.log(this.videos);

            $(document).ready(function(){
              $(".trend-decor").slice(0,8).show();
              $("#loadmore-btn").on("click", function(e){
                e.preventDefault();
                $(".trend-decor:hidden").slice(0, 8).slideDown();
                if($(".trend-decor:hidden").length == 0) {
                  $("#loadmore-btn").text("No more videos available !").addClass("noContent");
                }
              });
            });

          });
         
        });
      });

  }

  removeAlert(id:any){
    Swal.fire({
      title: 'Remove channel',
      text: "Are you sure you want to remove this channel and it's videos ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // remove
        this.channelsService.removeChannel(id)
        .subscribe(data => 
        {
          // channel removed
          this.videosService.removeVideos(this.channel.channel)  
          .subscribe(data =>
          {
            // videos removed
          });        
        });
        Swal.fire(
          'Removed!',
          'Channel has been removed from PlayStream !!!',
          'success'
        ).then(() => {
          this.router.navigate(["/home/channels/sort/AllChannels"]);
        });
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // cancel
      }
    });
  }

  removeChannel(id:any){
    this.removeAlert(id);
  }

  rateChannel(){
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
      this.rated = true;
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

  subscribeChannel(id:any){
    this.sub ++;
    this.num = this.channel.subscribers ++;
    this.channelsService.updateChannel(id,this.num)
    .subscribe(data =>
    {
      this.channel = data;
      console.log(this.channel);
    });
    if(this.sub == 2)
    {
      this.subscribers ++;
      this.subscribed = true;
      Swal.fire(
        'Subscribed',
        'Hope you will really like this channel !!!',
        'success'
      ).then(() => {
        // subscribe
      });
    }
    
  }

}
