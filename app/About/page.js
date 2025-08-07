'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/about.css';
import { useLocale } from '../Context/LocaleContext';
import { usePathname } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

export default function AboutPage() {
  const { locale } = useLocale();

  const [sections, setSections] = useState({
    history: null,
    vision: null,
    mission: [],
    teams: [],
  });

  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('history'); // ค่าเริ่มต้น

  const [pendingScrollId, setPendingScrollId] = useState(null);

  const pathname = usePathname();


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchAll() {
      try {
        const [historyRes, visionRes, missionRes, teamsRes] = await Promise.all([
          fetch(`${baseUrl}/api/branderIDapi/12`, { headers: { 'X-API-KEY': apiKey }, signal }),
          fetch(`${baseUrl}/api/branderIDapi/7`, { headers: { 'X-API-KEY': apiKey }, signal }),
          fetch(`${baseUrl}/api/misstionapi`, { headers: { 'X-API-KEY': apiKey }, signal }),
          fetch(`${baseUrl}/api/teamsapi`, { headers: { 'X-API-KEY': apiKey }, signal }),
        ]);

        const historyData = await historyRes.json();
        const visionData = await visionRes.json();
        const missionData = await missionRes.json();
        const teamsData = await teamsRes.json();

        setSections({
          history: historyData?.data || null,
          vision: visionData?.data || null,
          mission: missionData.status && missionData.result ? missionData.result : [],
          teams: teamsData.status && teamsData.result ? teamsData.result : [],
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
    return () => controller.abort();
  }, [locale]);

  // Scroll to section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Handle menu click: set active menu and scroll
  const handleMenuClick = (e, menu) => {
    e.preventDefault();
    setSelectedMenu(menu);

    // ตั้ง pendingScrollId ทุกเมนู
    setPendingScrollId(menu);
  };


  // Track which section is in viewport and update selectedMenu
  useEffect(() => {
    if (selectedMenu === 'teams') return; // ถ้าเลือก teams อย่าเปลี่ยน active ตาม scroll

    const sectionIds = ['history', 'vision', 'mission'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelectedMenu(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0% 0px -90% 0px', // กำหนดช่วง viewport ที่ต้องการ
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading, selectedMenu]);

useEffect(() => {
  if (pendingScrollId) {
    const el = document.getElementById(pendingScrollId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setPendingScrollId(null);
    } else {
      const retryScroll = setTimeout(() => {
        const elRetry = document.getElementById(pendingScrollId);
        if (elRetry) {
          elRetry.scrollIntoView({ behavior: 'smooth' });
          setPendingScrollId(null);
        }
      }, 100); // ลองปรับเพิ่มเป็น 200 ถ้า 100 ยังเร็วไป

      return () => clearTimeout(retryScroll);
    }
  }
}, [pendingScrollId, loading]);

  useEffect(() => {
    // ตรวจสอบว่า URL มี hash หรือไม่
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          // ใช้ setTimeout เพื่อรอให้ DOM โหลดเสร็จ (สำคัญมาก)
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100); // ลองปรับระยะเวลาให้เหมาะสม
        }
      }
    }
  }, [pathname]);

  const renderSection = (content) => (
    <div className="banner-container fade-in">
      <picture>
        <source srcSet={`${baseUrl}/${content?.brander_pictureMoblie}`} media="(max-width: 768px)" />
        <Image
          src={`${baseUrl}/${content?.brander_picturePC}`}
          alt={(locale === 'th' ? content?.brander_title : content?.brander_titleEN) || 'Image'}
          width={1530}
          height={800}
          className="banner-image"
        />
      </picture>
      {(locale === 'th' ? content?.brander_detail : content?.brander_detailEN || content?.brander_detail)?.split('\n').map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );

  return (
    <main className="about-container">
      <aside className="about-sidebar">
        <h3 className="sidebar-header">{locale === 'th' ? 'เกี่ยวกับศักดิ์สยามโซลาร์' : 'About Saksiam Solar'}</h3>
        <ul className="sidebar-menu">
          <li>
            <Link
              href="#history"
              className={selectedMenu === 'history' ? 'active' : ''}
              onClick={(e) => handleMenuClick(e, 'history')}
              scroll={false}
            >
              {locale === 'th' ? 'ประวัติความเป็นมา' : 'History'}
            </Link>
          </li>
          <li>
            <Link
              href="#vision"
              className={selectedMenu === 'vision' ? 'active' : ''}
              onClick={(e) => handleMenuClick(e, 'vision')}
              scroll={false}
            >
              {locale === 'th' ? 'วิสัยทัศน์' : 'Vision'}
            </Link>
          </li>
          <li>
            <Link
              href="#mission"
              className={selectedMenu === 'mission' ? 'active' : ''}
              onClick={(e) => handleMenuClick(e, 'mission')}
              scroll={false}
            >
              {locale === 'th' ? 'พันธกิจ' : 'Mission'}
            </Link>
          </li>
          <li>
            <Link
              href="/about#teams" // <- เปลี่ยนตรงนี้ให้ถูกต้องตาม path ของหน้าเป้าหมาย
              className={selectedMenu === 'teams' ? 'active' : ''}
              onClick={(e) => handleMenuClick(e, 'teams')}
              scroll={false} // ปิด scroll ของ Next.js เพื่อให้ใช้ scrollIntoView เอง
            >
              {locale === 'th' ? 'คณะกรรมการ' : 'Committee'}
            </Link>
          </li>
        </ul>
      </aside>

      <section className="about-content">
        {loading ? (
          <div className="skeleton-banner"></div>
        ) : (
          <div>
            {(selectedMenu === 'history' || selectedMenu === 'vision' || selectedMenu === 'mission') && (
              <div>
                <h2 id="history" className="about-title with-lines">{locale === 'th' ? 'ประวัติความเป็นมา' : 'History'}</h2>
                {sections.history && renderSection(sections.history)}

                <h2 id="vision" className="about-title with-lines" style={{ marginTop: '30px' }}>{locale === 'th' ? 'วิสัยทัศน์' : 'Vision'}</h2>
                {sections.vision && renderSection(sections.vision)}

                <h2 id="mission" className="about-title with-lines" style={{ marginTop: '30px', marginBottom: '20px' }}>{locale === 'th' ? 'พันธกิจ' : 'Mission'}</h2>
                <ul className="mission-list">
                  {sections.mission.map((item, index) => (
                    <li key={item.mission_ID || `mission-${index}`} className="mission-item">
                      {item.picture && (
                        <Image src={`${baseUrl}/${item.picture}`} alt="พันธกิจ" width={90} height={90} className="mission-icon" />
                      )}
                      <span className="mission-text">{locale === 'th' ? item.titleTH : item.titleEN || item.titleTH}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedMenu === 'teams' && (
              <>
                {/* หัวข้อคณะกรรมการอยู่นอก teams-grid */}
                <h2
                  id="teams"
                  className="about-title with-lines scroll-target"
                  style={{ marginTop: '0px', marginBottom: '20px' }}
                >
                  {locale === 'th' ? 'คณะกรรมการ' : 'Committee'}
                </h2>

                <div className="teams-grid">
                  {/* Boss */}
                  {sections.teams.length > 0 && (
                    <div key={sections.teams[0].teamsID} className="team-boss">
                      <Image
                        src={`${baseUrl}${sections.teams[0].teams_picture}`}
                        alt={locale === 'th' ? sections.teams[0].teams_nameTH : sections.teams[0].teams_nameEN}
                        width={300}
                        height={300}
                        className="team-image"
                      />
                      <div className="team-info">
                        <p className="team-name">{locale === 'th' ? sections.teams[0].teams_nameTH : sections.teams[0].teams_nameEN}</p>
                        <p className="team-position">{locale === 'th' ? sections.teams[0].teams_positionTH : sections.teams[0].teams_positionEN}</p>
                      </div>
                    </div>
                  )}

                  {/* สมาชิกที่เหลือ */}
                  {sections.teams.slice(1).map((member) => (
                    <div key={member.teamsID} className="team-card">
                      <Image
                        src={`${baseUrl}${member.teams_picture}`}
                        alt={locale === 'th' ? member.teams_nameTH : member.teams_nameEN}
                        width={300}
                        height={300}
                        className="team-image"
                      />
                      <div className="team-info">
                        <p className="team-name">{locale === 'th' ? member.teams_nameTH : member.teams_nameEN}</p>
                        <p className="team-position">{locale === 'th' ? member.teams_positionTH : member.teams_positionEN}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
