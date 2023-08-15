import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth-services/auth.service';
import { UserService } from '../user/user.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;
  @Output() onToggleSideBar: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data;
    // let userData = this.authService.getLoginUser();
    // this.user = JSON.parse(`${userData}`);
    this.userService.userDetails().subscribe(
      (data: any) => {
        this.user = data.user[0];
      },
      (error) => {
        console.log(error);
      }
    );
    // console.log('loginuser', this.user);
  }

  toggleSidebar() {
    this.onToggleSideBar.emit();
  }

  onLogout() {
    this.logout.emit();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.socialAuthService.signOut();
    this.router.navigate(['']);
  }

  userInfo() {
    this.router.navigate(['/user/profile']);
    console.log('akhilesh kumar');
  }
}
