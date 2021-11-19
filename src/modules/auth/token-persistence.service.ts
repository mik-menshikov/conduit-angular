import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const key = 'token';

@Injectable()
export class TokenPersistenceService {
  get() {
    const token = localStorage.getItem(key);
    return of(token);
  }

  set(token: string) {
    localStorage.setItem(key, token);
  }

  remove() {
    localStorage.removeItem(key);
  }
}
