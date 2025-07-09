'use client';

import React, { useState, useEffect } from 'react';
import { FaLine } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebookSquare, FaYoutube, FaInstagramSquare } from "react-icons/fa";
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && contacts.length === 0) {
      fetch(`${baseUrl}/api/contactapi`, {
        headers: { 'X-API-KEY': apiKey }
      })
        .then(res => res.json())
        .then(data => {
          setContacts(data.result || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [open, contacts.length]);

  // Icon array ตามลำดับ social ของคุณ
  const socialIcons = {
    facebook: <FaFacebookSquare style={{ color: "#1877f2", fontSize: 28 }} />,
    line: <FaLine style={{ color: "#00c300", fontSize: 28 }} />,
    instagram: <FaInstagramSquare style={{ color: "#F5058D", fontSize: 28 }} />,
    youtube: <FaYoutube style={{ color: "#FF0033", fontSize: 28 }} />,
    tiktok: <AiFillTikTok style={{ color: "#101010", fontSize: 28 }} />,
  };

  return (
    <>
      {/* ปุ่มกลมขวาล่าง */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "ปิดช่องทางติดต่อ" : "เปิดช่องทางติดต่อ"}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#f97316',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          color: 'white',
          fontSize: 28,
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background-color 0.3s ease',
        }}
      >
        {open ? "×" : "☎️"}
      </button>

      {/* กรอบแสดงข้อมูล ช่องทางติดต่อ */}
      <div
        style={{
          position: 'fixed',
          bottom: 90,
          right: 20,
          width: open ? 320 : 0,
          maxHeight: open ? 420 : 0,
          overflow: 'hidden',
          backgroundColor: 'white',
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          padding: open ? 20 : 0,
          opacity: open ? 1 : 0,
          transition: 'all 0.35s ease',
          zIndex: 999,
        }}
      >
        {loading && <p>กำลังโหลดข้อมูล...</p>}

        {!loading && contacts.length === 0 && <p>ไม่พบข้อมูลติดต่อ</p>}

        {!loading && contacts.length > 0 && contacts.map(item => {
          const socialList = [
            { name: "facebook", url: item.facebook },
            { name: "line", url: item.line },
            { name: "instagram", url: item.instagram },
            { name: "youtube", url: item.youtube },
            { name: "tiktok", url: item.tiktok },
          ].filter(s => s.url && s.url.trim() !== '');

          return (
            <div key={item.id}>
              <h3 style={{ marginBottom: 12, fontWeight: '600' }}>ช่องทางติดต่อ</h3>

              <p><strong>ที่อยู่:</strong> {item.address_th}</p>
              <p><strong>โทร:</strong> {item.phone_number}</p>
              <p><strong>อีเมล:</strong> {item.email_main}</p>

              <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {socialList.map(({ name, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      color: '#000',
                      textDecoration: 'none',
                    }}
                    aria-label={name}
                  >
                    {socialIcons[name]}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
