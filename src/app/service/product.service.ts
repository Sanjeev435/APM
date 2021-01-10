import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IProduct } from '../payload/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'api/products/products.json';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log('Data Published')),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<IProduct> {
    return this.getProducts().pipe(
      map((products: IProduct[]) => products.find((p) => p.productId === id))
    );
  }

  private handleError(error: HttpErrorResponse) {
    // In a real world app, we may send the server to some remote
    // logging infrastruecture instead of just logging it to the console
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client side or network error occured. Handle  it accordingly
      errorMessage = `An error occured : ${error.error.message}`;
    } else {
      // The backend returend an unsuccessful reponse code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server retured code: ${error.status}, error messgae is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError('Method not implemented.');
  }
}
