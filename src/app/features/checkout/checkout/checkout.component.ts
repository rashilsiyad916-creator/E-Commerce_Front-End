import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/core/order.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalAmount: number = 0;
  address: any = null;
  paymentMethod: string = 'Credit Card';

  constructor(private cartService: CartService, private router: Router,private orderService:OrdersService,private toastrService:ToastrService) {}

ngOnInit() {

  const cartItems = this.cartService.getCartItems();

  if (cartItems.length > 0) {

    
    this.totalAmount = this.cartService.getTotal();

    
    localStorage.removeItem('buyNowProduct');

  } else {

    const buyNowProduct = localStorage.getItem('buyNowProduct');

    if (buyNowProduct) {
      const product = JSON.parse(buyNowProduct);
      this.totalAmount = product.price;
    }
  }

  const storedAddress = localStorage.getItem('userAddress');
  if (storedAddress) {
    this.address = JSON.parse(storedAddress);
  }
}
placeOrder() {

  const cartItems = this.cartService.getCartItems();

  if (cartItems.length > 0) {

    this.orderService.saveOrder(cartItems);
    this.cartService.clearCart();

  } else {

    const buyNowProduct = localStorage.getItem('buyNowProduct');

    if (buyNowProduct) {
      const product = JSON.parse(buyNowProduct);
      this.orderService.saveOrder([{ product, quantity: 1 }]);
      localStorage.removeItem('buyNowProduct');
    }
  }

  this.toastrService.success('Order Placed Successfully');
  this.router.navigate(['/orders']);
}
}


