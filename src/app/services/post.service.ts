import { Injectable } from '@angular/core';

import { from, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import{ map } from 'rxjs/operators';

import { Post } from '../posts/post.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


const BACKEND_URL=environment.apiUrl+'/posts/'
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts:Post[]=[];
  private postCreated=new Subject<{posts:Post[],maxCount:number}>();

  constructor(private http:HttpClient, private route:Router) { }

  getPosts(pageSize:number,currentPage:number){
    const queryParams=`?pagesize=${pageSize}&page=${currentPage}`;
    this.http.get<{message:string, posts:any,maxCount:number}>(BACKEND_URL+queryParams)
    .pipe(map((postData) => {
      return {
        posts:postData.posts.map((post:any) =>{
        return {
          title:post.title,
          content:post.content,
          id:post._id,
          imagePath:post.imagePath,
          creator:post.creator
        }
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
    return  this.http.get<{_id:string,title:string,content:string,imagePath:string,creator:string}>(BACKEND_URL+id);
  }

  updatePosts(id:string,title:string,content:string,image:File|string){

    let postData:Post|FormData
     //Check if we have an image or a string
    if (typeof(image)=='object'){
      //If it is an object we create a FormData Object
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
        imagePath:image,
        creator:null
      };
    }
    this.http.put(BACKEND_URL+id,postData).subscribe((response)=>{
        // const updatedPosts=[...this.posts];
        // const oldPostIndex=updatedPosts.findIndex(p=> p.id==id);
        // const post:Post={
        //   id:id,
        //   title:title,
        //   content:content,
        //   imagePath:response.imagePath
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
    //We use the FormData object by appending values to it
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image)
    this.http.post<{message:string,post:Post}>(BACKEND_URL,postData)
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
    return this.http.delete(BACKEND_URL+postId);
  //   .subscribe(res =>{
  //     const updatedPosts=this.posts.filter(post => post.id !== postId);
  //     this.posts=updatedPosts;
  //     this.postCreated.next([...this.posts]);
  //   })
  }

}
