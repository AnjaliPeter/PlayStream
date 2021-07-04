import { Component, OnInit } from '@angular/core';

import { ChannelModel } from './channel.model';
import { Router } from '@angular/router';
import { ChannelsService } from '../channels.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private channelsService:ChannelsService,private router:Router) { }

  channelItem = new ChannelModel("","","","Education","","","",0,"","",0,0);

  ngOnInit(): void {
  }

  channelObj:any;

  addChannel()
  {
    this.signupAlert();
  }

  signupAlert(){
    Swal.fire({
      title: 'Create Channel !',
      text: "Are you sure you want to create a PlayStream channel ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // go to SignIn
        this.channelsService.newChannel(this.channelItem)
        .subscribe(data => {
          this.channelObj = data;
          // alert(this.channelObj);
        });
        Swal.fire(
          'Channel Created !',
          'Your channel has been created in PlayStream !!!',
          'success'
        ).then(() => {
          this.router.navigate(["/"]);
        });
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // cancel SignIn
        this.channelItem.firstname = "";
        this.channelItem.lastname = "";
        this.channelItem.channel = "";
        this.channelItem.category = "Education";
        this.channelItem.image = "";
        this.channelItem.description = "";
        this.channelItem.country = "";
        this.channelItem.phoneno = 0;
        this.channelItem.email = "";
        this.channelItem.password = "";
        this.channelItem.rating = 0;
        this.channelItem.subscribers = 0;
      }
    });
  }

  selected(event:any){
    if(event.target.files != null)
    {
      var files = event.target.files;
      var filename = files[0].name;
      this.channelItem.image = filename;
    }
  }

}
