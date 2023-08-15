import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-services/auth.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('f') data!: NgForm;

  email: any;
  response: any;
  error: any;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private primeNGConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
  }
  onSubmit() {
    console.log('formData', this.data);

    this.authService.forgotPassword(this.email).subscribe(
      (res: {}) => {
        console.log(res);
        this.response = res;
        this.messageService.add({
          key: 'success',
          severity: 'success',
          // summary: 'StartupLynk',
          detail: `${this.response.message}`,
        });
        // alert(this.response.message);
      },
      (error) => {
        console.log('error from forgot-password', error);
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
        this.error = [
          {
            severity: 'error',
            // summary: 'StartupLynk :  ',
            detail: error.error.message,
          },
        ];
      }
    );
  }
}
