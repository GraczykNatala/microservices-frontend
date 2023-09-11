import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss'],
})
export class AccountActivationComponent implements OnInit {
  errorMessage: null | string = null;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private notifier: NotifierService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.authService.activateAccount(params.get('uid') as string),
        ),
      )
      .subscribe({
        next: (response) => {
          //
          this.router.navigate(['/logowanie']);
          this.notifier.notify('success', response.message);
        },
        error: (err) => {
          this.errorMessage = err;
        },
      });
  }
}
