import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DestroyDirective,
  PasswordNotEmailDirective,
  PasswordRepeatDirective,
} from 'core/directives';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, EMPTY, Observable, takeUntil, tap } from 'rxjs';
import { AuthCheckService, AuthService, Constants } from 'app/core';
import { ChoiceOfLoginEnum } from 'models/choice-of-login.enum';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
    SvgIconComponent,
    RouterLink,
    PasswordRepeatDirective,
    PasswordNotEmailDirective,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  imagePath = environment.imagesPath;
  imagesIconsPath = environment.imagesIconsPath;
  choiceOfLoginEnum = ChoiceOfLoginEnum;
  choiceOfLogin: ChoiceOfLoginEnum = ChoiceOfLoginEnum.EMAIL;

  signupForm: FormGroup | null = null;
  isShowPassword = false;
  isShowPasswordRepeat = false;

  private readonly destroy$: Observable<boolean> = inject(DestroyDirective).destroy$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authCheckService: AuthCheckService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(Constants.regExpForPassword),
      ]),
      passwordRepeat: new FormControl('', [Validators.required]),
    });
  }

  choosePhoneForLogin(): void {
    this.authCheckService.setAuthViaPhone(true);
    this.router.navigate(['personal']).then(() => {});
  }

  toggleShowPassword(showValue: 'password' | 'passwordRepeat'): void {
    if (showValue === 'password') {
      this.isShowPassword = !this.isShowPassword;
      return;
    }

    if (showValue === 'passwordRepeat') {
      this.isShowPasswordRepeat = !this.isShowPasswordRepeat;
    }
  }

  register(): void {
    if (
      this.signupForm?.valid &&
      this.signupForm.get('email')?.value &&
      this.signupForm.get('username')?.value &&
      this.signupForm.get('password')?.value &&
      this.signupForm.get('passwordRepeat')?.value
    ) {
      this.authService
        .register(
          this.signupForm.get('email')!.value,
          this.signupForm.get('username')!.value,
          this.signupForm.get('password')!.value
        )
        .pipe(
          tap(() => {
            console.log('okey register');
            this.signupForm!.reset();
            this.router.navigate(['/login']).then((): void => {});
          }),
          takeUntil(this.destroy$),
          catchError(() => {
            console.log('smth went wrong/register');
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
