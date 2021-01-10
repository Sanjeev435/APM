import { Component, OnInit } from '@angular/core';
import { IProduct } from '../payload/product'
import { ProductService } from '../service/product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage = false;

    _listFilter: string;

    pageTitle: string = "Product List";
    filteredProducts: IProduct[];
    products: IProduct[];
    errorMessage: string;

    constructor(private productService: ProductService) {
    }

    getProducts(){
        this.productService.getProducts().subscribe({
            next: data => {
                this.products = data;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        })
    }

    ngOnInit(): void {
        this.getProducts();
        this.listFilter = undefined;
        console.log('Component Initialized !! ');
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filterKeyword: string): IProduct[] {
        filterKeyword = filterKeyword.toLocaleLowerCase();
        return this.products.filter(product =>
            product.productName.toLocaleLowerCase().includes(filterKeyword));
    }

    notifyStarClicked(message: string): void {
        this.pageTitle = 'Product List' + ' | ' + message;
    }
}