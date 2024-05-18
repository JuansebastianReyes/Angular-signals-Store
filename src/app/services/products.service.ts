import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly url = 'https://fakestoreapi.com/'
  private readonly httpServices = inject(HttpClient)
  products = toSignal<Product[]>(
    this.httpServices.get<Product[]>(`${this.url}products`)
  )
}
