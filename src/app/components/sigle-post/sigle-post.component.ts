import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/models';
import { Input } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { CreateCommentCommand } from 'src/app/services/models';

@Component({
  selector: 'app-sigle-post',
  templateUrl: './sigle-post.component.html',
  styleUrls: ['./sigle-post.component.css']
})
export class SiglePostComponent implements OnInit {

  @Input() post?:Post;

  newAuthor: string = ""
  newContent: string = ""

  constructor(private requests: RequestsService) { }

  ngOnInit(): void {
  }

  submitComment(){
    const newCommand: CreateCommentCommand = {
      postId: this.post?.aggregateId,
      commentId: Math.floor(Math.random()* 100000).toString(),
      author: this.newAuthor,
      content: this.newContent
    }

    this.requests.createCommentAction(newCommand).subscribe();

    this.newAuthor = ""

    this.newContent = ""
  }



}
