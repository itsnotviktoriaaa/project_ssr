import { afterNextRender, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { ChoiceOfLoginEnum } from 'models/choice-of-login.enum';
import { WindowService } from 'core/services/window.service';
import { ConfirmationResult } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { HeaderComponent } from 'app/components';
import { catchError, EMPTY, tap } from 'rxjs';
import { NgStyle } from '@angular/common';
import { AuthService } from 'app/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink, SvgIconComponent, NgStyle],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  imagePath = environment.imagesPath;
  imagesIconsPath = environment.imagesIconsPath;
  choiceOfLoginEnum = ChoiceOfLoginEnum;
  choiceOfLogin: ChoiceOfLoginEnum = ChoiceOfLoginEnum.EMAIL;

  loginForm: FormGroup | null = null;
  isShowPassword = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  windowRef: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private windowService: WindowService
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
  }

  sendOTP(): void {
    this.authService
      .loginWithHelpOfPhone(this.loginForm?.get('phone')?.value, this.windowRef.recaptchaVerifier)
      .pipe(
        tap((confirmationResult: ConfirmationResult) => {
          this.windowRef.confirmationResult = confirmationResult;
          console.log(confirmationResult);
        }),
        catchError(err => {
          console.log(err);
          return EMPTY;
        })
      )
      .subscribe();
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  verifyOTP() {
    this.windowRef.confirmationResult
      .confirm(this.loginForm?.get('code')?.value)
      .then((userCredentials: any) => {
        console.log(userCredentials);
      })
      .catch((err: any) => {
        console.log(err);
      });
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
}
