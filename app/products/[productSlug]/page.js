import { use } from 'react';
import ProductsPage from '@/app/components/products/ProductsPageContent';
import { products } from '@/app/data/products';

export default function ProductCategoryPage({ params }) {
  const { productSlug } = use(params);

  const product = products.find((p) => p.slug === productSlug);

  if (!product) {
    return <div>ไม่พบหมวดหมู่สินค้า</div>;
  }

  return (
    <ProductsPage
      preSelectedCategoryId={product.id}
      preSelectedBrandNames={[]} // ไม่มียี่ห้อเริ่มต้น
    />
  );
}
