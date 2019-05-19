import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public productID: number;
  public productDetail: any;

  public addDisabled = false;
  public addedCount = 0;
  public myCart = null;

  @Output()
  private added: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public removed: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productID = params['id'];
      this.appService.getProduct(this.productID)
      .subscribe((data) => {
        this.productDetail = data[0];
        this.myCart = this.appService.retrieveCart();
        if (this.myCart.hasOwnProperty(this.productID)) {
          this.addedCount = this.myCart[this.productID];
          this.addDisabled = true;
        }
      });
    });
  }

  public addToCart = (): boolean => {
    this.addedCount = 1;
    this.addDisabled = true;
    this.appService.addToCart(this.productID);
    setTimeout(() => {
      this.added.emit('completed');
    }, 500);
    return false;
  }

  public upCount = (): void => {
    this.addedCount += 1;
    this.appService.addToCart(this.productID);
  }

  public downCount = (): void => {
    this.addedCount -= 1;
    this.appService.removeFromCart(this.productID);
    if(this.addedCount <= 0) {
      this.addedCount = 0;
      this.addDisabled = false;
    }
  }

}
