import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../auth-services/auth.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  genders = [{ gender: 'Male' }, { gender: 'Female' }, { gender: 'Other' }];
  // genders = ['male', 'female', 'other'];
  value: any;
  datePickerId = new Date().toISOString().split('T')[0];
  // datePickerId = new Date();
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.signupForm = new FormGroup({
      // userData: new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      // }),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      DOB: new FormControl(null),
      gender: new FormControl(null),
      profileImage: new FormControl(null),
      // hobbies: new FormArray([]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.signupForm.value.gender = this.signupForm.value?.gender?.gender;
    console.log(this.signupForm);
    this.authService.signup(this.signupForm.value).subscribe(
      (data: any) => {
        this.messageService.add({
          key: 'topcenter',
          severity: 'success',
          // summary: 'StartupLynk',
          detail: data.message,
        });
      },
      (error) => {
        console.log('Error from signup :', error);
        if (error.status === 0) {
          // return alert('We are resolving the issue . Try sometime later !');
          this.messageService.add({
            key: 'topcenter',
            severity: 'error',
            detail: 'We are resolving the issue . Try sometime later !',
          });
          return;
        }
        this.messageService.add({
          key: 'topcenter',
          severity: 'error',
          detail: error.error.message,
        });
      }
    );

    // this.signupForm.reset();
  }

  // onAddHobby() {
  //   const control = new FormControl(null, Validators.required);
  //   (<FormArray>this.signupForm.get('hobbies')).push(control);
  // }

  // getControls() {
  //   return (<FormArray>this.signupForm.get('hobbies')).controls;
  // }

  uploadImage(event: any) {
    const file = event.target.files[0];

    this.userService.updateProfileImage(file).subscribe(
      (data: any) => {
        this.signupForm.value.profileImage = data.fileUrl;
      },
      (error) => {
        console.log('Error from signup form', error);
      }
    );
  }
}
