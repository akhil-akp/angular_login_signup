import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  providers: [MessageService],
})
export class UpdatePasswordComponent implements OnInit {
  @ViewChild('f') data!: NgForm;
  isOpen = true;
  currentPassword: any;
  newPassword: any;
  confirmNewPassword: any;
  error: Message[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.error = [];
  }

  ngOnInit(): void {}
  getToggleRes() {
    this.isOpen = !this.isOpen;
  }

  onSubmit() {
    // console.log('data', this.data);
    // console.log(this.data.form.controls?.['newPassword']?.errors?.['pattern']);
    this.authService
      .updatePassword(this.currentPassword, this.newPassword)
      .subscribe(
        (data: any) => {
          console.log(data);

          this.messageService.add({
            key: 'success',
            severity: 'success',
            // summary: 'StartupLynk',
            detail: data.message,
          });
          // this.router.navigate(['/user/profile']);
        },
        (error) => {
          console.log('error from update password:', error);

          this.error = [
            {
              severity: 'error',
              summary: 'StartupLynk:',
              detail: error.error.message,
            },
          ];
          // console.log(this.error);
          // this.showViaService();
          // alert(error.error.message);
        }
      );
  }

  // showViaService() {
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: 'Service Message',
  //     detail: 'Via MessageService',
  //   });
  // }
}
