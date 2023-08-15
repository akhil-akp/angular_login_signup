import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isOpen = true;

  getToggleRes() {
    this.isOpen = !this.isOpen;
  }
}
