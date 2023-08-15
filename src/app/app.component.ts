import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'newProject';
  isOpen = true;
  isLoginPage = true;

  isLoggedIn = false;
  constructor() {}

  ngOnInit() {}

  getToggleRes() {
    this.isOpen = !this.isOpen;
  }

  onLogout() {
    this.isLoggedIn = !this.isLoggedIn;
    this.isLoginPage = !this.isLoginPage;
  }

  onLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn;
    this.isLoginPage = !this.isLoginPage;
  }
}
