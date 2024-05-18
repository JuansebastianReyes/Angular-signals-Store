import { ProductsService } from 'src/app/services/products.service';
import { Injectable, signal, inject, computed } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = signal<Product[]>([]);
  private productsService = inject(ProductsService);

  totalItems = computed(() => this.cart().length);

  amount = computed(() => {
    return this.cart().reduce((prev: number, curr: Product) => {
      return prev + curr.price;
    }, 0);
  });

  getCart() {
    return this.cart();
  }

  addProduct(product: Product) {
    this.cart.update((cart) => [...cart, product]);
    this.substractProductQuantity(product);
  }

  substractProductQuantity(product: Product) {
    this.productsService.products()?.forEach((element) => {
      if (element.id === product.id) {
        element.rating.count = element.rating.count - 1;
      }
    });
  }

  returnProductQuantity(product: Product) {
    this.productsService.products()?.forEach((element) => {
      if (element.id === product.id) {
        element.rating.count = element.rating.count + 1;
      }
    });
  }

  removeProduct(index: number) {
    this.cart.mutate( (products) => {
      const product = products.splice(index, 1);
      this.returnProductQuantity(product[0]);
    })
  }
}
