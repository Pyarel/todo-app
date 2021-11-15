import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../angular-material.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./signup/signup.component";

@NgModule({
  imports:[
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations:[
    LoginComponent,
    SignUpComponent
  ]
})
export class AuthModule{

}
