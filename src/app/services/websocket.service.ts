import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { Post, CommentType } from './models';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  getPostBySocket():WebSocketSubject<Post>{

    return webSocket('WSS://warm-basin-77432.herokuapp.com//retrieve/mainSpace')

  }

  getCommentBySocket(postId:string|undefined):WebSocketSubject<CommentType>{

    return webSocket(`WSS://warm-basin-77432.herokuapp.com///retrieve//${postId}`)

  }



}
