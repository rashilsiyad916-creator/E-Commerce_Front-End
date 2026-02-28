import { Component,Input} from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/core/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  isWishlisted=false;
  
  constructor(private router: Router,private wishlistService:WishlistService) {}
  

  goToDetails() {
    this.router.navigate(['/products', this.product.id]);
  }


ngOnInit() {
  this.isWishlisted = this.wishlistService.isInWishlist(this.product.id);

  this.wishlistService.wishlist$.subscribe(() => {
    this.isWishlisted = this.wishlistService.isInWishlist(this.product.id);
  });
}

toggleWishlist(event: Event) {
  event.stopPropagation(); 
  this.wishlistService.toggle(this.product);
}

isInWishlist(): boolean {
  return this.wishlistService.isInWishlist(this.product.id);
}
}
