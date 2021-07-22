export interface ProductPackage {
  id: string;
  createdAt: string;
  name: string;
  code: string;
  price: string;
  rate_plans: RatePlan[];
}

export interface RatePlan {
  createdAt: string;
  name: string;
  code: string;
  id: string;
  product_packageId: string;
  billing_products?: BillingProduct[];
}

export interface BillingProduct {
  rate_planId: string;
  id: string;
  price: string;
  code: string;
  name: string;
  createdAt: string;
}
