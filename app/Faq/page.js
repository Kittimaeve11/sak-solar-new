'use client';

import { useEffect, useRef, useState } from 'react';
import '../../styles/faq.css';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  // ✅ state สำหรับ banner
  const [brander, setBrander] = useState([]);
  const [loadingBanner, setLoadingBanner] = useState(true);

  useEffect(() => {
    // ---------- SEO ----------
    document.title =
      'คำถามที่พบบ่อย | บริษัท ศักดิ์สยาม โซลาร์ เอ็นเนอร์ยี่ จำกัด';
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute('faq', 'คำถามที่พบบ่อย');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'หน้าคำถามที่พบบ่อย';
      document.head.appendChild(meta);
    }

    // ---------- Fetch FAQs ----------
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/FQAapi`, {
          headers: { 'X-API-KEY': apiKey },
        });
        const data = await res.json();
        if (data.status && data.result) {
          setFaqs(data.result);
        } else {
          setFaqs([]);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        setFaqs([]);
      }
    };

    // ---------- Fetch Banner ----------
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/branderIDapi/1`, {
          method: 'GET',
          headers: { 'X-API-KEY': apiKey },
        });
        const branderData = await res.json();

        const branderArray = Array.isArray(branderData.data)
          ? branderData.data
          : branderData.data
          ? [branderData.data]
          : [];

        setBrander(branderArray);
      } catch (error) {
        console.error('Error fetching banner:', error);
      } finally {
        setLoadingBanner(false);
      }
    };

    // ---------- Fetch ทั้งหมด ----------
    fetchFaqs();
    fetchBanner();

    // ---------- Update Animation ----------
    const updateHeights = () => {
      answerRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === openIndex) {
          el.style.maxHeight = el.scrollHeight + 'px';
          el.style.paddingTop = '0rem';
          el.style.paddingBottom = '1rem';
        } else {
          el.style.maxHeight = '0px';
          el.style.paddingTop = '0';
          el.style.paddingBottom = '0';
        }
      });
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(updateHeights);
    }, 30);

    return () => clearTimeout(timeout);
  }, [openIndex, faqs]); // ✅ รวม dependency ไว้ที่นี่

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const cleanHtml = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/^"|"$/g, '')
      .replace(/\\\//g, '/')
      .replace(/\\"/g, '"')
      .replace(/&nbsp;/g, ' ')
      .replace(/\\n/g, '')
      .replace(/ style="[^"]*"/g, '')
      .trim();
  };

  return (
    <div>
      {/* ✅ Banner จาก API */}
      {loadingBanner ? (
        <div className="skeleton-banner"></div>
      ) : (
        brander.map((item) => (
          <div className="banner-container" key={item.brander_ID}>
            <picture>
              <source
                srcSet={`${baseUrl}/${item.brander_pictureMoblie}`}
                media="(max-width: 768px)"
              />
              <Image
                src={`${baseUrl}/${item.brander_picturePC}`}
                alt={item.brander_name || 'FAQ Banner'}
                className="banner-image"
                width={1530}
                height={800}
                unoptimized
              />
            </picture>
          </div>
        ))
      )}

      <main className="layout-container">
        <h1 className="headtitle">คำถามที่พบบ่อยเกี่ยวกับโซลาร์เซลล์</h1>

        {faqs.map((item, index) => (
          <div
            key={item.fqa_id}
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
          >
            <button
              onClick={() => toggle(index)}
              className="faq-button"
              type="button"
            >
              {cleanHtml(item.fqa_questionTH)}
              <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>
                <MdOutlineArrowForwardIos />
              </span>
            </button>

            <div
              ref={(el) => (answerRefs.current[index] = el)}
              className={`faq-answer ${openIndex === index ? 'open' : ''}`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: cleanHtml(item.fqa_answersTH),
                }}
              />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
