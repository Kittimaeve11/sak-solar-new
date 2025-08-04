'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../Context/LocaleContext';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';
import { products } from '../data/products';
import '../../styles/tabmenu.css';

export default function TabMenu() {
  const { messages, locale } = useLocale(); // เพิ่ม locale
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [activeProductSlug, setActiveProductSlug] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef(null);

  const isActive = (path) => (path === '/' ? pathname === '/' : pathname.startsWith(path));
  const isInProductsSection = pathname.startsWith('/products');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 991px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServiceOpen(false);
    setActiveProductSlug(null);
    clearTimeout(timeoutRef.current);
  }, [pathname]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setServiceOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServiceOpen(false);
      setActiveProductSlug(null);
    }, 200);
  };

  const toggleBrandSubmenu = (slug) => {
    if (isMobile) {
      setActiveProductSlug((prev) => (prev === slug ? null : slug));
    }
  };

  const handleLinkClick = () => {
    setOpen(false);
    setServiceOpen(false);
    setActiveProductSlug(null);
  };

  return (
    <nav className="navbar">
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <IoMenu />
      </button>

      <nav id="navmenu" className={`navmenu ${open ? 'active' : ''}`} role="navigation">
        <ul className="nav-root">
          <li>
            <Link href="/" className={isActive('/') ? 'active' : ''} onClick={handleLinkClick}>
              {messages.home}
            </Link>
          </li>

          <li
            className={`dropdown ${isInProductsSection ? 'active' : ''}`}
            onMouseEnter={() => !isMobile && handleMouseEnter()}
            onMouseLeave={() => !isMobile && handleMouseLeave()}
          >
            <div className="dropdown-header">
              <Link
                href="/products"
                className={isInProductsSection ? 'active' : ''}
                onClick={handleLinkClick}
                style={{ flexGrow: 1, textDecoration: 'none' }}
              >
                {messages.serviceproduct}
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setServiceOpen((prev) => !prev);
                }}
                aria-label="Toggle submenu"
                aria-expanded={serviceOpen}
                className="dropdown-toggle-button"
              >
                {serviceOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
            </div>

            {serviceOpen && (
              <ul className="dropdown-menu level-1">
                {products.map((product) => {
                  const isCurrent = pathname.startsWith(`/products/${product.slug}`);
                  const isOpen = activeProductSlug === product.slug;

                  return (
                    <li
                      key={product.slug}
                      className={`dropdown-item ${isCurrent ? 'active' : ''}`}
                      onMouseEnter={() => !isMobile && setActiveProductSlug(product.slug)}
                      onMouseLeave={() => !isMobile && setActiveProductSlug(null)}
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className={`dropdown-toggle ${isOpen ? 'hovered' : ''}`}
                        style={{
                          padding: '15px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          gap: '10px',
                        }}
                        onClick={(e) => {
                          if (isMobile) {
                            e.preventDefault();
                            toggleBrandSubmenu(product.slug);
                          } else {
                            handleLinkClick();
                          }
                        }}
                      >
                        {/* แสดงชื่อ product ตาม locale */}
                        {typeof product.name === 'object' ? product.name[locale] ?? product.name.en : product.name}
                        {isMobile && (isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                      </Link>

                      {isOpen && (
                        <ul className="brand-submenu">
                          {product.brands.map((brand) => (
                            <li key={brand.slug}>
                              <Link
                                href={`/products/${product.slug}/${brand.slug}`}
                                className={
                                  pathname === `/products/${product.slug}/${brand.slug}`
                                    ? 'active'
                                    : ''
                                }
                                onClick={handleLinkClick}
                              >
                                {/* แสดงชื่อแบรนด์ตรง ๆ (string) */}
                                {brand.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          <li>
            <Link href="/Faq" className={isActive('/Faq') ? 'active' : ''} onClick={handleLinkClick}>
              {messages.faq}
            </Link>
          </li>

          <li>
            <Link href="/portfolio" className={isActive('/portfolio') ? 'active' : ''} onClick={handleLinkClick}>
              {messages.portfolio}
            </Link>
          </li>
          <li>
            <Link href="/review" className={isActive('/review') ? 'active' : ''} onClick={handleLinkClick}>
              {messages.review}
            </Link>
          </li>

          <li>
            <Link href="/editorial" className={isActive('/editorial') ? 'active' : ''} onClick={handleLinkClick}>
              {messages.editorial}
            </Link>
          </li>
        </ul>
      </nav>
    </nav>
  );
}
