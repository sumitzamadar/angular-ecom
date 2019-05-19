import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SessionStorageService } from 'ng2-webstorage';
import { Router } from '@angular/router';

import { APP_DATA } from './data/data';
import { Product } from './abstract/product';

@Injectable()
export class AppService {
    private activeRoute: string = null;
    private subjectFilter = new Subject<any>();
    private subjectCart = new Subject<any>();

    constructor(
        private storage: SessionStorageService,
        private router: Router
    ) {}

    public getFilters = (): Observable<any> => {
        return Observable.of(APP_DATA)
        .map((res) => res.filters);
    }

    public getProducts = (): Observable<any> => {
        const filters = this.storage.retrieve('browseFilters') || {};

        return Observable.of(APP_DATA)
        .map((res) => res.products)
        .map(products => products.filter((product) => {
            if (filters.brand && filters.brand.length) {
                return filters.brand.includes(product.brand);
            } else {
                return product;
            }
        }))
        .map(products => products.filter((product) =>  {
            if (filters.price && filters.price.length) {
                for (let i = 0; i < filters.price.length; i++) {
                   const priceRange = filters.price[i].split('-');
                   if (((product.price >= priceRange[0]) && (product.price <= priceRange[1]))) {
                       return product;
                   }
                }
                return false;
            } else {
                return product;
            }
        }));
    }

    public addToCart = (pid: number): boolean => {
        const cart = this.storage.retrieve('myCart') || {};
        if (cart.hasOwnProperty(pid)) {
            cart[pid] += 1;
        } else {
            cart[pid] = 1;
        }
        this.storage.store('myCart', cart);
        this.subjectCart.next(cart);
        return true;
    }

    public removeFromCart = (pid: number, removeType: string = 'DECREMENT') => {
        const cart = this.storage.retrieve('myCart') || {};
        if (cart.hasOwnProperty(pid)) {
            if (removeType === 'DISCARD') {
                delete cart[pid];
            } else {
                cart[pid] -= 1;
                if (cart[pid] <= 0) {
                    delete cart[pid];
                }
            }
        }
        this.storage.store('myCart', cart);
        this.subjectCart.next(cart);
        return true;
    }

    public retrieveCart = (): any => {
        return this.storage.retrieve('myCart') || {};
    }

    public getUpdatedCart = (): Observable<any> => {
        return this.subjectCart.asObservable();
    }

    public retrieveCartProducts = (): Observable<any> => {
        const cart = this.storage.retrieve('myCart') || {};
        return Observable.of(APP_DATA)
        .map(res => res.products)
        .map(products => products.filter(product => cart.hasOwnProperty(product.id)));
    }

    public getProduct = (id): Observable<any> => {
        return Observable.of(APP_DATA)
        .map((res) => res.products)
        .map(products => products.filter(product => product.id === id));
    }

    public updateActiveRoute = (): void => {
        this.activeRoute = this.router.url;
    }

    public setBrowseFilter = (filterName: string, filterValue: string): void => {
        const filters = this.storage.retrieve('browseFilters') || {};
        filters[filterName] = filters[filterName] ? [filterValue, ...filters[filterName]] : [filterValue];
        this.storage.store('browseFilters', filters);
        this.subjectFilter.next(filters);
    }

    public getBrowseFilter = (): Observable<any> => {
        const filters = this.storage.retrieve('browseFilters') || {};
        return this.subjectFilter.asObservable();
    }

    public clearBrowseFilter = (filterName: string, filterValue: string) : void => {
        const filters = this.storage.retrieve('browseFilters') || {};
        if (filters[filterName]) {
            filters[filterName].splice(filters[filterName].indexOf(filterValue), 1);
        }
        this.storage.store('browseFilters', filters);
        this.subjectFilter.next(filters);
    }

    public resetBrowseFilter = (): void => {
        this.storage.store('browseFilters', {});
        this.subjectFilter.next({});
    }

}
