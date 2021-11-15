import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import {ErrorComponent} from './error/error.component'
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private dialog:MatDialog){}
  //This interface has a method which takes two arguments. First one is the request you are intercepting. Second argument is next which allows us to continue execution after the interceptor is finished
  intercept(req:HttpRequest<any>,next:HttpHandler){
   //Handle gives response observable stream
    return next.handle(req).pipe(
      //This Operator allows us to handle error in the stream
      catchError((error:HttpErrorResponse)=>{
        let errorMessage='An Unknown Error Occurred!!';
        if(error.error.message){
          errorMessage=error.error.error.message
        }
        this.dialog.open(ErrorComponent,{data:{message:errorMessage}})
        return throwError(error);
      })
    );
  }
}
