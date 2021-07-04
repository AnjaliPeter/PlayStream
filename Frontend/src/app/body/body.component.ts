import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { ChannelsService } from '../channels.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {

  constructor(private channelsService:ChannelsService,private activatedRoute:ActivatedRoute) { }

  userid:any = localStorage.getItem("userid");

  ngOnInit(): void {

    if(this.userid == "admin@PlayStream")
    {
      $("#channel-sec").hide();
      $("#admin-sec").show();
    }
    else
    {
      $("#channel-sec").show();
      $("#admin-sec").hide();
    }

  }

}
