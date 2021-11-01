import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Post It App';
  postStored:Post[]=[];

  /*
  onPostEmitted(post:Post){
    this.postStored.push(post);
  }
  */
}
