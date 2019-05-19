import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../abstract/product';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public removeDisabled = false;
  public addDisabled = false;
  public addedCount = 0;

  public myCart = null;

  @Input()
  public product: Product;

  @Input()
  public cart = false;

  @Output()
  private added: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public removed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.myCart = this.appService.retrieveCart();
    if (this.myCart.hasOwnProperty(this.product.id)) {
      this.addedCount = this.myCart[this.product.id];
    }
  }

  public addToCart = (): boolean => {
    this.addedCount = 1;
    this.addDisabled = true;
    this.appService.addToCart(this.product.id);
    setTimeout(() => {
      this.added.emit('completed');
    }, 500);
    return false;
  }

  public removeFromCart = (): boolean => {
    this.removeDisabled = true;
    this.appService.removeFromCart(this.product.id, 'DISCARD');
    setTimeout(() => {
      this.removed.emit('complete');
    }, 500);

    return false;
  }

  public upCount = (): void => {
    this.addedCount += 1;
    this.appService.addToCart(this.product.id);
  }

  public downCount = (): boolean => {
    if (this.cart && (this.addedCount === 1)) {
      return false;
    }

    this.addedCount -= 1;
    this.appService.removeFromCart(this.product.id);
    if (this.addedCount <= 0) {
      this.addedCount = 0;
      this.addDisabled = false;
    }

    return true;
  }

}
