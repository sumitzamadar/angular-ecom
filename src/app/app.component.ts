import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  public isBrowseVisible = true;
  public isCartVisible = true;
  public isFiltersVisible = true;

  constructor(
    private router: Router,
    private appService: AppService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isBrowseVisible = true;
        this.isCartVisible = true;
        this.isFiltersVisible = true;

        if (event.url.startsWith('/browse')) {
          this.isBrowseVisible = false;
        } else if (event.url.startsWith('/cart')) {
          this.isCartVisible = false;
          this.isFiltersVisible = false;
        } else if (event.url.startsWith('/product')) {
          this.isFiltersVisible = false;
        }
      }
    });
  }

}
