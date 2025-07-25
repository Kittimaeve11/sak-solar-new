'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styles from '../../Home.module.css';
import { useSearchParams } from 'next/navigation';

export default function ContactForm({
  provinces = [],
  amphures = [],
  tambons = [],
  productOptions = [],
}) {
  const searchParams = useSearchParams();
  const wrapperRef = useRef(null);

  const [formData, setFormData] = useState({
    product: '',
    package: '',
    usageTime: '',
    fullName: '',
    phone: '',
    district: '',
    subDistrict: '',
    province: '',
    contactTime: '',
  });

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ ลบ error เฉพาะช่องที่ผู้ใช้กำลังพิมพ์
    setErrors((prevErrors) => {
      if (!prevErrors[name]) return prevErrors;
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.product) newErrors.product = '*กรุณาระบุสินค้าหรือบริการ';
    if (!formData.package) newErrors.package = '*กรุณาเลือกแพ็คเกจ';
    if (!formData.usageTime) newErrors.usageTime = '*กรุณาระบุช่วงเวลาใช้ไฟ';
    if (!formData.fullName) newErrors.fullName = '*กรุณากรอกชื่อและนามสกุลของท่าน';
    if (!formData.phone) newErrors.phone = '*กรุณากรอกหมายเลขโทรศัพท์';
    if (!formData.contactTime) newErrors.contactTime = '*กรุณาเลือกช่วงเวลาติดต่อกลับ';
    if (!formData.province) newErrors.province = '*กรุณากรอกที่อยู่ของท่าน';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('✅ ส่งข้อมูล:', formData);
      // ทำการส่ง API ได้ที่นี่
    }
  };

  const handleQueryChange = (e) => {
    const text = e.target.value.trim();
    setQuery(text);

    // ✅ ลบ error เฉพาะช่อง province เมื่อผู้ใช้พิมพ์ใหม่
    setErrors((prevErrors) => {
      if (!prevErrors.province) return prevErrors;
      const updated = { ...prevErrors };
      delete updated.province;
      return updated;
    });

    if (!text) return setSuggestions([]);

    const matched = [];

    tambons.forEach((t) => {
      if (t.name_th.includes(text)) {
        const amphure = amphures.find((a) => a.id === t.amphure_id);
        const province = provinces.find((p) => p.id === amphure?.province_id);
        matched.push({
          subDistrict: t.name_th,
          district: amphure?.name_th || '',
          province: province?.name_th || '',
        });
      }
    });

    amphures.forEach((a) => {
      if (a.name_th.includes(text)) {
        const province = provinces.find((p) => p.id === a.province_id);
        matched.push({
          subDistrict: '',
          district: a.name_th,
          province: province?.name_th || '',
        });
      }
    });

    provinces.forEach((p) => {
      if (p.name_th.includes(text)) {
        matched.push({
          subDistrict: '',
          district: '',
          province: p.name_th,
        });
      }
    });

    setSuggestions(matched.slice(0, 10));
  };

  const handleSelect = (item) => {
    const fullText = `${item.subDistrict ? item.subDistrict + ', ' : ''}${item.district ? item.district + ', ' : ''}${item.province}`;
    setQuery(fullText);
    setFormData((prev) => ({
      ...prev,
      subDistrict: item.subDistrict,
      district: item.district,
      province: item.province,
    }));
    setSuggestions([]);
  };

  useEffect(() => {
    const matchedTambon = tambons.find((t) => t.name_th === formData.subDistrict);
    if (matchedTambon) {
      const amphure = amphures.find((a) => a.id === matchedTambon.amphure_id);
      const province = provinces.find((p) => p.id === amphure?.province_id);
      if (amphure && province) {
        setFormData((prev) => ({
          ...prev,
          district: amphure.name_th,
          province: province.name_th,
        }));
      }
    }
  }, [formData.subDistrict]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // อ่าน query param product แล้วตั้งค่า formData.product
    const productFromUrl = searchParams.get('product');
    if (productFromUrl) {
      setFormData((prev) => ({
        ...prev,
        product: productFromUrl,
      }));
      // ลบ error ของ product ถ้ามี (optional)
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.product;
        return newErrors;
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const productFromUrl = searchParams.get('product');
    if (productFromUrl) {
      setFormData((prev) => ({
        ...prev,
        product: productFromUrl,
      }));
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.product;
        return newErrors;
      });

      // ✅ Scroll ไปยัง form โดยใช้ ID
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);


  return (
    <div className={styles.containersolar}>
      <div className={styles.formWrapper} style={{ marginTop: '3rem' }}>
        <h1 className={styles.headersolar}>
          สนใจโซลาร์เซลล์</h1>
        <h4
          style={{
            textAlign: 'center',
            marginTop: -10,
            marginBottom: 20,
            fontWeight: 400,
          }}
        >
          หรือต้องการปรึกษาการติดตั้ง เรายินดีให้คำแนะนำ
        </h4>


        <form onSubmit={handleSubmit}>
          {/*  สินค้า */}
          <div>
            <label className="form-label">สินค้าหรือบริการที่สนใจ :</label>
            <div className={`radio-group ${errors.product ? 'error-border' : ''}`}>
              {productOptions.map((product) => (
                <label key={product.slug} className="form-radio">
                  <input
                    type="radio"
                    name="product"
                    value={product.slug}
                    checked={formData.product === product.slug}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  {product.name}
                </label>
              ))}
            </div>
            {errors.product && <div className="error-text">{errors.product}</div>}
          </div>

          {/*  แพ็คเกจ */}
          <div className="form-select-wrapper">
            <label className="form-label">ราคาที่ยอมรับได้ :</label>
            <div className="custom-select-container" style={{ position: 'relative' }}>
              <select
                name="package"
                value={formData.package}
                onChange={handleChange}
                className={`form-select ${formData.package === '' ? 'placeholder' : ''} ${errors.package ? 'input-error' : ''}`}
              >
                <option value="" disabled hidden>กรุณาเลือกราคาที่ยอมรับได้**</option>
                <option value="low">ประหยัด (ต่ำกว่า 100,000 บาท)</option>
                <option value="medium">กลาง (100,000 - 250,000 บาท)</option>
                <option value="premium">Premium (มากกว่า 250,000 บาท)</option>
                <option value="unsure">ไม่แน่ใจ ต้องการให้เจ้าหน้าที่แนะนำ</option>
              </select>
              <MdOutlineKeyboardArrowDown className="select-arrow" />
            </div>
            {errors.package && <div className="error-text">{errors.package}</div>}
          </div>

          {/* ช่วงเวลาใช้ไฟ */}
          <div>
            <label className="form-label">ช่วงเวลาที่ใช้ไฟ :</label>
            <div className={`radio-group ${errors.usageTime ? 'error-border' : ''}`}>
              <label className="form-radio">
                <input
                  type="radio"
                  name="usageTime"
                  value="day"
                  checked={formData.usageTime === 'day'}
                  onChange={handleChange}
                  className="radio-input"
                />
                กลางวัน
              </label>
              <label className="form-radio">
                <input
                  type="radio"
                  name="usageTime"
                  value="night"
                  checked={formData.usageTime === 'night'}
                  onChange={handleChange}
                  className="radio-input"
                />
                กลางคืน
              </label>
            </div>
            {errors.usageTime && <div className="error-text">{errors.usageTime}</div>}
          </div>

          {/* 🔆 ชื่อและเบอร์ */}
          <div>
            <label className="form-label">ชื่อจริง-นามสกุลจริง :</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-field ${errors.fullName ? 'input-error' : ''}`}
              placeholder="กรุณากรอกชื่อ - นามสกุล ของท่าน**"
            />
            {errors.fullName && <div className="error-text">{errors.fullName}</div>}
          </div>

          <div>
            <label className="form-label">หมายเลขโทรศัพท์มือถือ :</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-field ${errors.phone ? 'input-error' : ''}`}
              placeholder="กรุณากรอกเบอร์โทรศัพท์ของท่าน**"
            />
            {errors.phone && <div className="error-text">{errors.phone}</div>}
          </div>

          {/* 🔆 ค้นหาที่อยู่ */}
          <div ref={wrapperRef} style={{ position: 'relative' }}>
            <label className="form-label">ค้นหาที่อยู่ :</label>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              className={`form-field ${errors.province ? 'input-error' : ''}`}
              placeholder="เช่น (ตำบล)ท่าอิฐ, (อำเภอ)เมืองอุตรดิตถ์, (จังหวัด)อุตรดิตถ์"
            />
            {suggestions.length > 0 && (
              <ul className="autocomplete-list">
                {suggestions.map((s, i) => (
                  <li key={i} onClick={() => handleSelect(s)} style={{ padding: '8px', cursor: 'pointer' }}>
                    {`${s.subDistrict ? s.subDistrict + ', ' : ''}${s.district ? s.district + ', ' : ''}${s.province}`}
                  </li>
                ))}
              </ul>
            )}
            {errors.province && <div className="error-text">{errors.province}</div>}
          </div>

          {/* 🔆 เวลาติดต่อกลับ */}
          <div className="form-select-wrapper">
            <label className="form-label">ช่วงเวลาที่สะดวกให้ติดต่อกลับ :</label>
            <div className="custom-select-container" style={{ position: 'relative' }}>
              <select
                name="contactTime"
                value={formData.contactTime}
                onChange={handleChange}
                className={`form-select ${formData.contactTime === '' ? 'placeholder' : ''} ${errors.contactTime ? 'input-error' : ''}`}
              >
                <option value="" disabled hidden>กรุณาเลือกช่วงเวลาที่สะดวกให้ติดต่อกลับ**</option>
                <option value="morning">08:30 น. - 12:00 น.</option>
                <option value="lunch">12:00 น. - 13:00 น.</option>
                <option value="afternoon">13:00 น. - 15:00 น.</option>
                <option value="late-afternoon">15:00 น. - 17:30 น.</option>
                <option value="any">ทุกช่วงเวลา</option>
              </select>
              <MdOutlineKeyboardArrowDown className="select-arrow" />
            </div>
            {errors.contactTime && <div className="error-text">{errors.contactTime}</div>}
          </div>

          {/*  ปุ่มส่ง */}
          <div className={styles.row} style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="buttonSecondaryoneorange">
              ส่งข้อความ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
