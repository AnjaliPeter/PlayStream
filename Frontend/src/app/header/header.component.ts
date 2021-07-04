import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  title = "PlayStream";
  userid:any;

  alert(){
    Swal.fire({
      title: 'Please SignIn',
      text: "You must SignIn to your PlayStream channel !!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SignIn',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // clicked SignIn
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // clicked Cancel
      }
    });
  }

  videos(){
    this.userid = localStorage.getItem("userid");
    if(this.userid == null)
    {
      this.alert();
    }
    else
    {
      this.router.navigate(["home/videos/category/AllCategories"]);
    }
  }

  contact(){
    this.userid = localStorage.getItem("userid");
    if(this.userid == null)
    {
      this.alert();
    }
    else
    {
      this.router.navigate(["home/contact"]);
    }
  }

  help(){
    this.userid = localStorage.getItem("userid");
    if(this.userid == null)
    {
      this.alert();
    }
    else
    {
      this.router.navigate(["home/help"]);
    }
  }

  signOut(){
    this.userid = localStorage.getItem("userid");
    if(this.userid == null)
    {
      this.alert();
    }
    else
    {
      localStorage.removeItem("userid");
      this.router.navigate(["/"]);
    }
  }
  
}
