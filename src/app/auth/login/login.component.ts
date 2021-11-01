import { Component } from "@angular/core";
import {AuthService} from '../auth.service';
import {AuthData} from '../auth-data.model';
import { NgForm } from "@angular/forms";

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent{
    isLoading=false;
    constructor(private auth:AuthService){}
    onLogin(form:NgForm){
        if(form.invalid){
            return;
        }
        this.auth.login(form.value.email,form.value.password);
    }
}