'use client';

import { useEffect, useRef, useState } from 'react';
import '../../styles/faq.css';
import { MdOutlineArrowForwardIos } from "react-icons/md";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  useEffect(() => {
    async function fetchFAQs() {
      const res = await fetch('/api/faq');
      const data = await res.json();
      setFaqs(data.faqs || []);
    }
    fetchFAQs();
  }, []);

  useEffect(() => {
    answerRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === openIndex) {
        el.style.maxHeight = el.scrollHeight + "px";
      } else {
        el.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);


  const toggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div>
      <div className="banner-container">
        <picture>
          <source srcSet="/banner/FAQ-Page/Mobile-FAQ1.jpg" media="(max-width: 768px)" />
          <img src="/banner/FAQ-Page/PC-FAQ1.jpg" alt="Contact Banner" className="banner-image" />
        </picture>
      </div>


      <main className='layout-container'>

        <h1 className="headtitle">คำถามที่พบบ่อยเกี่ยวกับโซลาร์เซลล์</h1>
        <div id="leaves-container"></div>

        {faqs.map((item, index) => (
          <div key={item.id} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
            <button onClick={() => toggle(index)} className="faq-button" type="button">
              {item.question}
              <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>
                <MdOutlineArrowForwardIos />
              </span>
            </button>

            <div
              ref={el => answerRefs.current[index] = el}
              className={`faq-answer ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggle(index)}
            // ลบ inline style maxHeight เพราะจัดการผ่าน useEffect แล้ว
            >
              {item.answer.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
