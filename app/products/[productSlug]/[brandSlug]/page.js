import React, { use } from 'react';
import ProductsPage from '@/app/components/products/ProductsPageContent';
import { products } from '@/app/data/products';

export default function ProductBrandPage({ params }) {
  // unwrap params
  const { productSlug, brandSlug } = use(params);

  const product = products.find((p) => p.slug === productSlug);
  if (!product) {
    return <div>ไม่พบหมวดหมู่สินค้า</div>;
  }

  const brand = product.brands.find((b) => b.slug === brandSlug);
  if (!brand) {
    return <div>ไม่พบสินค้า</div>;
  }

  return (
    <ProductsPage
      preSelectedCategoryId={product.id}
      preSelectedBrandNames={[brand.name]}
    />
  );
}
