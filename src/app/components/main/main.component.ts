import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { WebSocketSubject } from 'rxjs/webSocket';


import {Post} from "../../services/models"
import { CreatePostCommand } from '../../services/models';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts?: Post[];
  newTitle:string = "";
  newAuthor:string = "";
  socketManager?:WebSocketSubject<Post>

  constructor(private requests: RequestsService, private webSocket: WebsocketService, private state:StateService,
    private router:Router) { }


  ngOnInit(): void {
    

    if(this.validateLogin()){
      this.bringPosts()
      this.getPostFromSocket()
    }

  }


  bringPosts(){
    this.requests.bringAllPost().subscribe(posts =>
      {
        this.posts = posts;
      })
    }

    submitPost(){
      const newCommand: CreatePostCommand = {
        postId: Math.floor(Math.random()* 100000).toString(),
        author: this.newAuthor,
        title: this.newTitle
      }

      this.requests.createPostAction(newCommand,this.availableState.token).subscribe();

      this.newTitle = ""

      this.newAuthor = ""
    }

    getPostFromSocket(){
      this.socketManager = this.webSocket.getPostBySocket()
      this.socketManager.subscribe( post => {
        this.posts?.unshift(post)
      })
    }

    closeSocket(){
      this.socketManager?.complete()
    }

    availableState:any 

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



  

}
