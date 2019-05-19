import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionStorageService } from 'ng2-webstorage';
import { AppService } from '../app.service';

@Component({
  selector: 'app-browse-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  public filters = [];
  public browseFilters = null;
  public isFilterApplied = false;

  constructor(
    private storage: SessionStorageService,
    private appService: AppService
  ) {

    this.appService.getFilters()
    .subscribe((data) => {
      this.filters = data;
    });

    this.appService.getBrowseFilter()
    .subscribe((data) => {
        this.browseFilters = this.storage.retrieve('browseFilters') || {};
        if ((this.browseFilters.brand && this.browseFilters.brand.length)
            || (this.browseFilters.price && this.browseFilters.price.length)) {
              this.isFilterApplied = true;
        }
    });
  }

  ngOnInit() {
    this.browseFilters = this.storage.retrieve('browseFilters') || {};
  }

  public filterByBrand = (event): void => {
    if (event.target.checked) {
      this.appService.setBrowseFilter(event.target.name, event.target.value);
      this.isFilterApplied = true;
    } else {
      this.appService.clearBrowseFilter(event.target.name, event.target.value);
    }
  }

  public isChecked = (filterName: string, filterValue: string): boolean => {
    let checked = false;
    switch (filterName) {
      case 'brand':
        checked = this.browseFilters.brand && this.browseFilters.brand.includes(filterValue);
        break;
      case 'price':
        checked = this.browseFilters.price && this.browseFilters.price.includes(filterValue);
        break;
    }
    return checked;
  }

  public clearAllFilters = (): void => {
    this.appService.resetBrowseFilter();
    this.isFilterApplied = false;
  }

}
