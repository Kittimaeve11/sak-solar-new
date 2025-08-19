'use client';

import SlideEditorial from './components/Home/SlideEditorial';
import BannerSlider from './components/BannerSlider';
import FreeServices from './components/Home/FreeServices';
import SolarFormnew from './components/Home/SolarFormnew';
import ContactForm from './components/Home/ContactForm';
import ProductCarousel from './components/Home/ProductCarousel';
import { useLocale } from './Context/LocaleContext';
import { useEffect, useState } from 'react';
import SlidePortfolio from './components/Home/SlidePortfolio';
import SlideReview from './components/Home/SlideReview';
import { useSearchParams } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const { locale } = useLocale();
  const [productTypes, setProductTypes] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const searchParams = useSearchParams();
  const productFromUrl = searchParams.get('product') || '';

  useEffect(() => {
    async function loadData() {
      try {
        const [serviceRes, provRes, amphRes, tambRes, prodRes] = await Promise.all([
          fetch(`${baseUrl}/api/serviceapi`, { headers: { 'X-API-KEY': apiKey } }),
          fetch('/data/thai_provinces.json'),
          fetch('/data/thai_amphures.json'),
          fetch('/data/thai_tambons.json'),
          fetch(`http://localhost:8080/api/productmainpageapi`, { headers: { 'X-API-KEY': apiKey } })
        ]);

        const [serviceData, prov, amph, tamb, prodData] = await Promise.all([
          serviceRes.json(),
          provRes.json(),
          amphRes.json(),
          tambRes.json(),
          prodRes.json()
        ]);

        // services
        if (serviceData.status && serviceData.result) {
          setServices(serviceData.result);
        } else {
          setServices([]);
        }

        // provinces / amphures / tambons
        setProvinces(prov);
        setAmphures(amph);
        setTambons(tamb);

        // products
        if (prodData.status && prodData.result) {
          setProductTypes(prodData.result);
        } else {
          setProductTypes([]);
        }

      } catch (error) {
        console.error('Error loading data:', error);
        setServices([]);
        setProductTypes([]);
      } finally {
        setLoadingServices(false);
      }
    }

    loadData();
  }, []);

  // scroll ไปที่ contact ถ้า URL มี ?product=
  useEffect(() => {
    if (productFromUrl) {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, [productFromUrl]);

  return (
    <>
      <BannerSlider />

      <h5 className="headline">
        ติดตั้งโซลาร์เซลล์กับทีมช่างที่ได้มารฐาน <br />
        และได้รับการรับรองจากการไฟฟ้า (PEA)
      </h5>

      <FreeServices contacts={services} locale={locale} loading={loadingServices} baseUrl={baseUrl} />

      <div>
        {productTypes.map((ptype) => {
          const items = ptype.Products?.map((prod) => {
            let displayName = '';

            // ถ้ามี modelname ใช้อันนี้ก่อน
            if (prod.modelname && prod.modelname.trim() !== '') {
              displayName = prod.modelname;
            }
            // ถ้าไม่มี modelname แต่มี installationsize + solarpanel → ใช้รวมกัน
            else if (prod.installationsize && prod.solarpanel) {
              displayName = `${prod.installationsize} - ${prod.solarpanel}`;
            }
            // ถ้าไม่มีทั้งคู่ → fallback แค่ installationsize หรือ solarpanel
            else if (prod.installationsize) {
              displayName = prod.installationsize;
            } else if (prod.solarpanel) {
              displayName = prod.solarpanel;
            } else {
              displayName = 'ไม่พบข้อมูลชื่อสินค้า';
            }

            return {
              ...prod,
              name: displayName,
              image: prod.gallery ? `${baseUrl}/${JSON.parse(prod.gallery)[0]}` : null,
            };
          }) || [];


          return (
            <ProductCarousel
              key={ptype.producttypeID}
              title={locale === 'th' ? ptype.producttypenameTH : ptype.producttypenameEN}
              items={items}
              link={`/products/${ptype.producttypeID}`}
            />
          );
        })}
      </div>

      <SolarFormnew />

      <div id="contact">
        <ContactForm
          productOptions={productTypes}
          provinces={provinces}
          amphures={amphures}
          tambons={tambons}
          initialProduct={productFromUrl}
        />
      </div>

      <SlideEditorial />
      <SlidePortfolio />
      <SlideReview />
    </>
  );
}
