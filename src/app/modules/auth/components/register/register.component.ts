import { Component, OnDestroy } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterForm } from '../../../core/models/forms.model';
import * as AuthActions from '../../store/auth.actions';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup<RegisterForm> = this.formService.initRegisterForm();

  notMatchingPasswordsError: null | string = null;
  constructor(
    private formService: FormService,
    private store: Store<AppState>,
  ) {}

  get controls(): RegisterForm {
    return this.registerForm.controls;
  }

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }

  onRegister() {
    const { login, email, password, repeatPassword } =
      this.registerForm.getRawValue();
    if (password !== repeatPassword) {
      this.notMatchingPasswordsError = 'Hasła nie mogą byc różne.';
      return;
    }
    this.store.dispatch(
      AuthActions.register({ registerData: { login, email, password } }),
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
