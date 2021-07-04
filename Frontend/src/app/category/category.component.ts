import { Component, OnInit } from '@angular/core';

import { VideosService } from '../videos.service';
import { Router,ActivatedRoute } from '@angular/router';

import * as $ from "jquery";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private videosService:VideosService,private activatedRoute:ActivatedRoute) { }

  videos:any;
  category:any;
  rating:any = [0,1,2,3,4,5];

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => { 

      this.category = params.get("category");

      if(this.category == "AllCategories")
      {
        this.videosService.getVideos()
        .subscribe(data =>
        {
          this.videos = data;
          console.log(this.videos);

        });
      }

      else
      {
        this.videosService.getOneCategory(this.category)
        .subscribe(data =>
        {
          this.videos = data;
          console.log(this.videos);

        });
      }

    });

  }

}
