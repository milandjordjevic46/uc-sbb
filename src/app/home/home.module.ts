import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CloudService, CloudServiceImpl } from './services/cloud.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import {
  LoaderService,
  LoaderServiceImpl,
} from '../shared/services/loader.service';
import {
  ErrorHandlingService,
  ErrorHandlingServiceImpl,
} from '../shared/services/error-handling.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from '../shared/services/http.config.interceptor';
import { ProductPackageComponent } from './product-package-list/product-package/product-package.component';
import { RatePlanListComponent } from './product-package-list/product-package-details/rate-plan-list/rate-plan-list.component';
import { ProductPackageListComponent } from './product-package-list/product-package-list.component';
import { ProductPackageDetailsComponent } from './product-package-list/product-package-details/product-package-details.component';
import { RatePlanComponent } from './product-package-list/product-package-details/rate-plan-list/rate-plan/rate-plan.component';
import { RatePlanDetailsComponent } from './product-package-list/product-package-details/rate-plan-list/rate-plan-details/rate-plan-details.component';
import { BillingProductsListComponent } from './product-package-list/product-package-details/rate-plan-list/rate-plan-details/billing-products-list/billing-products-list.component';
import { BillingProductComponent } from './product-package-list/product-package-details/rate-plan-list/rate-plan-details/billing-products-list/billing-product/billing-product.component';
@NgModule({
  declarations: [
    HomeComponent,
    LoaderComponent,
    ProductPackageComponent,
    RatePlanListComponent,
    ProductPackageListComponent,
    ProductPackageDetailsComponent,
    RatePlanComponent,
    RatePlanDetailsComponent,
    BillingProductsListComponent,
    BillingProductComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule, MaterialModule],
  providers: [
    { provide: CloudService, useClass: CloudServiceImpl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    {
      provide: LoaderService,
      useClass: LoaderServiceImpl,
    },
    {
      provide: ErrorHandlingService,
      useClass: ErrorHandlingServiceImpl,
    },
  ],
})
export class HomeModule {}
