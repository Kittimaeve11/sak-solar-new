'use client';

import SlideEditorial from './components/Home/SlideEditorial';
import BannerSlider from './components/BannerSlider';
import FreeServices from './components/Home/FreeServices';
import SolarCalculatorForm from './components/Home/SolarCalculatorForm';
import ContactForm from './components/Home/ContactForm';
import ProductCarousel from './components/Home/ProductCarousel';
import { products } from './data/products';
import { useLocale } from './Context/LocaleContext';
import { useEffect, useState } from 'react';
import SlidePortfolio from './components/Home/SlidePortfolio';
import SlideReview from './components/Home/SlideReview';
import { useSearchParams } from 'next/navigation';
import SolarFormnew from './components/Home/SolarFormnew';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const { locale } = useLocale();
  const [productOptions, setProductOptions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [topics, setTopics] = useState([]);
  const searchParams = useSearchParams();
  const productFromUrl = searchParams.get('product') || '';

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${baseUrl}/api/serviceapi`, {
          headers: {
            'X-API-KEY': apiKey
          }
        });
        const data = await res.json();
        if (data.status && data.result) {
          setServices(data.result);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const [prov, amph, tamb] = await Promise.all([
        fetch('/data/thai_provinces.json').then((res) => res.json()),
        fetch('/data/thai_amphures.json').then((res) => res.json()),
        fetch('/data/thai_tambons.json').then((res) => res.json()),
      ]);
      setProvinces(prov);
      setAmphures(amph);
      setTambons(tamb);
    };
    loadData();
  }, []);

  useEffect(() => {
    setProductOptions(products);
  }, []);

  useEffect(() => {
    if (productFromUrl) {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, [productFromUrl]);

  // เตรียมสินค้าเหมือนเดิม
  const solarRooftopItems =
    products
      .find((p) => p.slug === 'solar-rooftop')
      ?.brands.flatMap((brand) =>
        brand.packages?.flatMap((pkg) =>
          pkg.items.map((item) => ({
            ...item,
            name: `${item.inverter_model} `,
            image: item.mainImage,
          }))
        )
      ) || [];

  const solarAirItems =
    products
      .find((p) => p.slug === 'solar-air')
      ?.brands.flatMap((brand) =>
        brand.items?.map((item) => ({
          ...item,
          name: `${item.model} `,
          image: item.mainImage,
        }))
      ) || [];

  return (
    <>
      <BannerSlider />

      <h5 className="headline">
        ติดตั้งโซลาร์เซลล์กับทีมช่างที่ได้มารฐาน <br />
        และได้รับการรับรองจากการไฟฟ้า (PEA)
      </h5>

      <FreeServices contacts={services} locale={locale} loading={loadingServices} baseUrl={baseUrl} />

      <div>
        {products.map((product) => {
          const items =
            product.brands?.flatMap((brand) => {
              // กรณีมี packages (แบบ Solar Rooftop)
              if (brand.packages) {
                return brand.packages.flatMap((pkg) =>
                  pkg.items.map((item) => ({
                    ...item,
                    name: item.inverter_model || item.model || '', // ใช้อะไรเป็นชื่อก็ได้
                    image: item.mainImage,
                  }))
                );
              }
              // กรณีไม่มี packages (แบบ Solar Air)
              if (brand.items) {
                return brand.items.map((item) => ({
                  ...item,
                  name: item.model || item.inverter_model || '',
                  image: item.mainImage,
                }));
              }
              return [];
            }) || [];

          return (
            <ProductCarousel
              key={product.id}
              title={product.name[locale] || product.name.en}
              items={items}
              link={`/products/${product.slug}`}
            />
          );
        })}
      </div>

      {/* <SolarCalculatorForm /> */}
      <SolarFormnew />

      <div id="contact">
        <ContactForm
          productOptions={productOptions}
          provinces={provinces}
          amphures={amphures}
          tambons={tambons}
          initialProduct={productFromUrl}
        />
      </div>
      {/* <SlideEditorial /> */}
      <SlidePortfolio />
      <SlideReview />
    </>
  );
}