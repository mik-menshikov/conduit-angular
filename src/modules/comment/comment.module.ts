import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { CommentEditorComponent } from 'src/modules/comment/comment-editor/comment-editor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentComponent, CommentEditorComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommentComponent, CommentEditorComponent],
})
export class CommentModule {}
