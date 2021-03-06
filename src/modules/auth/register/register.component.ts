import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { register, resetError } from 'src/modules/auth/+state/auth.actions';
import { AuthSelectors } from 'src/modules/auth/+state/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  error$: Observable<any>;

  constructor(private fb: FormBuilder, private store: Store) {}

  register() {
    this.store.dispatch(register({ user: this.registerForm.value }));
  }

  ngOnInit(): void {
    this.error$ = this.store.select(AuthSelectors.getError);
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetError());
  }
}
