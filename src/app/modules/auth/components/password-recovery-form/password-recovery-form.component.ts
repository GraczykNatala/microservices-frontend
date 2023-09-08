import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PasswordsForm } from '../../../core/models/forms.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss'],
})
export class PasswordRecoveryFormComponent implements OnInit {
  passwordsForm: FormGroup<PasswordsForm> =
    this.formSerivce.initPasswordsForm();

  get controls(): PasswordsForm {
    return this.passwordsForm.controls;
  }
  constructor(
    private formSerivce: FormService,
    private route: ActivatedRoute,
  ) {}

  getErrorMessage(email: FormControl<string>): string {
    return this.formSerivce.getErrorMessage(email);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('uid'));
      },
    });
  }
}
