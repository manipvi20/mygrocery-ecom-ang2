import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}    from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { WrapperComponent } from './wrapper.component';
import { HeaderComponent } from './header.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { FooterComponent } from './footer.component';
import { ConentComponent } from './content.component';
import { InnerBannerComponent } from './innerpage-banner.component';
import { SpecialComponent } from './special-prod.component';
import { SppComponent } from './spp.component';
import { MppComponent } from './mpp.component';
import { PageNotFoundComponent } from './pagenotfound.component';

//routing Module 
import { appRouterModule } from './app.routing';

//services modules 
import { ProductSerivces } from "./app.services";
import { UserService } from './app.services';
import { DataService } from './share-service';

@NgModule({
  imports: [
      BrowserModule,
      HttpModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      appRouterModule
    ],
  declarations: [
      AppComponent,
      PageNotFoundComponent,
      WrapperComponent,
      HeaderComponent,
      InnerBannerComponent,
      FooterComponent,
      ConentComponent,
      LoginComponent,
      RegisterComponent,
      SppComponent,
      MppComponent,
      SpecialComponent,
    ],
  providers: [ProductSerivces, UserService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
