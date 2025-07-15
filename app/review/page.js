'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../../styles/review.css';

function extractVideoId(url) {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function ThumbnailWithFallback({ videoId, alt }) {
  const thumbnailUrls = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  ];

  const [srcIndex, setSrcIndex] = useState(0);

  return (
    <img
      src={thumbnailUrls[srcIndex]}
      alt={alt}
      className="thumbnail"
      onError={() => {
        if (srcIndex < thumbnailUrls.length - 1) {
          setSrcIndex(srcIndex + 1);
        }
      }}
    />
  );
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/review');
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return (
    <main className="layout-container">
      <h1 className="headtitle">รีวิวการติดตั้ง Solar จากลูกค้าของเรา</h1>

      <div className="video-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card skeleton fade-in" style={{ animationDelay: '0s' }}>
              <div className="skeleton-image skeleton"></div>
              <div className="skeleton-title skeleton"></div>
              <div className="skeleton-line skeleton"></div>
            </div>
          ))
          : reviews.map((review) => {
            const videoId = extractVideoId(review.url);
            if (!videoId) return null;

            return (
              <Link
                key={review.id}
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card fade-in"
              >
                <div className="thumbnail-placeholder">
                  <ThumbnailWithFallback videoId={videoId} alt={review.title} />
                </div>
                <div className="info">
                  <div className="title">{review.title}</div>
                  <div className="date">{review.date}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </main>
  );
}
