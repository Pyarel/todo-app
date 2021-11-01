import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
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
  currentPage=1;
  pageSizeOptions=[1,2,5,10,15];
  constructor(private postService:PostService) { }

  onDelete(postId:string){
    this.isLoading=true;
    this.postService.deletePosts(postId).subscribe(res=>{
      this.postService.getPosts(this.postsPerPage,this.currentPage);
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
    this.postSub=this.postService.getPostsListener().subscribe((postData:{posts:Post[],maxCount:number})=>{
       this.isLoading=false;
       this.totalPosts=postData.maxCount;
       this.posts=postData.posts;
    })
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
