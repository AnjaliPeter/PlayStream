import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { BodyComponent } from './body/body.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';
import { CategoryComponent } from './category/category.component';
import { PreviewComponent } from './preview/preview.component';
import { UploadComponent } from './upload/upload.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { RadioComponent } from './radio/radio.component';
import { ReportComponent } from './report/report.component';
import { ChannelsComponent } from './channels/channels.component';
import { SortComponent } from './sort/sort.component';
import { ChannelComponent } from './channel/channel.component';
import { AdminComponent } from './admin/admin.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path:"",component:WelcomeComponent},
  {path:"signup",component:SignupComponent},
  {path:"home",component:BodyComponent,
    children:[
      {path:"",component:HomeComponent},
      {path:"videos",component:VideosComponent,
        children:[
          {path:"category/:category",component:CategoryComponent}
        ]
      },
      {path:"video/:id",component:PreviewComponent},
      {path:"channels",component:ChannelsComponent,
        children:[
          {path:"sort/:item",component:SortComponent}
        ]
      },
      {path:"channel/:id",component:ChannelComponent},
      {path:"upload",component:UploadComponent},
      {path:"contact",component:ContactComponent},
      {path:"help",component:HelpComponent},
      {path:"radio",component:RadioComponent},
      {path:"report",component:ReportComponent},
      {path:"admin",component:AdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
