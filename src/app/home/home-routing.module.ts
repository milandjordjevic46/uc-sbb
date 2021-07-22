import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductPackageDetailsComponent } from './product-package-list/product-package-details/product-package-details.component';
import { RatePlanDetailsComponent } from './product-package-list/product-package-details/rate-plan-list/rate-plan-details/rate-plan-details.component';
import { ProductPackageListComponent } from './product-package-list/product-package-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ProductPackageListComponent },
      { path: ':productPackageId', component: ProductPackageDetailsComponent },
      {
        path: ':productPackageId/rate_plan/:ratePlanId',
        component: RatePlanDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
