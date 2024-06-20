import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordNotEmailDirective, PasswordRepeatDirective } from 'core/directives';
import { environment } from '../../../../environments/environment.development';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChoiceOfLoginEnum } from 'models/choice-of-login.enum';
import { SvgIconComponent } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { Constants } from 'app/core';

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
}
