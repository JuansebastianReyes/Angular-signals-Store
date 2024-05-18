import { CartService } from './../../services/cart.service';
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input({required: true}) product!: Product;

  private cartService = inject(CartService);

  addProduct(product: Product) {
    this.cartService.addProduct(product);
  }
}
