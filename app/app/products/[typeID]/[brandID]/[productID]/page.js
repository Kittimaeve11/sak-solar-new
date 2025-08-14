'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MdOutlineElectricBolt } from "react-icons/md";
import { TbCurrencyBaht } from "react-icons/tb";
import Link from 'next/link';
import { useLocale } from '@/app/Context/LocaleContext';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const apiKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY_API;

export default function ProductDetailPage() {
    const { typeID, brandID, productID } = useParams();
    const { locale } = useLocale();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const getImageUrl = (path) => {
        if (!path) return '/images/no-image.jpg';
        if (path.startsWith('http')) return path;
        try {
            return new URL(path, baseUrl).toString();
        } catch {
            return '/images/no-image.jpg';
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${baseUrl}/api/productpageapi`, {
                    headers: { 'X-API-KEY': apiKey }
                });
                const data = await res.json();
                if (data.status && Array.isArray(data.result?.data)) {
                    const found = data.result.data.find(p => String(p.product_ID) === String(productID));
                    if (found) {
                        const gallery = (() => {
                            try {
                                return JSON.parse(found.gallery || '[]');
                            } catch {
                                return [];
                            }
                        })();
                        setProduct({
                            id: found.product_ID,
                            model: found.modelname,
                            solarpanel: found.solarpanel,
                            size: found.installationsize,
                            price: found.price,
                            isprice: found.isprice,
                            battery: found.battery,
                            gallery,
                            product_pin: found.product_pin,
                            productpro_ispromotion: found.productpro_ispromotion,
                            productpro_percent: found.productpro_percent
                        });
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (productID) fetchProduct();
    }, [productID]);

    if (loading) return <p>กำลังโหลด...</p>;
    if (!product) return <p>ไม่พบข้อมูลสินค้า</p>;

    return (
        <main className="product-detail-container">
            <div className="product-detail-header">
                <Link href={`/products/${typeID}/${brandID}`} className="back-link">← กลับไปหน้ารายการสินค้า</Link>
                <h1>{product.model || product.solarpanel}</h1>
            </div>

            <div className="product-detail-content">
                <div className="product-detail-gallery">
                    {product.gallery.length > 0 ? (
                        product.gallery.map((img, idx) => (
                            <Image
                                key={idx}
                                src={getImageUrl(img)}
                                alt={product.model || product.solarpanel}
                                width={500}
                                height={500}
                                unoptimized
                            />
                        ))
                    ) : (
                        <Image src="/images/no-image.jpg" alt="No image" width={500} height={500} />
                    )}
                </div>

                <div className="product-detail-info">
                    {product.productpro_ispromotion === "1" && product.productpro_percent && (
                        <div className="product-promo">
                            โปรโมชั่น: ลด {product.productpro_percent}
                        </div>
                    )}
                    {product.isprice === "1" && product.price && (
                        <p className="product-price">
                            <TbCurrencyBaht size={25} /> {Number(product.price).toLocaleString()} บาท
                        </p>
                    )}
                    {product.isprice === "0" && product.size && (
                        <p className="product-size">
                            <MdOutlineElectricBolt size={25} /> {product.size}
                        </p>
                    )}
                    {product.battery && (
                        <p className="product-battery">รุ่นแบตเตอรี่ {product.battery} kWh</p>
                    )}

                    <div className="product-actions">
                        <button className="buttonPrimaryorange">สั่งซื้อ / สอบถาม</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
