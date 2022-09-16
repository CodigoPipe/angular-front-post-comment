import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, CreatePostCommand , CreateCommentCommand} from './models';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(  private client: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  bringAllPost(): Observable<Post[]>{
    return this.client.get<Post[]>("https://tranquil-shelf-46613.herokuapp.com/bring/all/posts")
  }

  createPostAction(command:CreatePostCommand): Observable<Object>{
    return this.client.post("https://glacial-cliffs-59385.herokuapp.com/create/post", command, this.httpOptions)
  }

  createCommentAction(command:CreateCommentCommand): Observable<Object>{
    return this.client.post("https://glacial-cliffs-59385.herokuapp.com/add/comment", command, this.httpOptions)
  }


}
