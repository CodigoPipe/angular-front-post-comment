import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { Post, CommentType } from './models';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  getPostBySocket():WebSocketSubject<Post>{

    return webSocket('ws://localhost:8082/retrieve/mainSpace')

  }

  getCommentBySocket(postId:string|undefined):WebSocketSubject<CommentType>{

    return webSocket(`ws://localhost:8082//retrieve//${postId}`)

  }



}
