// app/page.jsx
'use client';

import SlideEditorial from './components/Home/SlideEditorial';  // ปรับ path ตามโฟลเดอร์จริงของคุณ
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

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const { locale } = useLocale();
  const [productOptions, setProductOptions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);

  useEffect(() => {
    fetch('/api/home-page')
      .then((res) => res.json())
      .then((data) => setContacts(data.contacts));
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

  // ตัวอย่างเตรียมข้อมูลสินค้าสำหรับ ProductCarousel
  const solarRooftopItems =
    products
      .find((p) => p.slug === 'solar-rooftop')
      ?.brands.flatMap((brand) =>
        brand.packages?.flatMap((pkg) =>
          pkg.items.map((item) => ({
            ...item,
            name: `${item.inverter_model} (${brand.name})`,
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
          name: `${item.model} (${brand.name})`,
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

      <FreeServices contacts={contacts} locale={locale} />

      <div>
        <ProductCarousel
          title="Solar Rooftop"
          items={solarRooftopItems}
          link="/products/solar-rooftop"
        />
        <ProductCarousel
          title="Solar Air"
          items={solarAirItems}
          link="/products/solar-air"
        />
      </div>

      <SolarCalculatorForm />

      <ContactForm
        productOptions={productOptions}
        provinces={provinces}
        amphures={amphures}
        tambons={tambons}
      />
      <SlideEditorial />
      <SlidePortfolio />
      <SlideReview />
    </>
  );
}
