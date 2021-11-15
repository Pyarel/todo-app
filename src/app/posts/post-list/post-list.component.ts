import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/services/post.service';
import {Post} from '../post.model'
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
//Input handler-Angular automatically updates the data property with the DOM property's value.
// @Input() posts:Post[]=[];
  posts:Post[]=[];
  private postSub : Subscription;
  isLoading=false;
  totalPosts=0;
  postsPerPage=5;
  userId:string;
  currentPage=1;
  pageSizeOptions=[1,2,5,10,15];
  userIsAuthenticated=false;

  private authListenerSubs:Subscription;

  constructor(private postService:PostService, private auth:AuthService) { }

  onDelete(postId:string){
    this.isLoading=true;
    this.postService.deletePosts(postId).subscribe(res=>{
      this.postService.getPosts(this.postsPerPage,this.currentPage);
    },error=>{
      this.isLoading=false;
    });
  }

  onChangedPage(event:PageEvent){
    this.isLoading=true;
    this.currentPage=event.pageIndex+1;
    this.postsPerPage=event.pageSize;
    this.postService.getPosts(this.postsPerPage,this.currentPage);
  }

  ngOnInit(): void {
    this.isLoading=true;
    this.postService.getPosts(this.postsPerPage,this.currentPage);
    this.userId=this.auth.getUserId();
    this.postSub=this.postService.getPostsListener().subscribe((postData:{posts:Post[],maxCount:number})=>{
       this.isLoading=false;
       this.totalPosts=postData.maxCount;
       this.posts=postData.posts;
    })
    this.userIsAuthenticated=this.auth.getIsAuth();
    this.authListenerSubs=this.auth
    .getAuthStatusListener()
    .subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.auth.getUserId();
    });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }
}
