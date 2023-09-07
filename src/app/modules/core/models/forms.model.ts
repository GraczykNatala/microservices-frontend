import { FormControl } from '@angular/forms';

export interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
  email: FormControl<string>;
  repeatPassword: FormControl<string>;
}
