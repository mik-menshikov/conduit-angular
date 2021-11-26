import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToErrorMessagePipe } from './to-error-message.pipe';

@NgModule({
  declarations: [ToErrorMessagePipe],
  exports: [ToErrorMessagePipe],
  imports: [CommonModule],
})
export class SharedModule {}
