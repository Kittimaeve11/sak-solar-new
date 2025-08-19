'use client';

import React from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiPlusCircle } from 'react-icons/hi';
import { MdOutlineElectricBolt } from 'react-icons/md';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductCarousel.css';

// Custom Arrow Component
function Arrow({ onClick, direction }) {
  return (
    <button
      className={`carouselArrow ${direction}`}
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
    >
      {direction === 'left' ? <FaChevronLeft size={25} /> : <FaChevronRight size={25} />}
    </button>
  );
}

export default function ProductCarousel({ title, items, link }) {
  const showSlider = items.length > 4; // แสดง slider ก็ต่อเมื่อมี item มากกว่า 4

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    cssEase: 'ease-out',
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="carouselWrapper">
      {/* Header */}
      <div className="carouselHeader">
        <h2 className="carouselTitle">{title}</h2>
        <Link href={link} className="carouselLink">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <HiPlusCircle />
            ผลิตภัณฑ์ทั้งหมด
          </span>
        </Link>
      </div>

      {/* Slider / Static */}
      <div className="carouselInner">
        {showSlider ? (
          <Slider {...settings}>
            {items.map((item, i) => (
              <div key={i} className="carouselStaticWrapper">
                <div className="carouselSlide">
                  <div className="carouselCard">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={180}
                      style={{ objectFit: 'cover' }}
                    />
                    <h3>{item.name}</h3>
                    {item.size && (
                      <p className="product-size">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                          <MdOutlineElectricBolt size={20} />
                          {item.size.toLocaleString()}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="carouselStaticWrapper">
            {items.map((item, i) => (
              <div key={i} className="carouselCard">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  style={{ objectFit: 'cover', }}
                />
                <h3 className="product-name">
                  {item.name ?? item.model ?? item.solarpanel ?? item.title ?? 'ไม่พบข้อมูลชื่อ'}
                </h3>
                {item.size && (
                  <p className="product-size">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                      <MdOutlineElectricBolt size={20} />
                      {item.size.toLocaleString()}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
