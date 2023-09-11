import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PasswordsForm } from '../../../core/models/forms.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss'],
})
export class PasswordRecoveryFormComponent implements OnInit {
  passwordsForm: FormGroup<PasswordsForm> =
    this.formSerivce.initPasswordsForm();
  uid = '';
  errorMessage: null | string = null;

  get controls(): PasswordsForm {
    return this.passwordsForm.controls;
  }
  constructor(
    private formSerivce: FormService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notifier: NotifierService,
    private router: Router,
  ) {}

  getErrorMessage(email: FormControl<string>): string {
    return this.formSerivce.getErrorMessage(email);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.uid = param.get('uid') as string;
      },
    });
  }

  onPasswdChange() {
    const { password } = this.passwordsForm.getRawValue();
    this.authService.changePassword({ password, uid: this.uid }).subscribe({
      next: () => {
        this.router.navigate(['/logowanie']);
        this.notifier.notify(
          'success',
          'Poprawnie zmieniono hasło, teraz możesz się zalogować.',
        );
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }
}
