'use client';

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

function PrevArrow({ style, onClick }) {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: 50,
        transform: "translate(0, -50%)",
        zIndex: 10,
        borderRadius: "50%",
        width: 36,
        height: 36,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaChevronLeft color="rgba(255, 255, 255, 0.6)" size={25} />
    </div>
  );
}

function NextArrow({ style, onClick }) {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        right: 50,
        transform: "translate(0, -50%)",
        zIndex: 10,
        borderRadius: "50%",
        width: 36,
        height: 36,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaChevronRight color="rgba(255, 255, 255, 0.6)" size={25} />
    </div>
  );
}

export default function BannerSlider() {
  const sliderRef = useRef(null);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedIndexes, setLoadedIndexes] = useState({});
  const [initialSlide, setInitialSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false);

  // ตรวจสอบ mobile และดึง index เก่า
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const savedIndex = localStorage.getItem("bannerSlideIndex");
    if (savedIndex !== null) setInitialSlide(parseInt(savedIndex));

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch banners
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/branderhomeapi`, {
          headers: { "X-API-KEY": apiKey },
        });
        const data = await res.json();
        if (data.status && data.result) setBanners(data.result);
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    initialSlide,
    afterChange: (current) => localStorage.setItem("bannerSlideIndex", current),
    beforeChange: () => (isDragging.current = true),
    onSwipe: () => (isDragging.current = true),
    onEdge: () => (isDragging.current = false),
  };

  const handleClick = (e, href) => {
    if (isDragging.current) {
      isDragging.current = false;
      return;
    }
    const width = e.currentTarget.offsetWidth;
    const x = e.nativeEvent.offsetX;
    const percent = x / width;

    if (percent >= 0.1 && percent <= 0.9) {
      if (href) window.open(href, "_blank");
    } else if (percent < 0.2) {
      sliderRef.current?.slickPrev();
    } else {
      sliderRef.current?.slickNext();
    }
  };

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        lineHeight: 0,
        fontSize: 0,
        minHeight: isMobile ? "calc(100vw / 1.92)" : "calc(100vw / 3.38)", // กำหนดความสูงล่วงหน้า
        marginTop: "-1rem",
      }}
    >
      {loading ? (
        <div className="skeleton-banner" />
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {banners.map((banner, index) => {
            const imgSrc = isMobile
              ? `${baseUrl}/${banner.brander_pictureMoblie}`
              : `${baseUrl}/${banner.brander_picturePC}`;

            const isLoaded = loadedIndexes[index];

            return (
              <div key={banner.brander_ID}>
                <div
                  className="banner-container"
                  onClick={(e) => handleClick(e, banner.brander_link)}
                >
                  <Image
                    src={imgSrc}
                    alt={banner.brander_name}
                    width={3840}
                    height={1191}
                    className={`banner-image ${isLoaded ? "fade-in" : "hidden"}`}
                    priority={index === initialSlide}
                    loading={index === initialSlide ? "eager" : "lazy"}
                    draggable={false}
                    unoptimized
                    onLoadingComplete={() =>
                      setLoadedIndexes((prev) => ({ ...prev, [index]: true }))
                    }
                  />
                  {!isLoaded && <div className="skeleton-overlay" />}
                </div>
              </div>
            );
          })}
        </Slider>
      )}

      <style jsx>{`
        .skeleton-banner {
          width: 100%;
          aspect-ratio: 3.22 / 1;
          background-color: #e0e0e0;
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @media (max-width: 768px) {
          .skeleton-banner {
            aspect-ratio: 1.92 / 1;
          }
        }

        .banner-container {
          position: relative;
          width: 100%;
        }
        .banner-image {
          width: 100%;
          height: auto;
          display: block;
          opacity: 1;
          transition: opacity 0.5s ease;
        }
        .banner-image.hidden {
          opacity: 0;
        }
        .banner-image.fade-in {
          opacity: 1;
        }
        .skeleton-overlay {
          position: absolute;
          inset: 0;
          background: #e0e0e0;
          animation: pulse 1.5s infinite ease-in-out;
          z-index: 2;
          border-radius: 4px;
          transition: opacity 0.5s ease;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        :global(.slick-dots) {
          bottom: 15px;
        }
        :global(.slick-dots li button) {
          width: 9px;
          height: 9px;
          padding: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.27);
          border: 2px solid transparent;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        :global(.slick-dots li.slick-active button) {
          background: rgba(255, 255, 255, 0.89);
        }
        :global(.slick-dots li button:hover) {
          background: rgba(255, 255, 255, 0.89);
        }
        :global(.slick-dots li button:before) {
          display: none;
        }
      `}</style>
    </div>
  );
}
