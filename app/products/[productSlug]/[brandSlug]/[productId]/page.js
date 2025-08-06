import React from 'react';
import Image from 'next/image';
import { products } from '@/app/data/products';

export default function ProductDetailPage({ params }) {
  const { categoryId, brand, productId } = params;

  // สมมติ products แต่ละตัวมีฟิลด์ productSlug และ brandSlug
  const category = products.find(cat => cat.productSlug === categoryId);
  if (!category) {
    return <main><p>ไม่พบหมวดหมู่สินค้า</p></main>;
  }

  const brandData = category.brands.find(b => b.brandSlug === brand);
  if (!brandData) {
    return <main><p>ไม่พบแบรนด์สินค้า</p></main>;
  }

  let product = null;
  if (brandData.packages) {
    for (const pkg of brandData.packages) {
      product = pkg.items.find(i => String(i.id) === productId);
      if (product) break;
    }
  } else {
    product = brandData.items.find(i => String(i.id) === productId);
  }

  if (!product) {
    return <main><p>ไม่พบสินค้า</p></main>;
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>{product.inverter_model || product.model || 'ไม่มีชื่อสินค้า'}</h1>
      {product.mainImage && (
        <div style={{ position: 'relative', width: 300, height: 200 }}>
          <Image
            src={product.mainImage}
            alt={product.model || 'product image'}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      )}
      <p>ราคา: {product.price ? product.price.toLocaleString() : 'ไม่ระบุราคา'}</p>
    </main>
  );
}
