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
import { ChoiceOfLoginEnum } from 'models/choice-of-login.enum';
import { Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { AuthService, Constants } from 'app/core';
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
    private router: Router
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

  chooseEmailForLogin(): void {
    if (this.choiceOfLogin === ChoiceOfLoginEnum.EMAIL) {
      return;
    }

    this.choiceOfLogin = ChoiceOfLoginEnum.EMAIL;
    this.signupForm?.removeControl('phone');
    this.signupForm?.addControl(
      'email',
      new FormControl('', [Validators.required, Validators.email])
    );
  }

  choosePhoneForLogin(): void {
    if (this.choiceOfLogin === ChoiceOfLoginEnum.PHONE) {
      return;
    }

    this.choiceOfLogin = ChoiceOfLoginEnum.PHONE;
    this.signupForm?.removeControl('email');
    this.signupForm?.addControl('phone', new FormControl('', Validators.required));
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
}
