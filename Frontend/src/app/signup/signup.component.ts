import { Component, OnInit } from '@angular/core';

import { ChannelModel } from './channel.model';
import { Router } from '@angular/router';
import { ChannelsService } from '../channels.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Reactive form
  reactiveForm:FormGroup

  constructor(private channelsService:ChannelsService,private router:Router) { }

  channelItem = new ChannelModel("","","","Education",null,"","",0,"","",0,0);

  ngOnInit(): void {

    this.reactiveForm = new FormGroup({
      firstname : new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]{5,}$')]),
      lastname : new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]{5,}$')]),
      channel : new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z0-9, ]{5,15}$')]),
      category: new FormControl(null,[Validators.required]),
      image : new FormControl(null,[Validators.required]),
      description : new FormControl(null,[Validators.required]),
      country : new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]{1,}$')]),
      phoneno : new FormControl(null,[Validators.required,Validators.pattern('^[0-9]{10,10}$')]),
      email : new FormControl(null,[Validators.required,Validators.pattern('^[a-z 0-9 , %+]+@[a-z 0-9 .-]+\.[a-z]{2,4}$')]),
      password : new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z0-9,@$#&*]{6,15}$')])
    });

  }

  channelObj:any;

  addChannel()
  {
    if(this.reactiveForm.status == "VALID")
    {
      this.signupAlert();
    }
    else
    {
      this.reactiveForm.get('firstname')?.markAsTouched();
      this.reactiveForm.get('lastname')?.markAsTouched();
      this.reactiveForm.get('channel')?.markAsTouched();
      this.reactiveForm.get('category')?.markAsTouched();
      this.reactiveForm.get('image')?.markAsTouched();
      this.reactiveForm.get('description')?.markAsTouched();
      this.reactiveForm.get('country')?.markAsTouched();
      this.reactiveForm.get('phoneno')?.markAsTouched();
      this.reactiveForm.get('email')?.markAsTouched();
      this.reactiveForm.get('password')?.markAsTouched();
    }
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

  // selected(event:any){
  //   if(event.target.files != null)
  //   {
  //     var files:FileList = event.target.files;
  //     var file:File = files[0];
  //     var myReader:FileReader = new FileReader();

  //     myReader.onloadend = (e) =>{
  //       this.channelItem.image = myReader.result;
  //     }

  //     myReader.readAsDataURL(file);
  //     // convert to base64 ends
  //   }

  // }

  // afuConfig = {
  //   uploadAPI: {
  //     url: "http://localhost:9999/channels/addchannel"
  //   }
  // };

  selected(event:any){
    if(event.target.files != null)
    {
      var files = event.target.files;
      var filename = files[0].name;
      this.channelItem.image = filename;
    }
  }

}
