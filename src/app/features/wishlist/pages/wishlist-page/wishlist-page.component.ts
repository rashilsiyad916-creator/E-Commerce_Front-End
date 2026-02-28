import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/core/wishlist.service';
import { Product } from 'src/app/core/models/product.model';
@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit {

  wishlistItems: Product[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  remove(id: number) {
  this.wishlistService.remove(id);
  }
}