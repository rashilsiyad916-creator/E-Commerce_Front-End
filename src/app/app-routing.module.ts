import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { authGuard } from './core/auth.guard';
import { WishlistPageComponent } from './features/wishlist/pages/wishlist-page/wishlist-page.component';
const routes: Routes = [
  {path:'',loadChildren:()=>import('./features/home/home.module').then(m=>m.HomeModule)},
  {path:'home',redirectTo:'',pathMatch:'full'},
  {path:'auth',loadChildren:()=>import('./features/auth/auth.module').then(m=>m.AuthModule)},
  {path:'products',loadChildren:()=>import('./features/products/products.module').then(m=>m.ProductsModule)},
  {path:'cart',loadChildren:()=>import('./features/cart/cart.module').then(m => m.CartModule),canActivate:[authGuard]},
  {path:'checkout',loadChildren:()=>import('./features/checkout/checkout.module').then(m=>m.CheckoutModule),canActivate:[authGuard]},
  {path:'orders',loadChildren:()=>import('./features/orders/orders.module').then(m=>m.OrdersModule)},
  {path:'profile', loadChildren:() => import('./features/profile/profile.module').then(m => m.ProfileModule) },
  {path:'wishlist',component:WishlistPageComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
