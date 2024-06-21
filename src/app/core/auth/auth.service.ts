import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { IUser } from 'app/models';
type User = import('firebase/auth').User;
type UserCredential = import('firebase/auth').UserCredential;
type GoogleAuthProviderInstance = InstanceType<typeof GoogleAuthProvider>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);

  //подписываемся на пользовательские данные через поток; вернет пользовательские данные (если вошли в систему) либо null;
  user$: Observable<User | null> = user(this.firebaseAuth);

  //чтобы не использовать user$, так как там очень много данных и методов, поэтому создаю свой собственный текущий пользовательский сигнал
  currentUserSig: WritableSignal<IUser | null | undefined> = signal<IUser | null | undefined>(
    undefined
  );

  recaptchaVerifier(): RecaptchaVerifier {
    const auth = getAuth();
    return new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise: Promise<void> = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(response => updateProfile(response.user, { displayName: username }));
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise: Promise<void> = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((): void => {});
    return from(promise);
  }

  loginWithHelpOfPhone(
    phoneNumber: string,
    recaptchaVerifier: RecaptchaVerifier
  ): Observable<ConfirmationResult> {
    const confirmationResult = signInWithPhoneNumber(
      this.firebaseAuth,
      phoneNumber,
      recaptchaVerifier
    );

    return from(confirmationResult);
  }

  // Sign in with Google
  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider: GoogleAuthProviderInstance): Observable<UserCredential> {
    const promise: Promise<UserCredential> = signInWithPopup(this.firebaseAuth, provider);
    return from(promise);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user: User | null) => !!user));
  }

  loginViaGoogle() {
    return this.googleAuth();
  }

  logout(): Observable<void> {
    const promise: Promise<void> = signOut(this.firebaseAuth);
    return from(promise);
  }
}
