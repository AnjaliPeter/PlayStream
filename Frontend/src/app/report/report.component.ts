import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ChannelsService } from '../channels.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private router:Router,private channelsService:ChannelsService) { }

  channel:any;

  ngOnInit(): void {

      this.channelsService.getOneChannel(localStorage.getItem("userid"))
      .subscribe(data =>
      {
        this.channel = data;
        console.log(this.channel);
        $(".channel").val(this.channel.channel);
        $(".author").val(this.channel.firstname+" "+this.channel.lastname);
      });
  }

  report()
  {
    if($("input[type=checkbox]").is(":checked"))
    {
      this.reportAlert();
    }
    else
    {
      Swal.fire(
        'Declaration',
        'Please check this box if you want to proceed !!!',
        'warning'
      ).then(() => {
        // check the box
      });
    }
  }

  reportAlert(){
    Swal.fire({
      title: 'Submit Report',
      text: 'Are you sure you want to submit this report ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // remove
        Swal.fire(
          'Submitted!',
          'Report has been uploaded to PlayStream !!!',
          'success'
        ).then(() => {
          this.router.navigate(["/home"]);
        });
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // cancel upload
        $(".field").val("");
        $(".channel").val(this.channel.channel);
        $(".author").val(this.channel.firstname+" "+this.channel.lastname);
        $("#category").val("Functional");
        $(".check").val("");
      }
    });
  }

}
