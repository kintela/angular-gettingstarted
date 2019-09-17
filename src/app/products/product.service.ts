import { Injectable } from '@angular/core';
import { IProduct } from './product';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class ProductService{
  private productUrl='api/products/products.json';

  constructor(private http:HttpClient){}

  getProducts():Observable<IProduct[]>{
     return this.http.get<IProduct[]>(this.productUrl).pipe(
       tap(data=>console.log('All: ' + JSON.stringify(data))),
       catchError(this.handleError)
     );   
  }

  private handleError(err:HttpErrorResponse){
    let errorMessage='';
    if (err.error instanceof ErrorEvent) {
      //Ha sido un error en el lado del cliente o es un problema de red
      errorMessage=`An error ocurred: ${err.error.message}`;
    }else{
      //El back-end ha develto un código de respuesta no valido
      //El cuerpo de la respuesta puede contener algo raro
      errorMessage=`Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
