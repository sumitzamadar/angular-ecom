import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Product } from '../abstract/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];
  public myCart = null;
  public totalProducts = 0;
  public totalPrice = 0;

  constructor( private appService: AppService) { 
    this.appService.getUpdatedCart()
    .subscribe((data) => {
       this.loadCart();
    });
  }

  ngOnInit() {
    this.loadCart();
  }

  public loadCart = (): void => {
    this.totalProducts = 0;
    this.totalPrice = 0;

    this.myCart = this.appService.retrieveCart();
    this.appService.retrieveCartProducts()
    .subscribe((data) => {
      this.products = data;
      for (const p of this.products) {
        if (this.myCart.hasOwnProperty(p.id)) {
          this.totalProducts += this.myCart[p.id];
          this.totalPrice += (p.price * this.myCart[p.id]);
        }
      }
    });
  }

  public onRemoved = (event): void => {
    this.loadCart();
  }

}
