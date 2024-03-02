import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-app';
  navMenuOpen: boolean = false;


  toggleMenuBar(): void {
    this.navMenuOpen = !this.navMenuOpen;
  }
}
