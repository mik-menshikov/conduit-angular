import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, User } from 'src/modules/api/interfaces';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment: Comment;
  @Input() currentUser: User | null;

  @Output() remove = new EventEmitter<number>();
}
