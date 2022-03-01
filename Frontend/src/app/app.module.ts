import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';
import { CategoryComponent } from './category/category.component';
import { PreviewComponent } from './preview/preview.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channel/channel.component';
import { UploadComponent } from './upload/upload.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { ReportComponent } from './report/report.component';
import { RadioComponent } from './radio/radio.component';

import { VideosService } from './videos.service';
import { ChannelsService } from './channels.service';
import { SortComponent } from './sort/sort.component';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    WelcomeComponent,
    SignupComponent,
    HomeComponent,
    VideosComponent,
    CategoryComponent,
    PreviewComponent,
    ChannelsComponent,
    ChannelComponent,
    UploadComponent,
    ContactComponent,
    HelpComponent,
    ReportComponent,
    RadioComponent,
    SortComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFileUploaderModule
  ],
  providers: [VideosService,ChannelsService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
