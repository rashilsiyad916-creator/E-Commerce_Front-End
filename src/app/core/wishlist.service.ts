import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {

  private wishlistItems = new BehaviorSubject<Product[]>([]);
  wishlist$ = this.wishlistItems.asObservable();
  
  constructor(){
    const saved=localStorage.getItem('wishlist');
    if(saved){
      this.wishlistItems.next(JSON.parse(saved));
    }
  }


  add(product: Product) {
    const items = this.wishlistItems.value;

    if (!items.find(p => p.id === product.id)) {
      this.wishlistItems.next([...items, product]);
    }
  }

  remove(productId: number) {
    const items = this.wishlistItems.value
      .filter(p => p.id !== productId);

    this.wishlistItems.next(items);
  }

  toggle(product: Product) {
    const items = this.wishlistItems.value;
    const exists = items.find(p => p.id === product.id);

    if (exists) {
      this.wishlistItems.next(items.filter(p => p.id !== product.id));
    } else {
      this.wishlistItems.next([...items, product]);
    }

    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems.value));
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.value
      .some(p => p.id === productId);
  }

    getWishlistItems() {
    return this.wishlistItems.value;
  }
}