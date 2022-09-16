import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/models';
import { Input } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { CreateCommentCommand } from 'src/app/services/models';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigle-post',
  templateUrl: './sigle-post.component.html',
  styleUrls: ['./sigle-post.component.css']
})
export class SiglePostComponent implements OnInit {

  @Input() post?:Post;

  newAuthor: string = ""
  newContent: string = ""

  constructor(private requests: RequestsService, private state:StateService, private router:Router) { }

  ngOnInit(): void {
    this.validateLogin()
  }

  validateLogin():boolean{
    let validationResult = false;
    this.state.state.subscribe(currentState =>
      {
    
        this.availableState = currentState;
        if(!currentState.logedIn){
    
          this.router.navigateByUrl('')
          validationResult = false;
          return
        }
        validationResult = true;
      })
    
    return validationResult;
    
      }

  availableState:any 

  submitComment(){
    const newCommand: CreateCommentCommand = {
      postId: this.post?.aggregateId,
      commentId: Math.floor(Math.random()* 100000).toString(),
      author: this.newAuthor,
      content: this.newContent
    }

    this.requests.createCommentAction(newCommand,this.availableState.token).subscribe();

    this.newAuthor = ""

    this.newContent = ""
  }



}
