import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/modules/api/interfaces';

@Component({
  selector: 'comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
})
export class CommentEditorComponent {
  @Input() user: User;
  @Output() submitComment = new EventEmitter<string>();

  commentForm = this.fb.group({
    body: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(private fb: FormBuilder) {}

  reset() {
    this.commentForm.setValue({ body: '' });
  }

  onSubmit() {
    this.submitComment.emit(this.commentForm.value.body);
  }
}
