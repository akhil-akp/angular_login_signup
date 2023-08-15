import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any;
  isOpen = true;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data;
    this.loginUserDetails();
  }

  getToggleRes() {
    this.isOpen = !this.isOpen;
  }
  loginUserDetails() {
    this.userService.userDetails().subscribe(
      (data) => {
        this.user = data.user[0];
      },
      (error) => {
        console.log('Error from user componenet :', error);
      }
    );
  }
}
