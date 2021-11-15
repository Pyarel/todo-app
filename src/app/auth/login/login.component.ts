import { Component, OnDestroy, OnInit } from "@angular/core";
import {AuthService} from '../auth.service';
import {AuthData} from '../auth-data.model';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{
    isLoading=false;
    private authSubs:Subscription;
    constructor(private auth:AuthService){}
    onLogin(form:NgForm){
        if(form.invalid){
            return;
        }
        this.isLoading=true;
        this.auth.login(form.value.email,form.value.password);
    }

    ngOnInit(){
      this.authSubs=this.auth.getAuthStatusListener().subscribe(authListener=>{
        this.isLoading=false;
      })
    }
    ngOnDestroy(){
      this.authSubs.unsubscribe();
    }
}
