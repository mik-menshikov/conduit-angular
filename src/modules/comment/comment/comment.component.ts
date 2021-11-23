import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from 'src/modules/api/interfaces';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment: Comment;
}
