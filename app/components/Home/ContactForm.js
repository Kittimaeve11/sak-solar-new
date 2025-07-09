'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styles from '../../Home.module.css';

export default function ContactForm({
  provinces = [],
  amphures = [],
  tambons = [],
  productOptions = [],
}) {
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
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.product) newErrors.product = 'กรุณาระบุสินค้าหรือบริการ';
    if (!formData.package) newErrors.package = 'กรุณาเลือกแพ็คเกจ';
    if (!formData.usageTime) newErrors.usageTime = 'กรุณาระบุช่วงเวลาใช้ไฟ';
    if (!formData.fullName) newErrors.fullName = 'กรุณาระบุชื่อ-นามสกุล';
    if (!formData.phone) newErrors.phone = 'กรุณาระบุเบอร์โทร';
    if (!formData.contactTime) newErrors.contactTime = 'กรุณาเลือกช่วงเวลาติดต่อกลับ';
    if (!formData.province) newErrors.province = 'กรุณาระบุจังหวัด';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('✅ ส่งข้อมูล:', formData);
      // ส่ง API ต่อไปได้เลย
    }
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

  // Auto-close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const text = e.target.value.trim();
    setQuery(text);
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

  return (
    <div className={styles.formWrapper} style={{ marginTop: '3rem' }}>
      <h1 className={styles.headersolar}>
        สนใจโซลาร์เซลล์</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        หรือต้องการปรึกษาการติดตั้ง เรายินดีให้คำแนะนำ
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">สินค้าหรือบริการที่สนใจ :</label>
          {productOptions.map((product) => (
            <div key={product.slug}>
              <label className="form-radio">
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
            </div>
          ))}
          {errors.product && <div className="error-text">{errors.product}</div>}
        </div>
        
        <div className="form-select-wrapper">
          <label className="form-label">ราคาที่ยอมรับได้ :</label>
          <div className="custom-select-container" style={{ position: 'relative' }}>
            <select
              name="package"
              value={formData.package}
              onChange={handleChange}
              className={`form-select ${formData.package === '' ? 'placeholder' : ''}`}
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

        <div>
          <label className="form-label">ช่วงเวลาที่ใช้ไฟ :</label>
          <div className="radio-group">
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

        <div>
          <label className="form-label">ชื่อจริง-นามสกุลจริง :</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="form-field"
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
            className="form-field"
            placeholder="กรุณากรอกเบอร์โทรศัพท์ของท่าน**"
          />
          {errors.phone && <div className="error-text">{errors.phone}</div>}
        </div>

        <div ref={wrapperRef} style={{ position: 'relative' }}>
          <label className="form-label">ค้นหาที่อยู่ :</label>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="form-field"
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

        <div className="form-select-wrapper">
          <label className="form-label">ช่วงเวลาที่สะดวกให้ติดต่อกลับ :</label>
          <div className="custom-select-container" style={{ position: 'relative' }}>
            <select
              name="contactTime"
              value={formData.contactTime}
              onChange={handleChange}
              className={`form-select ${formData.contactTime === '' ? 'placeholder' : ''}`}
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

        <div className={styles.row} style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className="buttonSecondaryoneorange">
            ส่งข้อความ
          </button>
        </div>
      </form>
    </div>
  );
}
