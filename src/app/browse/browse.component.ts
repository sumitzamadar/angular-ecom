import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Product } from '../abstract/product';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  public products: Product[] = [];

  constructor(
    private appService: AppService
  ) {
    this.appService.getBrowseFilter()
    .subscribe((data) => {
      this.getProducts();
    });
   }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts = (): void => {
    this.appService.getProducts()
      .subscribe((data) => {
        this.products = data;
      });
  }

}
