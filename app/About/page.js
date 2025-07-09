'use client';

import { useEffect, useState } from 'react';
import '../../styles/about.css';

export default function AboutPage() {
  const [sections, setSections] = useState({});
  const [activeKey, setActiveKey] = useState('history');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/about');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setSections(data.sections);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const content = sections[activeKey];

  const menuItems = [
    { key: 'history', label: 'ประวัติความเป็นมา' },
    { key: 'vision', label: 'วิสัยทัศน์' },
    { key: 'mission', label: 'พันธกิจ' },
    { key: 'committee', label: 'คณะกรรมการ' }
  ];

  return (
    <main className="about-container">
      <aside className="about-sidebar">
        <h3 className="sidebar-header">เกี่ยวกับศักดิ์สยามโซลาร์</h3>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={activeKey === item.key ? 'active' : ''}
              onClick={() => setActiveKey(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      <section className="about-content">
        {content ? (
          <>
            <h2>{content.title}</h2>

            {/* กรณีเมนูคณะกรรมการ */}
            {activeKey === 'committee' && content.members && content.members.length > 0 && (
              <>
                {/* แสดงบอสแยกบรรทัดบน */}
                <div className="board-big">
                  <div className="board-photo-wrapper">
                    <img
                      src={content.members[0].photo}
                      alt={content.members[0].name}
                      className="board-photo"
                    />
                    <div className="board-caption">
                      <strong className="member-name-big">{content.members[0].name}</strong>
                      <div className="member-position-big">{content.members[0].position}</div>
                    </div>
                  </div>
                </div>

                {/* แสดงสมาชิกทั่วไปเป็นกริด */}
                <div className="board-grid">
                  {content.members.slice(1).map((member) => (
                    <div className="board-box" key={member.name}>
                      <div className="board-photo-wrapper">
                        <img src={member.photo} alt={member.name} className="board-photo" />
                        <div className="board-caption">
                          <strong className="member-name">{member.name}</strong>
                          <div className="member-position">{member.position}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* เนื้อหาแบบย่อหน้า (สำหรับเมนูอื่น ๆ) */}
            {content.content &&
              content.content.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}

            {/* รองรับภาพเดียวหรือหลายภาพ */}
            {Array.isArray(content.image) ? (
              <div className="image-gallery">
                {content.image.map((img, idx) => (
                  <img key={idx} src={img} alt={content.title + idx} />
                ))}
              </div>
            ) : (
              content.image && (
                <div className="image-gallery">
                  <img src={content.image} alt={content.title} />
                </div>
              )
            )}
          </>
        ) : (
          <p>กำลังโหลด...</p>
        )}
      </section>
    </main>
  );
}
