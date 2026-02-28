import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTS } from '../data/product';
import { WishlistService } from 'src/app/core/wishlist.service';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  wishlistCount: number=0;
  cartCount:number = 0;

  constructor(private router: Router,private wishlistService:WishlistService,private cartService:CartService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.wishlistService.wishlist$.subscribe(items=>{
      this.wishlistCount=items.length;
    });
   
  this.cartService.cartItems$.subscribe(items => {
  this.cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );
});

    
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }

  goToProfile(){
    this.router.navigate(['/profile'])
  }

  goToCart(){
    this.router.navigate(['/cart'])
  }

  goToAllProducts(){
    this.router.navigate(['/products'])
  }

  search() {
    const trimmedQuery = this.searchQuery.trim().toLowerCase();

    const foundProduct = PRODUCTS.find(p =>
      p.name.toLowerCase().includes(trimmedQuery)
    );

    if (foundProduct) {
      this.router.navigate(['/products', foundProduct.id]);
    } else {
      alert('Product not found');
    }
    this.searchQuery = '';
  }
   goToWishlist() {
    this.router.navigate(['/wishlist']);
  }
}

