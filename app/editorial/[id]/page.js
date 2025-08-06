"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "./EditorialDetailPage.module.css";
import Link from "next/link";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

async function getEditorialById(id) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/editorial`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.editorial.find((item) => item.id === Number(id)) || null;
}

function generateId(text, index) {
  return (
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "") +
    "-" +
    index
  );
}

function parseHeadings(content) {
  if (!Array.isArray(content)) return [];
  return content
    .map((block, index) => ({ ...block, index }))
    .filter((block) => /^h[1-2]$/.test(block.type)) // เฉพาะ h1, h2
    .map((block) => ({
      level: Number(block.type.replace("h", "")),
      text: block.text,
      id: generateId(block.text, block.index),
      key: `${block.text}-${block.index}`,
    }));
}

const HeadingTag = ({ type, id, text }) => {
  const Tag = type;
  return <Tag id={id}>{text}</Tag>;
};

export default function EditorialDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [editorial, setEditorial] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = 300; // scroll ถึงตำแหน่งนี้แล้วให้ลอย
      setIsSticky(window.scrollY >= triggerY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (id) getEditorialById(id).then(setEditorial);
  }, [id]);

  // คำนวณ headings จาก editorial.content
  const headings = useMemo(() => {
    if (!editorial) return [];
    return parseHeadings(editorial.content);
  }, [editorial]);

  // Scroll spy: ตรวจจับ scroll position แล้วอัปเดต activeId
  useEffect(() => {
    function onScroll() {
      const offset = 100;
      let currentId = null;
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top < offset) {
            currentId = heading.id;
          }
        }
      }
      if (currentId !== activeId) {
        setActiveId(currentId);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings, activeId]);

  if (!editorial) return <div className={styles.notFound}>ไม่พบบทความ</div>;

  function scrollToHeading(id) {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) {
        console.warn("Element not found for id:", id);
        return;
      }
      const yOffset = -80; // ปรับ offset ถ้ามี header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.contentBox}>
        <article className={styles.article}>
          <div className={styles.headerportfolio}>
            <h1 className={styles.title}>{editorial.title}</h1>
            <div className={styles.meta}>
              <Link href="/" className={styles.link}>
                หน้าหลัก <MdKeyboardDoubleArrowRight style={{ fontSize: 19 }} />
              </Link>
              <Link href="/editorial" className={styles.link}>
                ย้อนกลับ <MdKeyboardDoubleArrowRight style={{ fontSize: 19 }} />
              </Link>
              {editorial.title}
            </div>
          </div>

          <time className={styles.date}>วันที่โพสต์ : {editorial.date}</time>

          {editorial.mainImage && (
            <Image
              src={editorial.mainImage}
              alt={editorial.title}
              width={800}
              height={400}
              className={styles.mainImage}
              priority
            />
          )}

          <section className={styles.content}>
            {Array.isArray(editorial.content) ? (
              editorial.content.map((block, index) => {
                const id = /^h[1-6]$/.test(block.type)
                  ? generateId(block.text, index)
                  : null;
                const key = `${block.type}-${index}-${id || index}`;

                if (/^h[1-6]$/.test(block.type)) {
                  const level = Number(block.type.replace("h", ""));
                  const paddingLeft = `${(level - 1) * 1.5}rem`;
                  return (
                    <div key={key} className={`heading-block level-${level}`}>
                      <HeadingTag type={block.type} id={id} text={block.text} />
                    </div>);
                }

                if (block.type === "paragraph") {
                  return (
                    <div key={key} style={{ paddingLeft: "2rem" }}>
                      <p>{block.text}</p>
                    </div>
                  );
                }

                return null;
              })
            ) : (
              <p style={{ paddingLeft: "2rem" }}>{editorial.content}</p>
            )}
          </section>
        </article>
      </div>

      {/* แสดง Sidebar เฉพาะเมื่อมีหัวข้อมากกว่า 1 ข้อ */}
      {headings.length > 1 && (
        <nav className={`${styles.sidebar} ${isSticky ? styles.sticky : ""}`} aria-label="สารบัญบทความ">
          <h2 className={styles.tocTitle}>เนื้อหาบทความ</h2>
          <ul className={styles.tocList}>
            {headings.map(({ id, text, level, key }, i) => {
              let linkClass = styles.tocLinkSection;
              if (i === 0) linkClass = styles.tocLinkMain;
              else if (level >= 3) linkClass = styles.tocLinkSub;

              return (
                <li key={key} className={styles.tocItem}>
                  <button
                    type="button"
                    className={`${linkClass} ${activeId === id ? styles.active : ""}`}
                    onClick={() => scrollToHeading(id)}
                  >
                    {text}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </main>
  );
}
