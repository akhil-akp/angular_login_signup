import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

interface userInfo {
  firstName: string;
  lastName: string;
  mobile: string;
  gender: string;
  DOB: string;
  profileImage: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [MessageService],
})
export class UserEditComponent implements OnInit {
  @ViewChild('f') userUpdate!: NgForm;
  isOpen = true;
  error: any;

  user: userInfo = {
    firstName: '',
    lastName: '',
    mobile: '',
    gender: '',
    DOB: '',
    profileImage: '',
  };
  image: any;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  getToggleRes() {
    this.isOpen = !this.isOpen;
  }

  onSubmit() {
    this.userService.updateUser(this.user).subscribe(
      (data: any) => {
        console.log(data);

        this.messageService.add({
          key: 'topcenter',
          severity: 'success',
          // summary: 'StartupLynk',
          detail: data.message,
        });
      },
      (error) => {
        console.log('Error from update user :', error);
        this.messageService.add({
          key: 'topcenter',
          severity: 'error',
          // summary: 'StartupLynk',
          detail: error.error.message,
        });
      }
    );
  }

  updateUserImage(event: any) {
    const file: File = event?.target?.files[0];

    this.userService.updateProfileImage(file).subscribe(
      (data: any) => {
        this.user.profileImage = data.fileUrl;
      },
      (error) => {
        console.log('Error from update user image :', error);
      }
    );
  }
}
