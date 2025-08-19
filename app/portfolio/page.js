'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../../styles/portfolio.css';
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaCalendar } from "react-icons/fa";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('ทั้งหมด');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  // ✅ state สำหรับ banner
  const [brander, setBrander] = useState([]);
  const [loadingBanner, setLoadingBanner] = useState(true);

  const itemsPerPage = 15;
  const router = useRouter();
  const topRef = useRef(null);

  // --------- 1. Setup initial things (title, savedPage, event listener, fetch data) ----------
  useEffect(() => {
    document.title = 'ผลงานของเรา | บริษัท ศักดิ์สยาม โซลาร์ เอ็นเนอร์ยี่ จำกัด';
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", "ผลงานของเรา");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'ผลงานของเรา';
      document.head.appendChild(meta);
    }

    // โหลด currentPage จาก localStorage
    const savedPage = localStorage.getItem('portfolioCurrentPage');
    if (savedPage) setCurrentPage(Number(savedPage));

    // listener error
    const handleChunkError = (e) => {
      if (e?.message?.includes('ChunkLoadError')) window.location.reload();
    };
    window.addEventListener('error', handleChunkError);

    // fetch projects
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        setProjects(Array.isArray(data.projects) ? data.projects : []);
      } catch {
        setProjects([]);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          setFadeIn(true);
        }, 300);
      }
    };

    // fetch banner (โหลดครั้งเดียว)
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/branderIDapi/10`, {
          method: 'GET',
          headers: { 'X-API-KEY': apiKey },
        });
        const branderData = await res.json();

        const branderArray = Array.isArray(branderData.data)
          ? branderData.data
          : branderData.data
          ? [branderData.data]
          : [];

        setBrander(branderArray);
      } catch (error) {
        console.error('Error fetching banner:', error);
      } finally {
        setLoadingBanner(false);
      }
    };

    fetchProjects();
    fetchBanner();

    return () => {
      window.removeEventListener('error', handleChunkError);
    };
  }, []);

  // --------- 2. Save currentPage to localStorage ----------
  useEffect(() => {
    localStorage.setItem('portfolioCurrentPage', currentPage.toString());
  }, [currentPage]);

  // --------- 3. Smooth scroll to top on page change ----------
  useEffect(() => {
    if (isScrollingUp) {
      const timer = setTimeout(() => setIsScrollingUp(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isScrollingUp]);

  const filteredProjects = filter === 'ทั้งหมด'
    ? projects
    : projects.filter((proj) => proj?.type === filter);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    topRef.current?.scrollIntoView({ behavior: 'auto' });
    setIsScrollingUp(true);
  };

  function renderPagination() {
    const pages = [];
    const siblings = 2;
    const range = [1];
    const start = Math.max(2, currentPage - siblings);
    const end = Math.min(totalPages - 1, currentPage + siblings);

    if (start > 2) range.push('start-ellipsis');
    for (let i = start; i <= end; i++) range.push(i);
    if (end < totalPages - 1) range.push('end-ellipsis');
    if (totalPages > 1) range.push(totalPages);

    if (currentPage > 1) {
      pages.push(
        <button className="btn-with-arrow" key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          <IoIosArrowBack className="arrow-icon" />
        </button>
      );
    }

    range.forEach((item, idx) => {
      if (item === 'start-ellipsis' || item === 'end-ellipsis') {
        pages.push(<span key={item + idx} className="ellipsis">...</span>);
      } else {
        pages.push(
          <button
            key={item}
            className={currentPage === item ? 'active-page' : ''}
            onClick={() => handlePageChange(item)}
          >
            {item}
          </button>
        );
      }
    });

    if (currentPage < totalPages) {
      pages.push(
        <button className="btn-with-arrow" key="next" onClick={() => handlePageChange(currentPage + 1)}>
          <IoIosArrowForward className="arrow-icon" />
        </button>
      );
    }

    return pages;
  }

  function SkeletonCard() {
    return (
      <div className="portfolio-card skeleton-card" style={{ pointerEvents: 'none' }}>
        <div className="portfolio-image-wrapper">
          <div className="skeleton skeleton-image" />
        </div>
        <div className="portfolio-content">
          <div className="skeleton skeleton-title" />
          <ul className="project-details">
            {[...Array(4)].map((_, i) => (
              <li key={i}><div className="skeleton skeleton-line" /></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ---------- Banner Section ---------- */}
      {loadingBanner ? (
        <div className="skeleton-banner"></div>
      ) : (
        brander.map((item) => (
          <div className="banner-container fade-in" key={item.brander_ID}>
            <picture>
              <source
                srcSet={`${baseUrl}/${item.brander_pictureMoblie}`}
                media="(max-width: 768px)"
              />
              <Image
                src={`${baseUrl}/${item.brander_picturePC}`}
                alt={item.brander_name || 'Banner Image'}
                width={1530}
                height={800}
                className="banner-image"
                unoptimized
              />
            </picture>
          </div>
        ))
      )}

      {/* ---------- Main Content ---------- */}
      <main
        className={`layout-container ${fadeIn ? 'fade-in' : ''}`}
        ref={topRef}
        style={{ minHeight: isLoading ? '100vh' : 'auto' }}
      >
        <div className="portfolio-page">
          <h1 className="headtitleone">ผลงานการติดตั้งโซลาร์เซลล์</h1>

          {/* ---------- Filter ---------- */}
          <div className="portfolio-filters">
            <label htmlFor="filter-select" className="filter-label">เลือกประเภทผลงาน :</label>
            <div className="filter-row">
              <div className="select-wrapper">
                <select
                  id="filter-select"
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="filter-dropdown"
                >
                  <option value="ทั้งหมด">ผลงานทั้งหมด</option>
                  {[...new Set(projects.map((p) => p?.type))].map((type) =>
                    type ? <option key={type} value={type}>{type}</option> : null
                  )}
                </select>
                <IoIosArrowDown className="dropdown-icon" />
              </div>
            </div>
          </div>

          {/* ---------- Project Grid ---------- */}
          <div className={`portfolio-grid ${!isLoading ? 'fade-in' : ''}`}>
            {isLoading
              ? Array.from({ length: itemsPerPage }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))
              : paginatedProjects.length === 0 ? (
                <p className="no-data-text">ไม่พบข้อมูลผลงาน</p>
              ) : (
                paginatedProjects.map((proj, i) => (
                  <div
                    key={proj?.id || `proj-${i}`}
                    className="portfolio-card"
                    onClick={() => router.push(`/portfolio/${proj?.id}`)}
                  >
                    <div className="portfolio-image-wrapper">
                      <Image
                        src={proj?.coverImage || '/images/placeholder.png'}
                        alt={proj?.title || 'ไม่ระบุ'}
                        className="portfolio-image"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={75}
                      />
                      <div className="portfolio-banner">
                        <Image
                          src="/images/logosak-solar.png"
                          alt="logo"
                          width={120}
                          height={40}
                          className="banner-logo"
                        />
                        <div className="banner-text">ศักดิ์สยาม โซลาร์ เอ็นเนอร์ยี่ จำกัด</div>
                      </div>
                    </div>
                    <div className="portfolio-content">
                      <h3 className="project-title" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word',
                      }}>
                        {proj?.title || '-'}
                      </h3>
                      <ul className="project-details">
                        <li><strong>ขนาดติดตั้ง</strong><span>{proj?.size || '-'}</span></li>
                        <li><strong>ประเภทผลิตภัณฑ์</strong><span>{proj?.productType || '-'}</span></li>
                        <li><strong>จำนวนแผง</strong><span>{proj?.panelCount || '-'} แผง</span></li>
                        <li className="date-post"><strong><FaCalendar /></strong><span>{proj?.postDate || '-'}</span></li>
                      </ul>
                    </div>
                  </div>
                ))
              )}
          </div>

          {/* ---------- Pagination ---------- */}
          {!isLoading && totalPages > 1 && (
            <div className="pagination-controls">
              <div className="page-buttons">{renderPagination()}</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
