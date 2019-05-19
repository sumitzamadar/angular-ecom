import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AppComponent } from './app.component';
import { BrowseComponent } from './browse/browse.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { FiltersComponent } from './filters/filters.component';

import { AppRoutingModule } from './app.routes';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    ProductComponent,
    CartComponent,
    ProductDetailComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    Ng2Webstorage,
    AppRoutingModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
