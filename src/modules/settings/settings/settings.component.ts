import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { delay, pluck, takeUntil } from 'rxjs/operators';
import { User } from 'src/modules/api/interfaces';
import { AuthSelectors } from 'src/modules/auth/+state/auth.selectors';
import { updateUser } from 'src/modules/settings/+state/settings.actions';
import {
  RequestStatus,
  selectStatus,
} from 'src/modules/settings/+state/settings.reducer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  reqStatus$: Observable<RequestStatus>;

  settingsForm = this.fb.group({
    image: [''],
    username: [''],
    bio: [''],
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.reqStatus$ = this.store.select(selectStatus);

    this.store
      .select(AuthSelectors.getUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.settingsForm.setValue({
            image: user.image,
            bio: user.bio,
            email: user.email,
            username: user.username,
            password: '',
          });
        }
      });
  }

  submit() {
    this.store.dispatch(updateUser({ user: this.settingsForm.value }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
