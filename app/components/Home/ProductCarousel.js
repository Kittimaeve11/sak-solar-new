'use client';

import React from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductCarousel.css';

function Arrow({ onClick, direction }) {
  return (
    <button
      className={`carouselArrow ${direction}`}
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
    >
      {direction === 'left' ? <FaChevronLeft size={18} /> : <FaChevronRight size={18} />}
    </button>
  );
}

export default function ProductCarousel({ title, items, link }) {
  const showSlider = items.length > 4; // ✅ ใช้ Slider เฉพาะเมื่อมีมากกว่า 4

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="carouselWrapper">
      <div className="carouselHeader">
        <h2 className="carouselTitle">{title}</h2>
        <Link href={link} className="carouselLink">
          ผลิตภัณฑ์ทั้งหมด
        </Link>
      </div>

      <div className="carouselInner">
        {showSlider ? (
          <Slider {...settings}>
            {items.map((item, i) => (
              <div key={i} className="carouselSlide">
                <div className="carouselCard">
                  <Image src={item.image} alt={item.name} width={300} height={180} />
                  <h3>{item.name}</h3>
                  {/* <p>{item.model || item.inverter_model}</p> */}
                  <p className="price">
                    {item.price ? `฿${item.price.toLocaleString()}` : 'ราคา'}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="carouselStaticWrapper">
            {items.map((item, i) => (
              <div key={i} className="carouselCard">
                <Image src={item.image} alt={item.name} width={300} height={180} />
                <h3>{item.name}</h3>
                {/* <p>{item.model || item.inverter_model}</p> */}
                <p className="price">
                  {item.price ? `฿${item.price.toLocaleString()}` : 'ราคา'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
