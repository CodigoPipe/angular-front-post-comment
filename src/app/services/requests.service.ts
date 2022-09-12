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
    return this.client.get<Post[]>("http://localhost:8081/bring/all/posts")
  }

  createPostAction(command:CreatePostCommand): Observable<Object>{
    return this.client.post("http://localhost:8080/create/post", command, this.httpOptions)
  }

  createCommentAction(command:CreateCommentCommand): Observable<Object>{
    return this.client.post("http://localhost:8080/add/comment", command, this.httpOptions)
  }


}
