import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/modules/api/interfaces';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() user: User | null = null;
  @Input() isLoggedIn: boolean;
}
