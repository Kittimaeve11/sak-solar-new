'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import '../../styles/review.css';
import { useLocale } from '../Context/LocaleContext';  // <-- import useLocale
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

function extractVideoId(url) {
  if (!url) return null;
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function ThumbnailWithFallback({ videoId, alt }) {
  const [srcIndex, setSrcIndex] = React.useState(0);

  const thumbnailUrls = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  ];

  return (
    <Image
      key={`${videoId}-${srcIndex}`}
      src={thumbnailUrls[srcIndex]}
      alt={alt}
      width={374}
      height={210}
      className="thumbnail"
      onError={() => {
        if (srcIndex < thumbnailUrls.length - 1) {
          setSrcIndex(srcIndex + 1);
        }
      }}
      unoptimized
    />
  );
}

export default function ReviewPage() {
  const { locale } = useLocale();  // <-- ใช้ locale จาก context
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchYoutube = useCallback(async () => {
    if (!baseUrl || !apiKey) {
      console.error('Missing baseUrl or apiKey:', { baseUrl, apiKey });
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const apiUrl = `${baseUrl}/api/Reviewapi`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey,
        },
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error fetching videos: ${response.status} - ${errText}`);
      }

      const result = await response.json();
      setReviews(result.result?.data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchYoutube();
  }, [fetchYoutube]);

  return (
    <main className="layout-container">
      <h1 className="headtitle">
        {locale === 'en' ? 'Customer Reviews on Our Solar Installations' : 'รีวิวการติดตั้ง Solar จากลูกค้าของเรา'}
      </h1>

      <div className="video-grid">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card skeleton fade-in">
              <div className="skeleton-image skeleton"></div>
              <div className="skeleton-title skeleton"></div>
              <div className="skeleton-line skeleton"></div>
            </div>
          ))
        ) : reviews.length === 0 ? (
          <p>{locale === 'en' ? 'No video reviews available at the moment.' : 'ไม่มีรีวิววิดีโอในขณะนี้'}</p>
        ) : (
          reviews.map((review) => {
            if (!review.vedio_link) return null;
            const videoId = extractVideoId(review.vedio_link);
            if (!videoId) return null;

            const videoTitle =
              locale === 'en'
                ? review.nameEN_Vedio || review.nameTH_Vedio || 'No title'
                : review.nameTH_Vedio || review.nameEN_Vedio || 'ไม่มีชื่อเรื่อง';

            // const postLabel = locale === 'en' ? 'Posted on:' : 'โพสต์เมื่อ:';
            const dateLocale = locale === 'en' ? 'en-US' : 'th-TH';

            return (
              <Link
                key={review.vedio_id}
                href={review.vedio_link}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card fade-in"
              >
                <div className="thumbnail-placeholder">
                  <ThumbnailWithFallback videoId={videoId} alt={videoTitle} />
                </div>
                <div className="info">
                  <div className="title">{videoTitle}</div>
                  <div className="date">
                    {/* {postLabel} */}
                    {' '}
                    {new Date(review.vedio_creationdate).toLocaleDateString(dateLocale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}