import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { AuthCheckService, AuthService, DestroyDirective } from 'app/core';
import { ChoiceOfLoginEnum } from 'models/choice-of-login.enum';
import { catchError, EMPTY, from, takeUntil, tap } from 'rxjs';
import { WindowService } from 'core/services/window.service';
import { ConfirmationResult } from '@angular/fire/auth';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { HeaderComponent } from 'app/components';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    RouterLink,
    SvgIconComponent,
    NgStyle,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  imagePath = environment.imagesPath;
  imagesIconsPath = environment.imagesIconsPath;
  choiceOfLoginEnum = ChoiceOfLoginEnum;
  choiceOfLogin: ChoiceOfLoginEnum = ChoiceOfLoginEnum.EMAIL;

  loginForm: FormGroup | null = null;
  isShowPassword = false;
  showPhoneControl = signal(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  windowRef: any;

  private readonly destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private windowService: WindowService,
    private authCheckService: AuthCheckService
  ) {
    afterNextRender((): void => {
      this.windowRef = this.windowService.windowRef;
      console.log(this.windowRef);
      this.windowRef.recaptchaVerifier = this.authService.recaptchaVerifier();
      this.windowRef.recaptchaVerifier.render();
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.authCheckService
      .getAuthViaPhone()
      .pipe(
        tap((param: boolean) => {
          if (param) {
            this.choosePhoneForLogin();
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  sendOTP(): void {
    this.authService
      .loginWithHelpOfPhone(this.loginForm?.get('phone')?.value, this.windowRef.recaptchaVerifier)
      .pipe(
        tap((confirmationResult: ConfirmationResult) => {
          this.windowRef.confirmationResult = confirmationResult;
          console.log(confirmationResult);
          this.loginForm?.removeControl('phone');
          this.showPhoneControl.set(false);
        }),
        takeUntil(this.destroy$),
        catchError(err => {
          console.log(err);
          return EMPTY;
        })
      )
      .subscribe();
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  verifyOTP(): void {
    from(this.windowRef.confirmationResult.confirm(this.loginForm?.get('code')?.value))
      .pipe(
        tap((userCredentials: any) => {
          this.router.navigate(['/personal']).then(() => {});
          console.log(userCredentials);
        }),
        takeUntil(this.destroy$),
        catchError(err => {
          console.log('went wrong', err);
          return EMPTY;
        })
      )
      .subscribe();
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  chooseEmailForLogin(): void {
    if (this.choiceOfLogin === ChoiceOfLoginEnum.EMAIL) {
      return;
    }

    this.choiceOfLogin = ChoiceOfLoginEnum.EMAIL;
    this.loginForm?.removeControl('phone');
    this.loginForm?.addControl(
      'email',
      new FormControl('', [Validators.required, Validators.email])
    );
    this.loginForm?.addControl('password', new FormControl('', [Validators.required]));
  }

  choosePhoneForLogin(): void {
    if (this.choiceOfLogin === ChoiceOfLoginEnum.PHONE) {
      return;
    }

    this.choiceOfLogin = ChoiceOfLoginEnum.PHONE;
    this.loginForm?.removeControl('email');
    this.loginForm?.removeControl('password');
    this.loginForm?.addControl('phone', new FormControl('', Validators.required));
    this.loginForm?.addControl('code', new FormControl('', Validators.required));
  }

  toggleShowPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  login(): void {
    if (
      this.loginForm?.valid &&
      this.loginForm.get('email')?.value &&
      this.loginForm.get('password')?.value
    ) {
      this.authService
        .login(this.loginForm.get('email')!.value, this.loginForm.get('password')!.value)
        .pipe(
          tap(() => {
            console.log('okey login');
            this.loginForm!.reset();
            this.router.navigate(['/personal']).then((): void => {});
          }),
          catchError(() => {
            console.log('login err');
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  loginViaGoogle(): void {
    this.authService
      .loginViaGoogle()
      .pipe(
        tap(user => {
          this.handleGoogleLogin(user);
        }),
        takeUntil(this.destroy$),
        catchError(() => {
          this.handleError();
          return EMPTY;
        })
      )
      .subscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleGoogleLogin(user: any): void {
    console.log(user);
    console.log('okey from /google');
    this.router.navigate(['/personal']).then(() => {});
  }

  private handleError(): void {
    console.log('sth went wrong/google');
  }
}
