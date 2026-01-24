import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly firebaseAuth = inject(Auth);

  login(email: string, password: string) {
    const request = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    );
    return from(request);
  }
}
