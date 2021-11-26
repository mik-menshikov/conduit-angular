import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { User } from 'src/modules/api/interfaces';
import { getUser } from 'src/modules/auth/+state/auth.actions';
import { AuthSelectors } from 'src/modules/auth/+state/auth.selectors';
import { TokenPersistenceService } from 'src/modules/auth/token-persistence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'conduit';

  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store,
    private tokenService: TokenPersistenceService
  ) {}

  ngOnInit(): void {
    this.tokenService
      .get()
      .pipe(
        take(1),
        filter((token) => !!token)
      )
      .subscribe({
        next: () => this.store.dispatch(getUser()),
      });

    this.user$ = this.store.select(AuthSelectors.getUser);
    this.isLoggedIn$ = this.store.select(AuthSelectors.isLoggedIn);
  }
}
