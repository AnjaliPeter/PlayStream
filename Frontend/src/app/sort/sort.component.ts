import { Component, OnInit } from '@angular/core';

import { ChannelsService } from '../channels.service';
import { Router,ActivatedRoute } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  constructor(private channelsService:ChannelsService,private activatedRoute:ActivatedRoute) { }

  channels:any;
  channelid:any;
  item:any;
  rating:any = [0,1,2,3,4,5];

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => { 

      this.item = params.get("item");

      if(this.item == "AllChannels")
      {
        this.channelsService.getChannels()
        .subscribe(data =>
        {
          this.channels = data;
          console.log(this.channels);

        });
      }
      else
      {
        this.channelsService.sortChannels(this.item)
        .subscribe(data => 
        {
          this.channels = data;
          console.log(this.channels);

        });
      }
    
    });
    

  }

}
