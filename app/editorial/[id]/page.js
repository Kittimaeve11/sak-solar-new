"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "./EditorialDetailPage.module.css";
import Link from "next/link";

async function getEditorialById(id) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/editorial`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.editorial.find((item) => item.id === Number(id)) || null;
}

function parseHeadings(content) {
  if (!content) return [];
  return content
    .split("\n")
    .map((line) => {
      const m = line.match(/^(#{2,3})\s+(.*)/);
      if (!m) return null;
      return {
        level: m[1].length,
        text: m[2],
        id: m[2].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      };
    })
    .filter(Boolean);
}

export default function EditorialDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [editorial, setEditorial] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showThumbs, setShowThumbs] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // โหลดบทความตาม id
  useEffect(() => {
    if (id) getEditorialById(id).then(setEditorial);
  }, [id]);

  // ปิด scroll หน้าเมื่อเปิด lightbox
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  if (!editorial) return <div className={styles.notFound}>ไม่พบบทความ</div>;

  const headings = parseHeadings(editorial.content);
  const showGallery = editorial.gallery?.length > 0;

  return (
    <main className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <article className={styles.article}>
          <h1 className={styles.title}>{editorial.title}</h1>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.link}>หน้าหลัก</Link> &gt;&gt;{" "}
            <Link href="/editorial" className={styles.link}>ย้อนกลับ</Link> &gt;&gt;{" "}
            {editorial.title}
          </div>
          <time className={styles.date}>วันที่โพสต์ : {editorial.date}</time>
          {editorial.mainImage && (
            <Image
              src={editorial.mainImage}
              alt={editorial.title}
              width={200}
              height={100}
              className={styles.mainImage}
              priority
            />
          )}
          <section className={styles.content}>{editorial.content}</section>
          {showGallery && (
            <section >
              <h2>แกลเลอรี</h2>
              <div className={styles.galleryGrid}>
                {editorial.gallery.slice(0, 3).map((img, i) => {
                  const isLast = i === 2 && editorial.gallery.length > 3;
                  return (
                    <div
                      key={i}
                      className={styles.galleryImageWrapper}
                      onClick={() => setLightboxIndex(i)}
                    >
                      <Image
                        src={img}
                        alt={`gallery-${i + 1}`}
                        fill
                        className={styles.galleryImage}
                        priority={i === 0}
                      />
                      {isLast && (
                        <div className={styles.overlay}>
                          <div>
                            ดูเพิ่มเติม<br />
                            {editorial.gallery.length - 3} ภาพ
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </article>
      </div>

      <nav className={styles.sidebar} aria-label="สารบัญบทความ">
        <h2 className={styles.sidebarTitle}>เนื้อหา</h2>
        <ul className={styles.tocList}>
          {headings.map(({ id, text, level }) => (
            <li
              key={id}
              className={level === 3 ? styles.tocSubItem : styles.tocItem}
            >
              <Link
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => {
            setLightboxIndex(null);
            setZoom(false);
            setFullscreen(false);
          }}
        >
          <div
            className={styles.lightboxContainer}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar: ลำดับรูป + ปุ่มควบคุม */}
            <div className={styles.lightboxTopBar}>
              <div className={styles.lightboxInfo}>
                รูปที่ {lightboxIndex + 1} / {editorial.gallery.length}
              </div>
              <div className={styles.lightboxControls}>
                <button
                  type="button"
                  onClick={() => setZoom((z) => !z)}
                  aria-label={zoom ? "ปิดซูม" : "ซูม"}
                >
                  {zoom ? "ไม่ซูม" : "ซูม"}
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreen((f) => !f)}
                  aria-label={fullscreen ? "ออกเต็มจอ" : "เต็มจอ"}
                >
                  {fullscreen ? "ออกเต็มจอ" : "เต็มจอ"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex(null);
                    setZoom(false);
                    setFullscreen(false);
                  }}
                  aria-label="ปิดรูป"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* รูปภาพและปุ่มเลื่อนซ้ายขวา */}
            <div className={styles.lightboxContent}>
              <button
                className={styles.navButton}
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + editorial.gallery.length) %
                      editorial.gallery.length
                  )
                }
                aria-label="รูปก่อนหน้า"
              >
                ‹
              </button>

              <div
                className={`${styles.lightboxImageWrapper} ${
                  zoom ? styles.zoomed : ""
                } ${fullscreen ? styles.fullscreen : ""}`}
              >
                <Image
                  src={editorial.gallery[lightboxIndex]}
                  alt={`รูปเต็ม ${lightboxIndex + 1}`}
                  fill
                  sizes="(max-width: 1000px) 100vw, 1000px"
                  className={styles.lightboxImage}
                  priority
                />
              </div>

              <button
                className={styles.navButton}
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % editorial.gallery.length)
                }
                aria-label="รูปถัดไป"
              >
                ›
              </button>
            </div>

            {/* ปุ่มเปิด/ปิด แกลเลอรี่อันเล็กด้านล่าง */}
            <div className={styles.lightboxThumbToggle}>
              <button
                type="button"
                onClick={() => setShowThumbs((v) => !v)}
              >
                {showThumbs ? "ซ่อนแกลเลอรี" : "แสดงแกลเลอรี"}
              </button>
            </div>

            {/* แกลเลอรี่ขนาดเล็ก (thumbnail) */}
            {showThumbs && (
              <div className={styles.lightboxThumbs}>
                {editorial.gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`${styles.thumbWrapper} ${
                      lightboxIndex === i ? styles.activeThumbWrapper : ""
                    }`}
                    onClick={() => setLightboxIndex(i)}
                    tabIndex={0}
                    role="button"
                    aria-label={`เลือกรูปที่ ${i + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setLightboxIndex(i);
                      }
                    }}
                  >
                    <Image
                      src={img}
                      alt={`รูปย่อที่ ${i + 1}`}
                      width={100}
                      height={60}
                      className={styles.thumbImage}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
