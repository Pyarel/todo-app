import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

//We add the decorator to inject the service into the service.
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService:AuthService){}
  //This interface has a method which takes two arguments. First one is the request you are intercepting. Second argument is next which allows us to continue execution after the interceptor is finished
  intercept(req:HttpRequest<any>,next:HttpHandler){
    const authToken=this.authService.getToken();
    //clone the request before manipulating it and pass a configuration to it
    const authRequest=req.clone({
      //Edit the headers and add a new header property
      headers:req.headers.set("Authorization","Bearer "+authToken)
    });
    //Allow the req to continue
    return next.handle(authRequest);
  }
}
