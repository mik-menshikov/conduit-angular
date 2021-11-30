import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent {
  @Input() username: string;
  @Input() following: boolean;

  @Output() toggleFollow = new EventEmitter<string>();
}
