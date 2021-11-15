import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AngularMaterialModule } from './angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { PostsModule } from './posts/posts.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule


  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true },
  {provide: HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true }],
  bootstrap: [AppComponent],
  //Tell Angular that we will eventually use the component.(As this component is not provided in routes or the selector is not used within another component)
  entryComponents:[ErrorComponent]
})
export class AppModule { }
