import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChoiceOfLoginEnum } from 'models/choice-of-login.enum';
import { SvgIconComponent } from 'angular-svg-icon';
import { HeaderComponent } from 'app/components';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

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

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

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
    this.loginForm?.addControl('phone', new FormControl('', Validators.required));
  }

  toggleShowPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }
}
