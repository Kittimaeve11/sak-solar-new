'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../../styles/editorial.css';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { FaArrowRightLong } from "react-icons/fa6";

export default function EditorialListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [filter, setFilter] = useState('ทั้งหมด');
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const router = useRouter();
  const topRef = useRef(null);

  useEffect(() => {
    fetch('/api/editorial')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.editorial || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        setShouldAnimate(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setLoading(true);
    setShouldAnimate(false);
    topRef.current?.scrollIntoView({ behavior: 'auto' });

    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
      setTimeout(() => setShouldAnimate(true), 50);
    }, 100);
  };

  const filteredArticles = filter === 'ทั้งหมด'
    ? articles
    : articles.filter((item) => item?.type === filter);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;

  const paginatedArticles = filteredArticles.slice(
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

      {/* Filter */}
      <div className="portfolio-filters">
        <label htmlFor="filter-select" className="filter-label">เลือกประเภทบทความ :</label>
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
              <option value="ทั้งหมด">บทความทั้งหมด</option>
              {[...new Set(articles.map((a) => a?.type))].map((type) =>
                type ? <option key={type} value={type}>{type}</option> : null
              )}
            </select>
            <IoIosArrowDown className="dropdown-icon" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="editorial-grid">
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <div className="skeleton-card" key={idx}>
              <div className="skeleton skeleton-image" />
              <div className="skeleton skeleton-title" />
              <span className="skeleton skeleton-line" />
              <span className="skeleton skeleton-line" />
            </div>
          ))}
        </div>
      ) : (
        <main
          className={`editorial-grid fade-in${shouldAnimate ? ' active' : ''}`}
          key={`page-${currentPage}`}
        >
          {paginatedArticles.map((item) => {
            const fullText = Array.isArray(item.content)
              ? item.content.map(block => (typeof block.text === 'string' ? block.text : '')).join(' ')
              : (typeof item.content === 'string' ? item.content : '');

            const snippet = fullText.split(' ').slice(0, 20).join(' ') + '...';

            return (
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
                  <p className="card-snippet">{snippet}</p>
                  <p className="read-more">อ่านเพิ่มเติม <FaArrowRightLong /></p>
                </div>
              </div>
            );
          })}
        </main>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination-controls">
          <div className="page-buttons">{renderPagination()}</div>
        </div>
      )}
    </div>
  );
}
