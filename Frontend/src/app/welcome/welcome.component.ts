import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ChannelsService } from '../channels.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // Reactive form
  reactiveForm:FormGroup

  constructor(private channelsService:ChannelsService,private router:Router,private authService:AuthService) { }

  channelObj:any;
  channel:any;
  email:any;
  phone:any;
  password:any;
  newpassword:any;
  userObj={
    email:"",
    password:""
  };

  ngOnInit(): void {

    this.reactiveForm = new FormGroup({
      email : new FormControl(null,[Validators.required,this.emailCheck]),
      password : new FormControl(null,[Validators.required,this.passwordCheck])
    });

  }

  emailCheck(control:AbstractControl){
    if(control.value != null)
    {
      var regexp = new RegExp('^[a-z]+[ 0-9 , %+]+@[a-z 0-9 .-]+\.[a-z]{2,4}$');
      if(regexp.test(control.value) !== true )
      {
        return{
          emailValidity:true
        }
      }
    }
    return null;
  }

  passwordCheck(control:AbstractControl){
    if(control.value != null)
    {
      var regexp = new RegExp('^[a-zA-Z0-9,@$#&*]{6,15}$');
      if(regexp.test(control.value) !== true )
      {
        return{
          passwordValidity:true
        }
      }
    }
    return null;
  }
  
  login(){
    if(this.userObj.email == "admin_playstream@gmail.com" && this.userObj.password == "Admin@PlayStream257")
    {
      this.adminAlert();
    }
    else if(this.reactiveForm.status == "VALID")
    {
      this.authService.searchChannel(this.userObj)
      .subscribe(data => {
        this.channelObj = data;
        if(this.channelObj!= null)
        {
          this.signinAlert();          
        }
        else
        {
          this.userAlert();
        }
      });
      
    }
    else
    {
      this.reactiveForm.get('email')?.markAsTouched();
      this.reactiveForm.get('password')?.markAsTouched();
    }
  }

  adminAlert(){
    Swal.fire({
      title: 'Admin SignIn !',
      text: "You have successfully signed in as PlayStream Admin !!!",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Go to Home',
      cancelButtonText: 'Cancel SignIn'
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire(
        //   'Deleted!',
        //   'Your imaginary file has been deleted.',
        //   'success'
        // )
        localStorage.setItem("userid","admin@PlayStream");
        this.router.navigate(["/home"]);
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
        this.userObj.email = "";
        this.userObj.password = "";
      }
    });
  }

  userAlert(){
    Swal.fire({
      title: 'Wrong credentials !',
      text: 'Invalid E-mail address or password, try again !',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Try Again',
      cancelButtonText: 'Sign Up'
    }).then((result) => {
      if (result.isConfirmed) {
        // try again
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // SignUp
        this.router.navigate(["/signup"]);
      }
    });
  }

  signinAlert(){
    Swal.fire({
      title: 'Successfully Signed In !',
      text: "Hai "+this.channelObj.firstname+",  Welcome to PlayStream !!!",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Go to Home',
      cancelButtonText: 'Cancel SignIn'
    }).then((result) => {
      if (result.isConfirmed) {
        // go to Home
        localStorage.setItem("userid",this.channelObj._id);
        this.router.navigate(["/home"]);
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // cancel SignIn
        this.userObj.email = "";
        this.userObj.password = "";
      }
    });
  }

  forgotpassword(){
    if(!this.email)
    {
      this.emailAlert();
    }
    else
    {
      Swal.fire({
        title: 'Forgot Password !',
        text: 'Enter the phone no. registered with '+this.email,
        input: 'text',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Find Account',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result) {
          // find account
          this.phone = result.value;
          this.authService.searchChannel(this.email)
          .subscribe(data => {
            this.channelObj = data;
            if(this.channelObj!= null)
            {
              if(this.channelObj.phoneno == this.phone)
              {
                // new password
                this.newAlert(this.channelObj);
              }
              else
              {
                this.matchAlert();
              }
            }
            else
            {
              this.emailAlert();
            }
          });
        } 
        else{
          // cancel
        }
      });
    }
   
  }

  newAlert(channel:any){
    Swal.fire({
      title: 'Found your channel !',
      text: "Hai "+channel.firstname+",  please enter your new password !!!",
      input: "text",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Reset',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result) {
        // reset
        this.newpassword = result.value;
        this.channelsService.updatePassword(this.email,this.phone,this.newpassword)
        .subscribe(data =>
        {
          this.channel = data;
          console.log(this.channel);
         
        });
        Swal.fire(
          'Successfully updated your password',
          "Kindly sign in again with this new password !!!",
          'success'
        )
      } 
      else{
        // cancel 
        this.email = "";
        this.password = "";
      }
    });
  }

  emailAlert(){
    Swal.fire(
      'Invalid E-mail',
      "Couldn't find a channel with this E-mail !!!",
      'error'
    )
  }

  matchAlert(){
    Swal.fire(
      'Invalid E-mail or phone no.',
      "E-mail and phone no. doesn't match !!!",
      'error'
    )
  }
  

  // movies object
  imageMovies = [
    {
      image: '../../assets/images/adpics/avengers.jpg',
      thumbImage: '../../assets/images/adpics/avengers.jpg',
      // title: 'Avengers'
    },
    {
      image: '../../assets/images/adpics/bahubali.jpg',
      thumbImage: '../../assets/images/adpics/bahubali.jpg',
    },
    {
      image: '../../assets/images/adpics/chanakya.jpg',
      thumbImage: '../../assets/images/adpics/chanakya.jpg',
    },
    {
      image: '../../assets/images/adpics/dangal.jpg',
      thumbImage: '../../assets/images/adpics/dangal.jpg',
    },
    {
      image: '../../assets/images/adpics/dheera.jpg',
      thumbImage: '../../assets/images/adpics/dheera.jpg',
    },
    {
      image: '../../assets/images/adpics/frozen.jpeg',
      thumbImage: '../../assets/images/adpics/frozen.jpeg',
    },
    {
      image: '../../assets/images/adpics/ironman.jpg',
      thumbImage: '../../assets/images/adpics/ironman.jpg',
    },
    {
      image: '../../assets/images/adpics/jilla.jpg',
      thumbImage: '../../assets/images/adpics/jilla.jpg',
    },
    {
      image: '../../assets/images/adpics/kaduva.jpeg',
      thumbImage: '../../assets/images/adpics/kaduva.jpeg',
    },
    {
      image: '../../assets/images/adpics/mikhael.jpg',
      thumbImage: '../../assets/images/adpics/mikhael.jpg',
    },
    {
      image: '../../assets/images/adpics/parava.jpg',
      thumbImage: '../../assets/images/adpics/parava.jpg',
    },
    {
      image: '../../assets/images/adpics/princess.jpg',
      thumbImage: '../../assets/images/adpics/princess.jpg',
    },
    {
      image: '../../assets/images/adpics/ratsasan.jpg',
      thumbImage: '../../assets/images/adpics/ratsasan.jpg',
    },
    {
      image: '../../assets/images/adpics/sherman.jpg',
      thumbImage: '../../assets/images/adpics/sherman.jpg',
    },
    {
      image: '../../assets/images/adpics/surarai.jpeg',
      thumbImage: '../../assets/images/adpics/surarai.jpeg',
    },
    {
      image: '../../assets/images/adpics/vinglish.jpg',
      thumbImage: '../../assets/images/adpics/vinglish.jpg',
    },
  ];

  // trending object
  imageTrends = [
    {
      image: '../../assets/images/adpics/bts.jpg',
      thumbImage: '../../assets/images/adpics/bts.jpg',
      // title: 'BTS'
    },
    {
      image: '../../assets/images/adpics/animal.jpg',
      thumbImage: '../../assets/images/adpics/animal.jpg',
    },
    {
      image: '../../assets/images/adpics/dance1.jpg',
      thumbImage: '../../assets/images/adpics/dance1.jpg',
    },
    {
      image: '../../assets/images/adpics/dance2.jpg',
      thumbImage: '../../assets/images/adpics/dance2.jpg',
    },
    {
      image: '../../assets/images/adpics/dress.jpg',
      thumbImage: '../../assets/images/adpics/dress.jpg',
    },
    {
      image: '../../assets/images/adpics/funny1.jpg',
      thumbImage: '../../assets/images/adpics/funny1.jpg',
    },
    {
      image: '../../assets/images/adpics/interview1.png',
      thumbImage: '../../assets/images/adpics/interview1.png',
    },
    {
      image: '../../assets/images/adpics/sports2.jpg',
      thumbImage: '../../assets/images/adpics/sports2.jpg',
    },
    {
      image: '../../assets/images/adpics/status1.jpg',
      thumbImage: '../../assets/images/adpics/status1.jpg',
    },
    {
      image: '../../assets/images/adpics/interview3.jpg',
      thumbImage: '../../assets/images/adpics/interview3.jpg',
    },
    {
      image: '../../assets/images/adpics/status2.jpg',
      thumbImage: '../../assets/images/adpics/status2.jpg',
    },
    {
      image: '../../assets/images/adpics/interview2.jpg',
      thumbImage: '../../assets/images/adpics/interview2.jpg',
    },
  ];

  // news object
  imageNews = [
    {
      image: '../../assets/images/adpics/news1.jpeg',
      thumbImage: '../../assets/images/adpics/news1.jpeg',
      // title: 'BBC'
    },
    {
      image: '../../assets/images/adpics/news2.jpg',
      thumbImage: '../../assets/images/adpics/news2.jpg',
    },
    {
      image: '../../assets/images/adpics/news3.jpg',
      thumbImage: '../../assets/images/adpics/news3.jpg',
    },
    {
      image: '../../assets/images/adpics/news4.jpg',
      thumbImage: '../../assets/images/adpics/news4.jpg',
    },
    {
      image: '../../assets/images/adpics/news5.jpg',
      thumbImage: '../../assets/images/adpics/news5.jpg',
    },
    {
      image: '../../assets/images/adpics/news6.jpg',
      thumbImage: '../../assets/images/adpics/news6.jpg',
    },
    {
      image: '../../assets/images/adpics/news7.jpg',
      thumbImage: '../../assets/images/adpics/news7.jpg',
    },
    {
      image: '../../assets/images/adpics/news8.jpg',
      thumbImage: '../../assets/images/adpics/news8.jpg',
    },
    {
      image: '../../assets/images/adpics/news9.jpg',
      thumbImage: '../../assets/images/adpics/news9.jpg',
    },
    {
      image: '../../assets/images/adpics/news10.jpg',
      thumbImage: '../../assets/images/adpics/news10.jpg',
    },
    {
      image: '../../assets/images/adpics/news11.jpg',
      thumbImage: '../../assets/images/adpics/news11.jpg',
    },
    {
      image: '../../assets/images/adpics/news12.jpg',
      thumbImage: '../../assets/images/adpics/news12.jpg',
    },
    {
      image: '../../assets/images/adpics/news13.jpg',
      thumbImage: '../../assets/images/adpics/news13.jpg',
    },
    {
      image: '../../assets/images/adpics/news14.jpg',
      thumbImage: '../../assets/images/adpics/news14.jpg',
    },
    {
      image: '../../assets/images/adpics/news15.jpg',
      thumbImage: '../../assets/images/adpics/news15.jpg',
    },
  ];
}
