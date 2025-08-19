'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import '../../styles/review.css';
import { useLocale } from '../Context/LocaleContext';
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
  const { locale } = useLocale();
  const [reviews, setReviews] = useState([]);
  const [brander, setBrander] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!baseUrl || !apiKey) {
      console.error('Missing baseUrl or apiKey:', { baseUrl, apiKey });
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // ดึง Review กับ Brander พร้อมกัน
      const [reviewsRes, branderRes] = await Promise.all([
        fetch(`${baseUrl}/api/Reviewapi`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
          },
        }),
        fetch(`${baseUrl}/api/branderIDapi/11`, {
          method: 'GET',
          headers: {
            'X-API-KEY': apiKey,
          },
        }),
      ]);

      if (!reviewsRes.ok) {
        const errText = await reviewsRes.text();
        throw new Error(`Error fetching videos: ${reviewsRes.status} - ${errText}`);
      }

      if (!branderRes.ok) {
        const errText = await branderRes.text();
        throw new Error(`Error fetching brander: ${branderRes.status} - ${errText}`);
      }

      const reviewsData = await reviewsRes.json();
      const branderData = await branderRes.json();

      setReviews(reviewsData.result?.data || []);

      // แปลง branderData.data ให้เป็น array (ถ้าเป็น object เดียว)
      const branderArray = Array.isArray(branderData.data)
        ? branderData.data
        : branderData.data
          ? [branderData.data]
          : [];
      setBrander(branderArray);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
     // เปลี่ยน title และ meta description
    document.title = 'รีวิวของเรา | บริษัท ศักดิ์สยาม โซลาร์ เอ็นเนอร์ยี่ จำกัด';
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("review", "รีวิวของเรา");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'รีวิวของเรา';
      document.head.appendChild(meta);
    }
    
    fetchData();
  }, [fetchData]);

  return (
    <>
      {/* รูปแบนเนอร์อยู่นอก main */}
      {loading ? (
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

      <main className="layout-container">
        <h1 className="headtitle">
          {locale === 'en'
            ? 'Customer Reviews on Our Solar Installations'
            : 'รีวิวการติดตั้ง Solar จากลูกค้าของเรา'}
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
    </>
  );
}