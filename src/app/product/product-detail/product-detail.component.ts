import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/payload/product';
import { ProductService } from '../../service/product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: IProduct;
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private productService: ProductService) {}

  ngOnInit(): void {
    console.log('Product Detail page initialized');
    let id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe({
      next: data => this.product = data});
    this.pageTitle += ` : ${id}`;
  }

  onBack() {
    this.router.navigate(['/products']);
  }
}
