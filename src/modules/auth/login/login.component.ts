import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from 'src/modules/auth/+state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  login() {
    this.store.dispatch(login({ data: { user: this.loginForm.value } }));
  }

  ngOnInit(): void {}
}
