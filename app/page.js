// HomePage.jsx
'use client';

import { useLocale } from './Context/LocaleContext';
import './globals.css';
import styles from './Home.module.css';
import Image from 'next/image';
import BannerSlider from './components/BannerSlider';
import { useEffect, useState } from 'react';
import FreeServices from './components/Home/FreeServices';
import SolarCalculatorForm from './components/Home/SolarCalculatorForm';
import ContactForm from './components/Home/ContactForm';
import { products } from './data/products';

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
        fetch('/data/thai_provinces.json').then(res => res.json()),
        fetch('/data/thai_amphures.json').then(res => res.json()),
        fetch('/data/thai_tambons.json').then(res => res.json()),
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

  return (
    <>
      <BannerSlider />
      <h5 className="headline">
        ติดตั้งโซลาร์เซลล์กับทีมช่างที่ได้มารฐาน <br />
        และได้รับการรับรองจากการไฟฟ้า (PEA)
      </h5>

      <FreeServices contacts={contacts} locale={locale} />

      <SolarCalculatorForm />

      <ContactForm
        productOptions={productOptions}
        provinces={provinces}
        amphures={amphures}
        tambons={tambons}
      />
    </>
  );
}