import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
//NOTE: Subscriptions for observables or Subjects managed by us, we need to call unsubscribe if the component gets destroyed.

  userIsAuthenticated=false;
  private authListenerSubs:Subscription;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated=this.auth.getIsAuth();
    this.authListenerSubs=this.auth
    .getAuthStatusListener()
    .subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
    });
  }
  onLogout(){
    this.auth.logout();
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
