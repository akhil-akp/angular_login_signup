import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('f') resetData!: NgForm;
  password: any;
  confirmPassword: any;
  resetToken: any;
  error: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}
  onSubmit() {
    console.log(this.resetData);

    // console.log(this.resetData.form.controls['password'].errors?.['required']);
    console.log(
      this.resetData.form.controls['confirmPassword'].errors?.['pattern']
    );

    this.route.params.subscribe((param: Params) => {
      this.resetToken = param['id'];
      console.log(this.resetToken);
    });

    this.authService.resetPassword(this.resetToken, this.password).subscribe(
      (results: any) => {
        alert(results.message);

        this.router.navigate(['/']);
      },
      (error) => {
        console.log('error from reset password : ', error);

        if (error.status === 0) {
          // return alert('We are resolving the issue . Try sometime later !');
          this.error = [
            {
              severity: 'error',
              // summary: 'StartupLynk :  ',
              detail: 'We are resolving the issue . Try sometime later !',
            },
          ];
          return;
        }
        // alert(error.error.message);
        this.error = [
          {
            severity: 'error',
            // summary: 'StartupLynk :  ',
            detail: error.error.message,
          },
        ];

        // this.router.navigate(['/user/forgot-password']);
      }
    );
  }
}
