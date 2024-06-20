import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChoiceOfLoginEnum } from 'models/choice-of-login.enum';
import { HeaderComponent } from 'app/components';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  imagePath = environment.imagesPath;
  imagesIconsPath = environment.imagesIconsPath;

  constructor() {}

  loginForm: FormGroup | null = null;
  choiceOfLogin: ChoiceOfLoginEnum = ChoiceOfLoginEnum.EMAIL;
  choiceOfLoginEnum = ChoiceOfLoginEnum;

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
}
