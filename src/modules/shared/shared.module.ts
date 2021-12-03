import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToErrorMessagePipe } from './to-error-message.pipe';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { SampleComponent } from './sample/sample.component';

@NgModule({
  declarations: [ToErrorMessagePipe, FollowButtonComponent, SampleComponent],
  exports: [ToErrorMessagePipe, FollowButtonComponent],
  imports: [CommonModule],
})
export class SharedModule {}
