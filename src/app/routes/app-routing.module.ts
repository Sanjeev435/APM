import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product/product-list.component';
import { WelcomeComponent } from '../home/welcome.component';
import { ProductDetailComponent } from '../product/product-detail/product-detail.component';
import { ProductGuard } from '../product/guard/product.guard';

const routes: Routes = [
{path: 'products', component: ProductListComponent },
{path: 'welcome', component: WelcomeComponent },
{path: 'product/:id', canActivate: [ProductGuard], component: ProductDetailComponent },
{path: '', redirectTo: 'welcome', pathMatch: 'full' },
{path: '**', redirectTo: 'welcome', pathMatch: 'full' },
]

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule{}