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
  const showSlider = items.length > 4;

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
      <div className="carouselHeader">
        <h2 className="carouselTitle">{title}</h2>
        <Link href={link} className="carouselLink">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
            <HiPlusCircle />
            ผลิตภัณฑ์ทั้งหมด
          </span>
        </Link>
      </div>

      <div className="carouselInner">
        {showSlider ? (
          <Slider {...settings}>
            {items.map((item, i) => (
              <div key={i} className="carouselStaticWrapper">
                <div className="carouselSlide">
                  <div className="carouselCard">
                    <Image src={item.image} alt={item.name} width={300} height={180} />
                    <h3>{item.name}</h3>
                    <p className="product-size">
                      {item.size ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                      <MdOutlineElectricBolt size ={25}/>
                          {item.size.toLocaleString()}
                        </span>
                      ) : null}
                    </p>
                  </div>
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
                <p className="product-size">
                  {item.size ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                      <MdOutlineElectricBolt size ={25}/>
                      {item.size.toLocaleString()}
                    </span>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
