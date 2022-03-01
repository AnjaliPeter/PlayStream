import { Component, OnInit } from '@angular/core';

import { VideosService } from '../videos.service';
import { ChannelsService } from '../channels.service';
import { Router,ActivatedRoute } from '@angular/router';

import * as $ from "jquery";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private channelsService:ChannelsService,private videosService:VideosService,private activatedRoute:ActivatedRoute) { }

  videos:any;
  rating:any = [0,1,2,3,4,5];

  ngOnInit(): void {

    this.videosService.getVideos()
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
   
  }


  // channels
  imageChannels = [
    {
      image: '../../assets/images/logos/homecooking.jpg',
      thumbImage: '../../assets/images/logos/homecooking.jpg',
      // title: 'Channel1'
    },
    {
      image: '../../assets/images/logos/abcschool.jpg',
      thumbImage: '../../assets/images/logos/abcschool.jpg',
    },
    {
      image: '../../assets/images/logos/centralcinema.jpg',
      thumbImage: '../../assets/images/logos/centralcinema.jpg',
    },
    {
      image: '../../assets/images/logos/happylife.jpg',
      thumbImage: '../../assets/images/logos/happylife.jpg',
    },
    {
      image: '../../assets/images/logos/lovetolearn.jpg',
      thumbImage: '../../assets/images/logos/lovetolearn.jpg',
    },
    {
      image: '../../assets/images/logos/humourhive.png',
      thumbImage: '../../assets/images/logos/humourhive.png',
    },
    {
      image: '../../assets/images/logos/proplayer.jpg',
      thumbImage: '../../assets/images/logos/proplayer.jpg',
    },
    {
      image: '../../assets/images/logos/amrecords.png',
      thumbImage: '../../assets/images/logos/amrecords.png',
    },
    {
      image: '../../assets/images/logos/craftstudio.jpg',
      thumbImage: '../../assets/images/logos/craftstudio.jpg',
    },
    {
      image: '../../assets/images/logos/talkshow.jpg',
      thumbImage: '../../assets/images/logos/talkshow.jpg',
    },
    {
      image: '../../assets/images/logos/curryhouse.jpg',
      thumbImage: '../../assets/images/logos/curryhouse.jpg',
    },
    {
      image: '../../assets/images/logos/tastycomedy.png',
      thumbImage: '../../assets/images/logos/tastycomedy.png',
    },
    {
      image: '../../assets/images/logos/lonespark.jpg',
      thumbImage: '../../assets/images/logos/lonespark.jpg',
    },
    {
      image: '../../assets/images/logos/mycreativebox.png',
      thumbImage: '../../assets/images/logos/mycreativebox.png',
    },
    {
      image: '../../assets/images/logos/victorygames.jpg',
      thumbImage: '../../assets/images/logos/victorygames.jpg',
    },
    {
      image: '../../assets/images/logos/worldcareertalk.jpeg',
      thumbImage: '../../assets/images/logos/worldcareertalk.jpeg',
    },
    {
      image: '../../assets/images/logos/littlepicasso.jpg',
      thumbImage: '../../assets/images/logos/littlepicasso.jpg',
    }
  ];

  

}
