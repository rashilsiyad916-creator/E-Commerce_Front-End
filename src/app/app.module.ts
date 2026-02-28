import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { WishlistPageComponent } from './features/wishlist/pages/wishlist-page/wishlist-page.component';
@NgModule({
  declarations: [
    AppComponent,
    WishlistPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    ToastrModule.forRoot({
    positionClass: 'toast-top-right',
    timeOut: 2000,
    closeButton: true,
    progressBar: true }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
