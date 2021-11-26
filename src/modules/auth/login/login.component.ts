import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, resetError } from 'src/modules/auth/+state/auth.actions';
import { AuthSelectors } from 'src/modules/auth/+state/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  error$: Observable<any>;

  constructor(private fb: FormBuilder, private store: Store) {}

  login() {
    this.store.dispatch(login({ data: { user: this.loginForm.value } }));
  }

  ngOnInit(): void {
    this.error$ = this.store.select(AuthSelectors.getError);
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetError());
  }
}
