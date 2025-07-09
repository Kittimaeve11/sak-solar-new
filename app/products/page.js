'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '../data/products';
import '../../styles/products.css';

export default function ProductsPage() {
  const categories = products.map(({ id, name }) => ({ id, name }));

  const allItems = products.flatMap((category) =>
    category.brands.flatMap((brand) => {
      if (brand.packages) {
        return brand.packages.flatMap((pkg) =>
          pkg.items.map((item) => ({
            ...item,
            id: item.id,
            brand: brand.name,
            brandImage: brand.brandImage || '',
            category: category.name,
            categoryId: category.id,
            mainImage: item.mainImage || pkg.mainImage || brand.mainImage || '',
            name: item.inverter_model || item.model || 'ไม่มีชื่อสินค้า',
            price: item.price || null,
          }))
        );
      }
      return (
        brand.items?.map((item) => ({
          ...item,
          id: item.id,
          brand: brand.name,
          brandImage: brand.brandImage || '',
          category: category.name,
          categoryId: category.id,
          mainImage: item.mainImage || brand.mainImage || '',
          name: item.inverter_model || item.model || 'ไม่มีชื่อสินค้า',
          price: item.price || null,
        })) || []
      );
    })
  );

  const allBrands = products
    .flatMap((cat) => cat.brands)
    .filter((b, i, arr) => arr.findIndex(x => x.name === b.name) === i);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBrand = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
  };

  const filteredItems = allItems.filter((item) => {
    const matchCategory =
      selectedCategories.length === 0 || selectedCategories.includes(item.categoryId);
    const matchBrand =
      selectedBrands.length === 0 || selectedBrands.includes(item.brand);
    return matchCategory && matchBrand;
  });

  return (
    <main className="products-container">
      <aside className="products-sidebar">
        <div className="sidebar-header">คัดกรองสินค้า</div>

        <section>
          <h3>หมวดหมู่สินค้า</h3>
          <div className="filter-box">
            {categories.map(({ id, name }) => (
              <label key={id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(id)}
                  onChange={() => toggleCategory(id)}
                />
                {name}
              </label>
            ))}
          </div>
        </section>

        <hr className="divider" />

        <section>
          <h3>ยี่ห้อ</h3>
          <div className="filter-box">
            {allBrands.map((brand) => (
              <label key={brand.name} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => toggleBrand(brand.name)}
                />
                {brand.name}
              </label>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
          <button
            className="buttonPrimaryorange"
            style={{ display: 'block', marginLeft: 'auto', marginRight: '16px', marginTop: '16px' }}
            onClick={() => {
              setSelectedCategories([]);
              setSelectedBrands([]);
            }}
          >
            ลบการกรองสินค้าที่เลือก
          </button>
        )}
      </aside>

      <section className="products-list">
        <h2>
          สินค้า{' '}
          {(selectedCategories.length > 0 || selectedBrands.length > 0) &&
            `(ประเภท ${selectedCategories.length}, ยี่ห้อ ${selectedBrands.length})`}
        </h2>

        {filteredItems.length === 0 ? (
          <p className="no-products">ไม่มีสินค้าในตอนนี้</p>
        ) : (
          <div className="products-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="product-card">
                {item.mainImage && (
                  <div className="product-image-wrapper">
                    <Image
                      src={item.mainImage}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="product-info">
                  <h3 className="product-name">{item.name}</h3>
                  <p className="product-price">
                    {item.price ? `฿ ${item.price.toLocaleString()} ` : 'ราคา'}
                  </p>
                  {/* <p className="meta">{item.category} / {item.brand}</p> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
