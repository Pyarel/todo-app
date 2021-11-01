import { Component } from "@angular/core";
import {AuthService} from '../auth.service';
import {AuthData} from '../auth-data.model';
import { NgForm } from "@angular/forms";

@Component({
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']
})
export class SignUpComponent{
    isLoading=false;
    constructor(private auth:AuthService){}

    onSignUp(form:NgForm){
        if(form.invalid){
            return;
        }
        this.auth.signup(form.value.email,form.value.password);
    }
}