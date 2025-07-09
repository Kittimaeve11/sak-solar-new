'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../../styles/editorial.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaArrowRightLong } from "react-icons/fa6";

export default function EditorialListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();
  const topRef = useRef(null); // ✅ ใช้สำหรับ scroll

  useEffect(() => {
    fetch('/api/editorial')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.editorial || []);
        setTimeout(() => {
          setLoading(false);
          setIsFading(true);
          setTimeout(() => setIsFading(false), 200);
        }, 100);
      });
  }, []);

  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page === currentPage) return;

    setLoading(true);
    setIsFading(false);

    // ✅ Scroll ทันทีแบบไม่ให้เห็นภาพเคลื่อนไหว
    topRef.current?.scrollIntoView({ behavior: 'auto' });

    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => {
        setLoading(false);
        setIsFading(true);
        setTimeout(() => setIsFading(false), 200);
      }, 100);
    }, 50);
  };

  const paginatedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPagination = () => {
    const pages = [];
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (currentPage > 1) {
      pages.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)} className="btn-with-arrow">
          <IoIosArrowBack className="arrow-icon" />
        </button>
      );
    }

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);
      const hasLeftEllipsis = startPage > 2;
      const hasRightEllipsis = endPage < totalPages - 1;

      pages.push(
        <button key={1} onClick={() => handlePageChange(1)} className={currentPage === 1 ? 'active-page' : ''}>
          1
        </button>
      );

      if (hasLeftEllipsis) pages.push(<span key="start-ellipsis" className="ellipsis">...</span>);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? 'active-page' : ''}>
            {i}
          </button>
        );
      }

      if (hasRightEllipsis) pages.push(<span key="end-ellipsis" className="ellipsis">...</span>);

      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className={currentPage === totalPages ? 'active-page' : ''}>
          {totalPages}
        </button>
      );
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? 'active-page' : ''}>
            {i}
          </button>
        );
      }
    }

    if (currentPage < totalPages) {
      pages.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)} className="btn-with-arrow">
          <IoIosArrowForward className="arrow-icon" />
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="layout-container" ref={topRef}>
      <h1 className="headtitle">บทความ</h1>

      <main
        className={`editorial-grid fade-in ${isFading ? 'active' : ''}`}
        key={`page-${currentPage}`}
      >
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, idx) => (
            <div className="skeleton-card" key={idx}>
              <div className="skeleton skeleton-image" />
              <div className="skeleton skeleton-title" />
              <span className="skeleton skeleton-line" />
              <span className="skeleton skeleton-line" />
            </div>
          ))
          : paginatedArticles.map((item) => (
            <div
              key={item.id}
              className="editorial-card"
              onClick={() => router.push(`/editorial/${item.id}`)}
            >
              <Image
                src={item.mainImage}
                alt={item.title}
                width={400}
                height={200}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="editorial-date">{item.date}</p>
                <p className="card-snippet">{item.content?.split('\n')[0]}</p>
                <p className="read-more">อ่านเพิ่มเติม <FaArrowRightLong /></p>
              </div>
            </div>
          ))}
      </main>

      {!loading && totalPages > 1 && (
        <div className="pagination-controls">
          <div className="page-buttons">{renderPagination()}</div>
        </div>
      )}
    </div>
  );
}
