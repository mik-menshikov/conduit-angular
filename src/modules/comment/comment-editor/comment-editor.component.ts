import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from 'src/modules/api/interfaces';

@Component({
  selector: 'comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
})
export class CommentEditorComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() submitComment = new EventEmitter<string>();

  @Input() reset$: Subject<boolean>;

  ngOnInit(): void {
    this.reset$.subscribe(() => this.commentForm.setValue({ body: '' }));
  }

  commentForm = this.fb.group({
    body: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.submitComment.emit(this.commentForm.value.body);
  }

  ngOnDestroy(): void {
    // this.reset$.unsubscribe();
  }
}
