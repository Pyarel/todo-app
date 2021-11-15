import { Component, OnInit,EventEmitter,Output ,OnDestroy} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/services/post.service';
import {Post} from '../post.model';
import {mimeType} from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit , OnDestroy{
  //Event Emitter is used with the @Output directive to emit custom events synchronously or asynchronously, and register handlers for those events by subscribing to an instance.
  //@Output() postEmitter=new EventEmitter<Post>();
  private mode='create';
  private postId:any;
  public post:any;
  public isLoading=false;
  public form:FormGroup;
  imagePreview:string;

  private authListenerSubs:Subscription;
  constructor(private postService:PostService, private route:ActivatedRoute,private authService:AuthService) { }

  ngOnInit() {
    this.form=new FormGroup({
      'title':new FormControl(null,
        {validators:[Validators.required,Validators.minLength(3)]
        }),
      'content':new FormControl(null,
        {validators:[Validators.required]
        }),
        'image':new FormControl(null,
          {
            validators:[Validators.required],
            asyncValidators: [mimeType]
          })

    })
    this.route.paramMap.subscribe(paramMap =>{
      if(paramMap.has('postId')){
         this.isLoading=true;
          this.mode='edit';
          this.postId=paramMap.get('postId');
          this.postService.getPost(this.postId).subscribe(postData => {
            this.isLoading=false;
            this.post={id:postData._id, title:postData.title, content: postData.content,imagePath:postData.imagePath,creator:postData.creator}
            this.form.setValue({ title: this.post.title, content:this.post.content,image:this.post.imagePath})
          });
      }
      else{
        this.mode='create';
        this.postId=null;
      }
    })
    this.authListenerSubs=this.authService
    .getAuthStatusListener()
    .subscribe(authStatus=>{
      this.isLoading=false;
    });
  }

  onImagePicked(event:Event){

    const file=(event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader=new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result as string;
    }
    reader.readAsDataURL(file);

  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  onSave(){
    if(this.form.invalid){
      return;
    }

    /*
    const post:Post={
      title:form.value.title,
      content:form.value.content
    }
    */

     if(this.mode=='create'){
      this.postService.addPosts(this.form.value.title,this.form.value.content,this.form.value.image);
      this.isLoading=true;
    }
    else{
      this.postService.updatePosts(this.postId,this.form.value.title,this.form.value.content,this.form.value.image);
      this.isLoading=true;
    }

    this.form.reset();


    //this.postEmitter.emit(post);
  }

}
