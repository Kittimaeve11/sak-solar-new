'use client';

import React, { useState, useEffect } from 'react';
import { FaFacebookSquare,FaFacebook, FaLine, FaInstagramSquare, FaYoutube } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';
import { PiInstagramLogoFill } from "react-icons/pi";
export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);

  // 1. สีขาว: ใช้ในปุ่ม
  const rotatingIconsWhite = [
    <FaFacebook style={{ color: "#ffffff", fontSize: 35 }} />,
    <FaLine style={{ color: "#ffffff", fontSize: 35 }} />,
    <PiInstagramLogoFill  style={{ color: "#ffffff", fontSize: 35 }} />,
    <FaYoutube style={{ color: "#ffffff", fontSize: 35 }} />,
    <AiFillTikTok style={{ color: "#ffffff", fontSize: 35 }} />,
  ];

  // 2. สีจริง: ใช้ในกล่องข้อมูล
  const socialList = [
    { name: "facebook", url: "https://facebook.com/yourpage" },
    { name: "line", url: "https://line.me/ti/p/yourlineid" },
    { name: "instagram", url: "https://instagram.com/yourhandle" },
    { name: "youtube", url: "https://youtube.com/yourchannel" },
    { name: "tiktok", url: "https://tiktok.com/@yourhandle" },
  ];

  const coloredIcons = {
    facebook: <FaFacebookSquare style={{ color: "#1877f2", fontSize: 24 }} />,
    line: <FaLine style={{ color: "#00c300", fontSize: 24 }} />,
    instagram: <FaInstagramSquare style={{ color: "#F5058D", fontSize: 24 }} />,
    youtube: <FaYoutube style={{ color: "#FF0033", fontSize: 24 }} />,
    tiktok: <AiFillTikTok style={{ color: "#101010", fontSize: 24 }} />,
  };

  // เปลี่ยนไอคอนทุก 2 วินาที
  useEffect(() => {
    if (!open) {
      const interval = setInterval(() => {
        setIconIndex((prev) => (prev + 1) % rotatingIconsWhite.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [open]);

  return (
    <>
      {/* ปุ่มลอย */}
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
        {open ? "×" : rotatingIconsWhite[iconIndex]}
      </button>

      {/* กล่องข้อมูลช่องทางติดต่อ */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            padding: 16,
            borderRadius: 12,
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 999,
            width: 220,
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          <h4 style={{ fontSize: 16, marginBottom: 12, color: '#111', fontWeight: 'bold' }}>
            ช่องทางติดต่อเรา
          </h4>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
                  textDecoration: 'none',
                }}
                aria-label={name}
              >
                {coloredIcons[name]}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
