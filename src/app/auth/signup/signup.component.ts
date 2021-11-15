import { Component, OnDestroy, OnInit } from "@angular/core";
import {AuthService} from '../auth.service';
import {AuthData} from '../auth-data.model';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']
})
export class SignUpComponent implements OnInit,OnDestroy{
    isLoading=false;
    private authSubs:Subscription;
    constructor(private auth:AuthService,private router:Router){}

    onSignUp(form:NgForm){
        if(form.invalid){
            return;
        }
        this.isLoading=true;
        this.auth.createUser(form.value.email,form.value.password);
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
