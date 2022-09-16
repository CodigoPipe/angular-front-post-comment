import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
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

  createPostAction(command:CreatePostCommand, token:string): Observable<Object>{
    // return this.client.post("https://glacial-cliffs-59385.herokuapp.com/create/post", command, this.httpOptions)
    return this.client.post("http://localhost:8080/create/post", command, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })})
  }

  createCommentAction(command:CreateCommentCommand, token:string): Observable<Object>{
    // return this.client.post("https://glacial-cliffs-59385.herokuapp.com/add/comment", command, this.httpOptions)
    return this.client.post("http://localhost:8080/add/comment", command, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })})
  }

  loginAction(command:any){
    // return this.client.post<any>("https://glacial-cliffs-59385.herokuapp.com/auth/login",
    return this.client.post<any>("http://localhost:8080/auth/login",
     command, this.httpOptions).pipe(
      catchError(this.handleError<any>('login'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.log(error);
      return error
    }
   }


}
