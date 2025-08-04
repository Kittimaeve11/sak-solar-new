'use client';

import { useEffect, useRef, useState } from 'react';
import '../../styles/faq.css';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${baseUrl}/api/FQAapi`, {
          headers: {
            'X-API-KEY': apiKey,
          },
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
    }

    fetchServices();
  }, []);

  useEffect(() => {
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

    // รอ DOM render + dangerouslySetInnerHTML render เสร็จ
    const timeout = setTimeout(() => {
      requestAnimationFrame(updateHeights);
    }, 30); // เลือก delay ที่เหมาะสม

    return () => clearTimeout(timeout);
  }, [openIndex, faqs]);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

const cleanHtml = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/^"|"$/g, '')              // ลบ " รอบนอก
    .replace(/\\\//g, '/')              // แก้ \/ เป็น /
    .replace(/\\"/g, '"')               // แก้ \" เป็น "
    .replace(/&nbsp;/g, ' ')            // แก้ &nbsp; เป็น space
    .replace(/\\n/g, '')                // ลบ \n
    .replace(/ style="[^"]*"/g, '')     // ลบ inline style attribute ทั้งหมด
    .trim();
};


  return (
    <div>
      <div className="banner-container">
        <picture>
          <source
            srcSet="/banner/FAQ-Page/Mobile-FAQ1.jpg"
            media="(max-width: 768px)"
          />
          <img
            src="/banner/FAQ-Page/PC-FAQ1.jpg"
            alt="Contact Banner"
            className="banner-image"
          />
        </picture>
      </div>

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
              <span
                className={`faq-icon ${openIndex === index ? 'open' : ''}`}
              >
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
