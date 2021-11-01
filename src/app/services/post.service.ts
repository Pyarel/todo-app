import { Injectable } from '@angular/core';

import { from, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import{ map } from 'rxjs/operators';

import { Post } from '../posts/post.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts:Post[]=[];
  private postCreated=new Subject<{posts:Post[],maxCount:number}>();
  constructor(private http:HttpClient, private route:Router) { }

  getPosts(pageSize:number,currentPage:number){
    const queryParams=`?pagesize=${pageSize}&page=${currentPage}`;
    this.http.get<{message:string, posts:any,maxCount:number}>('http://localhost:3000/api/posts'+queryParams)
    .pipe(map((postData) => {
      return {
        posts:postData.posts.map((post:any) =>{
        return {
          title:post.title,
          content:post.content,
          id:post._id,
          imagePath:post.imagePath
        };
      })
      ,maxCount:postData.maxCount
      }
    }))
    .subscribe(transformedPostData => {
      this.posts=transformedPostData.posts;
      this.postCreated.next({posts:[...this.posts],maxCount:transformedPostData.maxCount});
    })
  }
  getPostsListener(){
    return this.postCreated.asObservable();
  }
  getPost(id:string){
    return  this.http.get<{_id:string,title:string,content:string,imagePath:string}>('http://localhost:3000/api/posts/'+id);
  }
  updatePosts(id:string,title:string,content:string,image:File|string){
    let postData:Post|FormData
    if (typeof(image)=='object'){
      postData=new FormData();
      postData.append("id",id);
      postData.append("title",title);
      postData.append("content",content);
      postData.append("image",image,title);
    }
    else{
    postData={
        id:id,
        title:title,
        content:content,
        imagePath:image
      };
    }
    this.http.put('http://localhost:3000/api/posts/'+id,postData).subscribe((response)=>{
        // const updatedPosts=[...this.posts];
        // const oldPostIndex=updatedPosts.findIndex(p=> p.id==id);
        // const post:Post={
        //   id:id,
        //   title:title,
        //   content:content,
        //   imagePath:""
        // }
        // updatedPosts[oldPostIndex]=post;
        // this.posts=updatedPosts;
        // this.postCreated.next([...this.posts]);
        this.route.navigate(['/']);
    })
  }
  addPosts(title:string,content:string,image:File){
    // const post:Post={
    //   id:null,
    //   title:title,
    //   content:content
    // }
    const postData=new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image)
    this.http.post<{message:string,post:Post}>('http://localhost:3000/api/posts',postData)
    .subscribe((responseData)=>{
      // const post:Post={
      //   id:responseData.post.id,
      //   title:title,
      //   content:content,
      //   imagePath:responseData.post.imagePath
      // }
      //   // const postId=responseData.postId;
      //   // post.id=postId;
      //   this.posts.push(post);
      //   this.postCreated.next([...this.posts]);
        this.route.navigate(['/']);
    })
    
  }
  deletePosts(postId:string){
    return this.http.delete('http://localhost:3000/api/posts/'+postId);
  //   .subscribe(res =>{
  //     const updatedPosts=this.posts.filter(post => post.id !== postId);
  //     this.posts=updatedPosts;
  //     this.postCreated.next([...this.posts]);
  //   })
  }
}
