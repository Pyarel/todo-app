import { Component,OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Post It App';
  constructor(private authService:AuthService){}
  //postStored:Post[]=[];

  /*
  onPostEmitted(post:Post){
    this.postStored.push(post);
  }
  */
 ngOnInit(){
  this.authService.autoAuthUser();
 }
}
