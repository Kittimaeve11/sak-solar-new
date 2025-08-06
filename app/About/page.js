'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import '../../styles/about.css';
import { useLocale } from '../Context/LocaleContext';  // import จาก Context ของคุณ

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

export default function AboutPage() {
  const { locale } = useLocale();  // ใช้ locale จาก Context

  const [sections, setSections] = useState({
    history: null,
    vision: null,
    mission: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchAll() {
      try {
        const historyRes = await fetch(`${baseUrl}/api/branderIDapi/12`, {
          headers: { 'X-API-KEY': apiKey },
          signal,
        });
        const historyData = await historyRes.json();

        const visionRes = await fetch(`${baseUrl}/api/branderIDapi/7`, {
          headers: { 'X-API-KEY': apiKey },
          signal,
        });
        const visionData = await visionRes.json();

        const missionRes = await fetch(`${baseUrl}/api/misstionapi`, {
          headers: { 'X-API-KEY': apiKey },
          signal,
        });
        const missionData = await missionRes.json();

        setSections({
          history: historyData?.data || null,
          vision: visionData?.data || null,
          mission: missionData.status && missionData.result ? missionData.result : [],
        });
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching data:', error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAll();

    return () => {
      controller.abort();
    };
  }, [locale]); // เมื่อ locale เปลี่ยนจะ fetch ใหม่

  const renderSection = (title, content) => (
    <div className="banner-container fade-in">
      <picture>
        <source
          srcSet={`${baseUrl}/${content?.brander_pictureMoblie}`}
          media="(max-width: 768px)"
        />
        <Image
          src={`${baseUrl}/${content?.brander_picturePC}`}
          alt={
            (locale === 'th' ? content?.brander_title : content?.brander_titleEN) ||
            content?.brander_title ||
            'Image'
          }
          width={1530}
          height={800}
          className="banner-image"
        />
      </picture>

      {(locale === 'th' ? content?.brander_detail : content?.brander_detailEN || content?.brander_detail)
        ?.split('\n')
        .map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
    </div>
  );

  return (
    <main className="about-container">
      <aside className="about-sidebar">
        <h3 className="sidebar-header">{locale === 'th' ? 'เกี่ยวกับศักดิ์สยามโซลาร์' : 'About Saksiame Solar'}</h3>
        <ul className="sidebar-menu">
          <li>{locale === 'th' ? 'ประวัติความเป็นมา' : 'History'}</li>
          <li>{locale === 'th' ? 'วิสัยทัศน์' : 'Vision'}</li>
          <li>{locale === 'th' ? 'พันธกิจ' : 'Mission'}</li>
        </ul>
      </aside>

      <section className="about-content">
        {loading ? (
          <div className="skeleton-banner"></div>
        ) : (
          <>
            <h2>{locale === 'th' ? 'ประวัติความเป็นมา' : 'History'}</h2>

            {sections.history && renderSection('', sections.history)}
            <h2>{locale === 'th' ? 'วิสัยทัศน์' : 'Vision'}</h2>

            {sections.vision && renderSection('', sections.vision)}

            <h2>{locale === 'th' ? 'พันธกิจ' : 'Mission'}</h2>
            <ul className="mission-list">
              {sections.mission.map((item, index) => (
                <li
                  key={item.mission_ID || `mission-${index}`}
                  className="mission-item"
                >
                  {item.picture && (
                    <Image
                      src={`${baseUrl}/${item.picture}`}
                      alt="พันธกิจ" width={90}
                      height={90}
                      className="mission-icon"
                    />
                  )}
                  <span className="mission-text">
                    {locale === 'th' ? item.titleTH : item.titleEN || item.titleTH}
                  </span>                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
