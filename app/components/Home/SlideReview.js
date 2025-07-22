'use client';

import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import './SlideReview.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiPlusSm } from "react-icons/hi";

function extractVideoId(url) {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export default function SlideReview() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);
    const [dragging, setDragging] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        fetch('/api/review')
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setIsLoading(false);
            })
            .catch(() => {
                setReviews([]);
                setIsLoading(false);
            });
    }, []);

    const totalGroups = Math.ceil(reviews.length / 3);

    const handleDotClick = (index) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index * 3);
            setActiveSlide(index);
        }
    };

    const handleBeforeChange = () => setDragging(true);
    const handleAfterChange = (i) => {
        setActiveSlide(Math.floor(i / 3));
        setTimeout(() => setDragging(false), 50);
    };

    const CustomDots = () => (
        <div className="custom-dots">
            {Array.from({ length: totalGroups }).map((_, i) => (
                <div
                    key={i}
                    className={`dot-bar ${activeSlide === i ? 'active' : ''}`}
                    onClick={() => handleDotClick(i)}
                />
            ))}
        </div>
    );

    const SkeletonCard = () => (
        <div className="slide-item">
            <div className="skeleton-card fade-in">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-line"></div>
            </div>
        </div>
    );

    return (
        <div className="review-wrapperslide">
            <h1 className="headersolarslide">รีวิวจากลูกค้า</h1>

            <div className="review-header-linkslide">
                <Link href="/review" className="view-all">
                    <HiPlusSm className="icon-view" />
                    ดูทั้งหมด
                </Link>
            </div>

            {isLoading ? (
                <div className="review-loading-grid">
                    {[...Array(3)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : (
                <Slider
                    ref={sliderRef}
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={3}
                    slidesToScroll={1}
                    swipeToSlide={true}
                    arrows={false}
                    beforeChange={handleBeforeChange}
                    afterChange={handleAfterChange}
                    appendDots={() => <CustomDots />}
                    responsive={[
                        { breakpoint: 1024, settings: { slidesToShow: 2 } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {reviews.map((review) => {
                        const videoId = extractVideoId(review.url);
                        if (!videoId) return null;

                        return (
                            <div key={review.id} className="slide-item">
                                <div
                                    className="video-cardslide"
                                    onClick={() => {
                                        if (!dragging) {
                                            window.open(review.url, '_blank', 'noopener noreferrer');
                                        }
                                    }}
                                >
                                    <div className="thumbnail-wrapperslide">
                                        <img
                                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                            alt={review.title}
                                            className="thumbnailslide"
                                        />
                                    </div>
                                    <div className="infoslide">
                                        <h3 className="titleslide">{review.title}</h3>
                                        <p className="dateslide">{review.date}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            )}
        </div>
    );
}
