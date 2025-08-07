'use client';

import React, { useState } from 'react';
import styles from './SolarFormnew.module.css';
import { products } from '@/app/data/products';
import { BsDash } from "react-icons/bs";
import Image from 'next/image';
import { MdOutlineElectricBolt } from 'react-icons/md';
import html2canvas from 'html2canvas';

const handlePrintScreenshot = () => {
  const element = document.querySelector(`.${styles.resultGrid}`);
  if (!element) {
    alert('ไม่พบส่วนที่ต้องการแคป');
    return;
  }

  html2canvas(element, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    const printWindow = window.open('', '_blank');
  
printWindow.document.write(`
  <html>
    <head>
      <title>ปริ้นภาพผลลัพธ์</title>
      <style>
        @page { 
          size: landscape;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        h1 {
          font-size: clamp(1.2rem, 5vw, 2rem);
          font-weight: 600;
          text-align: center;
          margin-bottom: 0.5rem;
          color: #F2780C;
        }
        img {
          max-width: 90%;
          max-height: 80%;
          height: auto;
          display: block;
        }
      </style>
    </head>
    <body>
      <h1>ผลการคำนวณขนาดติดตั้ง</h1>
        </head>
        <body>
          <img src="${imgData}" />
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); }
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }).catch(err => {
    console.error('เกิดข้อผิดพลาดในการแคปภาพ:', err);
  });
};


const calculateSolarSize = (electricityCost, dayUsage, installationCost = 0) => {
  const usageUnits = electricityCost / 5;
  const averageDailyUnits = usageUnits / 30;
  const dayUnits = averageDailyUnits * (dayUsage / 100);
  const nightUnits = averageDailyUnits - dayUnits;

  const C = usageUnits * (dayUsage / 100);

  const sizeTable = [
    { size: "1.8 kW", max: 270 },
    { size: "3.1 kW", max: 465 },
    { size: "5 kW", max: 750 },
    { size: "10 kW", max: 1500 },
    { size: "15 kW", max: 2250 },
    { size: "20 kW", max: 3000 },
    { size: "25 kW", max: 3750 },
    { size: "30 kW", max: 4500 },
    { size: "35 kW", max: 5250 },
    { size: "40 kW", max: 6000 },
  ];

  const recommendedItem = sizeTable.find((item) => C <= item.max);
  const recommended = recommendedItem?.size || "เกิน 60 kW";

  const savingsPerMonth = electricityCost * (dayUsage / 100);
  const savingsPerYear = savingsPerMonth * 12;
  const savingsIn25Years = savingsPerYear * 25;
  const paybackPeriod =
    installationCost && savingsPerYear
      ? (installationCost / savingsPerYear).toFixed(1)
      : null;

  return {
    usageUnits,
    averageDailyUnits,
    dayUnits,
    nightUnits,
    recommended,
    dayUsage,
    savingsPerMonth,
    savingsPerYear,
    savingsIn25Years,
    paybackPeriod,
  };
};

export default function SolarCalculatorForm() {
  const [formValues, setFormValues] = useState({
    electricityCost: '',
    systemType: '',
    roofArea: '',
    dayUsage: 60,
  });

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const [attemptedRoofInput, setAttemptedRoofInput] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formValues.electricityCost) {
      newErrors.electricityCost = '*กรุณากรอกค่าไฟฟ้า';
    } else if (isNaN(Number(formValues.electricityCost)) || Number(formValues.electricityCost) <= 0) {
      newErrors.electricityCost = '*กรุณากรอกค่าไฟฟ้าเป็นตัวเลขบวก';
    }

    if (!formValues.systemType) {
      newErrors.systemType = '*กรุณาเลือกระบบไฟฟ้า';
    }

    if (!formValues.roofArea && formValues.roofArea !== 0) {
      newErrors.roofArea = '*กรุณากรอกพื้นที่หลังคา';
    } else if (!formValues.systemType && formValues.roofArea !== '') {
      newErrors.roofArea = '*กรุณาเลือกระบบไฟฟ้าก่อนจึงจะกรอกพื้นที่หลังคาได้';
    } else {
      const roofNum = parseFloat(formValues.roofArea);
      if (formValues.systemType === 'single') {
        if (roofNum < 9) newErrors.roofArea = '*พื้นที่สำหรับ 1 เฟส ต้องไม่ต่ำกว่า 9 ตารางเมตร.';
        else if (roofNum > 45) newErrors.roofArea = '*พื้นที่สำหรับ 1 เฟส ต้องไม่เกิน 45 ตารางเมตร.';
      } else if (formValues.systemType === 'three') {
        if (roofNum < 45) newErrors.roofArea = '*พื้นที่สำหรับ 3 เฟส ต้องไม่ต่ำกว่า 45 ตารางเมตร.';
        else if (roofNum > 179) newErrors.roofArea = '*พื้นที่สำหรับ 3 เฟส ต้องไม่เกิน 179 ตารางเมตร.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    if (field === 'electricityCost') {
      value = value.replace(/,/g, '');
      if (!/^\d*$/.test(value)) return;
    }

    if (field === 'roofArea') {
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        const roofNum = parseFloat(value);

        // เช็คว่าค่าที่พิมพ์เกินช่วงไหม
        let roofError = null;
        let maxArea = formValues.systemType === 'single' ? 45 : 179;
        let minArea = formValues.systemType === 'single' ? 9 : 45;

        if (value !== '' && !isNaN(roofNum)) {
          if (roofNum < minArea) {
            roofError = `*พื้นที่สำหรับ ${formValues.systemType === 'single' ? '1 เฟส' : '3 เฟส'} ต้องไม่ต่ำกว่า ${minArea} ตารางเมตร.`;
          } else if (roofNum > maxArea) {
            roofError = `*พื้นที่สำหรับ ${formValues.systemType === 'single' ? '1 เฟส' : '3 เฟส'} ต้องไม่เกิน ${maxArea} ตารางเมตร.`;
            // ไม่อัพเดตค่าถ้าเกินขีดจำกัด
            return; // หยุดไม่ให้พิมพ์ค่าที่เกิน
          }
        }

        setErrors((prev) => ({ ...prev, roofArea: roofError }));
      } else {
        return; // ไม่อนุญาตพิมพ์อะไรที่ไม่ใช่ตัวเลขและจุด
      }
    }

    setFormValues((prev) => ({ ...prev, [field]: value }));

    // Reset error เฉพาะ field นี้ ถ้าไม่มี error ใหม่
    setErrors((prevErrors) => {
      if (!prevErrors[field]) return prevErrors;
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field];
      return updatedErrors;
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const electricityCostNum = Number(formValues.electricityCost);
    const roofAreaNum = Number(formValues.roofArea);
    const { systemType, dayUsage } = formValues;

    if (
      (systemType === 'single' && (roofAreaNum < 9 || roofAreaNum > 45)) ||
      (systemType === 'three' && (roofAreaNum < 45 || roofAreaNum > 179))
    ) {
      alert('พื้นที่หลังคาไม่เหมาะสมกับประเภทของระบบไฟฟ้าที่เลือก');
      return;
    }

    const installationCost = 100000;
    const result = calculateSolarSize(electricityCostNum, dayUsage, installationCost);
    setResults(result);
  };

  const handleReset = () => {
    setFormValues({ electricityCost: '', systemType: '', roofArea: '', dayUsage: 60 });
    setErrors({});
    setResults(null);
    setAttemptedRoofInput(false);
  };

  const getRecommendedItems = (systemType) => {
    if (!systemType) return [];

    // แปลงค่า systemType ให้ตรงกับ power_system ใน data
    const powerSystemText = systemType === 'single' ? '1 เฟส' : '3 เฟส';

    const solarCategory = products.find((cat) => cat.id === 'solar1'); // Solar Rooftop category
    if (!solarCategory) return [];

    const matchedItems = [];

    solarCategory.brands.forEach((brand) => {
      brand.packages.forEach((pkg) => {
        pkg.items.forEach((item) => {
          if (item.power_system === powerSystemText) {
            matchedItems.push({
              brandName: brand.name,
              packageName: pkg.name,
              ...item,
            });
          }
        });
      });
    });

    return matchedItems;
  };

  return (
    <div className={styles.containersolar}>
      <div className={`${styles.formWrapper} ${results ? styles.formWrapperResult : styles.formWrapperInitial}`}>
        <h1 className="headtitleone" style={{ marginBottom: '-1rem' }}>
          {!results ? 'ระบบคำนวณขนาด Solar Rooftop ที่เหมาะสม' : 'ผลการคำนวณขนาดติดตั้ง'}
        </h1>

        {!results && (
          <form noValidate onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={`${styles.formGroup} ${styles.flexGrow}`}>
                <label className="form-label">ค่าไฟฟ้าต่อเดือน (บาท) :</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className={`form-field ${errors.electricityCost ? 'input-error' : ''}`}
                  placeholder="กรุณากรอกค่าไฟต่อเดือนของท่าน**"
                  value={formValues.electricityCost !== '' ? Number(formValues.electricityCost).toLocaleString('en-US') : ''}
                  onChange={handleChange('electricityCost')}
                />
                {errors.electricityCost && <div className="error-text">{errors.electricityCost}</div>}
              </div>

              <div className="form-group align-right">
                <label className="form-label" style={{ marginBottom: '1rem' }}>
                  ระบบไฟฟ้า :
                </label>

                <div className={`radio-group ${errors.systemType ? 'error-border' : ''}`}>
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="systemType"
                      value="single"
                      checked={formValues.systemType === 'single'}
                      onChange={handleChange('systemType')}
                      className="radio-input"
                    />
                    1 เฟส
                  </label>

                  <label className="form-radio">
                    <input
                      type="radio"
                      name="systemType"
                      value="three"
                      checked={formValues.systemType === 'three'}
                      onChange={handleChange('systemType')}
                      className="radio-input"
                    />
                    3 เฟส
                  </label>
                </div>

                {errors.systemType && (
                  <div className="error-text" style={{ marginTop: '0.5rem' }}>
                    {errors.systemType}
                  </div>
                )}
              </div>
            </div>


            <label className="form-label">เปอร์เซ็นต์การใช้ไฟฟ้าในช่วงกลางวันและกลางคืน</label>
            <input
              type="range"
              min="0"
              max="100"
              value={formValues.dayUsage}
              onChange={(e) => setFormValues((prev) => ({ ...prev, dayUsage: Number(e.target.value) }))}
              className={styles.rangeControl}
              style={{
                background: `linear-gradient(to right, #F2780C ${formValues.dayUsage}%, #F2F2F2 ${formValues.dayUsage}%)`,
              }}
            />
            <div className={styles.usageSplit}>
              <span>ช่วงกลางวัน {formValues.dayUsage} %</span>
              <span>ช่วงกลางคืน {100 - formValues.dayUsage} %</span>
            </div>


            <div className={styles.formGroup}>
              <label className="form-label">
                พื้นที่หลังคาโดยประมาณ (ตารางเมตร) :</label>
              <input
                type="text"
                inputMode="decimal"
                className={`form-field ${errors.roofArea ? 'input-error' : ''}`}
                disabled={!formValues.systemType}
                value={formValues.roofArea}
                onChange={handleChange('roofArea')}
                placeholder={
                  formValues.systemType
                    ? formValues.systemType === 'single'
                      ? 'กรอกพื้นที่หลังคา : 9-45 ตารางเมตร'
                      : 'กรอกพื้นที่หลังคา : 45-179 ตารางเมตร'
                    : 'กรุณาเลือกระบบไฟฟ้าก่อน**'
                }
                style={{
                  backgroundColor: !formValues.systemType ? '#f5f5f5' : 'white',
                  cursor: !formValues.systemType ? 'not-allowed' : 'text',
                }}
              />
              {errors.roofArea && <div className="error-text">{errors.roofArea}</div>}
              {!formValues.systemType && (
                <div className="error-text" >
                  *กรุณาเลือกระบบไฟฟ้าก่อนจึงจะสามารถกรอกพื้นที่หลังคาได้
                </div>
              )}
            </div>

            {/* <h6 className={styles.instructions}>
              หมายเหตุ : ระบบไฟ 1 เฟส จะต้องระบุพื้นที่หลังคาให้อยู่ในช่วง 9-45 ตารางเมตร
            </h6>
            <h6 className={styles.instructions1} style={{ marginLeft: '4rem' }}>
              ระบบไฟ 3 เฟส จะต้องระบุพื้นที่หลังคาให้อยู่ในช่วง 45-179 ตารางเมตร
            </h6> */}

            <div className={styles.buttonGroup}>
              <button type="submit" className="buttonSecondaryonebule">
                คำนวณ
              </button>
              <button
                type="button"
                className="buttonSecondaryonedelte"
                onClick={handleReset}
              >
                เคลียร์ข้อมูลและรีเฟรชหน้า
              </button>
            </div>
          </form>
        )}

        {results && (
          <>
            <h4 className={styles.headtitelsolar}>
              แพ็กเกจที่ออกแบบมาให้เหมาะกับพื้นที่หลังคาและรูปแบบการใช้พลังงานของคุณ
            </h4>

            <div className={styles.resultGrid}>
              {/* แถวบน: ขนาดระบบ / ระยะเวลาคืนทุน */}

              {/* ขนาดระบบที่แนะนำ */}
              <div className={styles.topGrid}>
                <div className={styles.resultBoxc}>
                  <div className={styles.labelRowc}>
                    <div className={styles.labelheadc}>ขนาดระบบที่แนะนำ</div>
                    <div className={styles.valueLargec}>
                      <span className={styles.recommendedNumberc}>
                        {results.recommended?.match(/[\d.]+/)?.[0]}
                      </span>
                      <span className={styles.recommendedUnitc}> kW</span>
                    </div>
                  </div>
                </div>


                {/* ระยะเวลาคืนทุน */}
                <div className={styles.resultBox}>
                  <div className={styles.labelRow}>
                    <div className={styles.labelhead}>ระยะเวลาคืนทุน</div>
                    <div className={styles.valueLarge}>
                      <span className={styles.recommendedNumber}>
                        {results.paybackPeriod}
                      </span>
                      <span className={styles.recommendedUnit}> ปี</span>
                    </div>
                  </div>
                  <p className={styles.subtext}>Solar Rooftop เพื่อลดค่าไฟฟ้าอย่างยั่งยืน</p>
                </div>
              </div>


              {/* แถวล่าง: แพ็กเกจ / รายละเอียดการใช้ไฟ */}
              <div className={styles.bottomGrid}>
                <div className={styles.resultBoxL}>
                  <h4 className={styles.packageTitle}>แพ็กเกจที่เราแนะนำ</h4>
                  <p className={styles.systemType}>
                    ระบบไฟฟ้า {formValues.systemType === 'single' ? '1 เฟส' : '3 เฟส'}
                  </p>


                  <div className="productListWrapper">

                    <div className={styles.productList}>
                      {getRecommendedItems(formValues.systemType)
                        .slice(0, 2) // แสดงแค่ 2 รายการแรก
                        .map((item) => (
                          <div key={item.id} className={styles.productCard}>
                            <Image
                              src={item.mainImage}
                              alt={item.packageName}
                              width={320}
                              height={250}
                              className={styles.productImage}
                            />

                            <div className={styles.productTable}>
                              <div className="product-info" style={{ textAlign: 'left' }}>
                                <h3 style={{ margin: 0 }}>{item.inverter_model}</h3>
                                {item.size && (
                                  <p
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      margin: 0,
                                      fontWeight: 600,
                                      color: 'red',
                                    }}
                                  >
                                    <MdOutlineElectricBolt size={20} />
                                    {item.size.toLocaleString()} kW
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* 🔥 overlay ปิดทับที่โชว์เมื่อ hover */}
                            <div className={styles.cardOverlay}>
                              ดูรายละเอียดสินค้า
                            </div>
                          </div>


                          // </div>
                        ))}
                    </div>
                  </div>

                </div>

                <div className={styles.resultBox}>
                  <h4 className={styles.solarTitle}> ผลตอบแทนระบบโซลาร์ </h4>

                  <div className={styles.costRow}>
                    <div className={styles.leftGroup}>
                      <Image
                        src="/icons/coin.png"
                        alt="Bill"
                        width={40}
                        height={40}
                      />
                      <span className={styles.costLabel}>ค่าไฟที่ลดต่อเดือน</span>
                    </div>
                    <span className={styles.costValue}>
                      {results.savingsPerMonth?.toLocaleString() || 'XXX'} บาท
                    </span>
                  </div>


                  <div className={styles.costRow}>
                    <div className={styles.leftGroup}>
                      <Image
                        src="/icons/sun1.png"
                        alt="Bill"
                        width={40}
                        height={40}
                      />
                      <span className={styles.costLabel}>ใช้ไฟช่วงกลางวัน</span>
                    </div>
                    <span className={styles.costValue}>
                      {results.dayUnits ? Math.floor(results.dayUnits) : 0} KW ({results.dayUsage}%)
                    </span>
                  </div>


                  <div className={styles.costRow}>
                    <div className={styles.leftGroup}>
                      <Image
                        src="/icons/night.png"
                        alt="Bill"
                        width={40}
                        height={40}
                      />
                      <span className={styles.costLabel}>ใช้ไฟช่วงกลางคืน</span>
                    </div>
                    <span className={styles.costValue}>
                      {Math.floor(results.nightUnits)} KW ({Math.floor(100 - results.dayUsage)}%)
                    </span>
                  </div>

                  <ul className={styles.costList}>
                    <h4 className={styles.solardeteil}> ผลตอบแทนระบบโซลาร์ </h4>

                    <li>
                      <div className={styles.rowds}>
                        <span className={styles.bullet}></span>
                        <span className={styles.labelds}>ค่าไฟที่ลดได้ต่อปี</span>
                        <strong className={styles.valueds}>{results.savingsPerYear?.toLocaleString() || '-'} บาท</strong>
                      </div>
                    </li>

                    <li>
                      <div className={styles.rowds}>
                        <span className={styles.bullet}></span>
                        <span className={styles.labelds}>ค่าไฟที่ประหยัดได้ใน 25 ปี</span>
                        <strong className={styles.valueds}>{results.savingsIn25Years?.toLocaleString() || '-'} บาท</strong>
                      </div>
                    </li>

                    <li>
                      <div className={styles.rowds}>
                        <span className={styles.bullet}></span>
                        <span className={styles.labelds}>การใช้ไฟเฉลี่ยต่อเดือน</span>
                        <strong className={styles.valueds}>{results.usageUnits?.toFixed(0) || '-'} kW</strong>
                      </div>
                    </li>

                    <li>
                      <div className={styles.rowds}>
                        <span className={styles.bullet}></span>
                        <span className={styles.labelds}>การใช้ไฟเฉลี่ยต่อวัน</span>
                        <strong className={styles.valueds}>{results.averageDailyUnits?.toFixed(0) || '-'} kW</strong>
                      </div>
                    </li>
                  </ul>


                </div>

              </div>
            </div>

            {/* ปุ่มคำนวณใหม่ (อยู่นอก grid) */}
            <div className={styles.buttonWrapper} style={{ display: 'flex', gap: '10px' }}>
              <button
                className="buttonSecondaryonebule"
                onClick={() => {
                  setResults(null);
                  setAttemptedRoofInput(false);
                  document.querySelector(`.${styles.formWrapper}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                คำนวณใหม่
              </button>

              <button
                className="buttonPrimary"
                onClick={handlePrintScreenshot}
              >
                ปริ้นผลการคำนวณขนาดติดตั้ง
              </button>
            </div>



          </>
        )}

      </div>
    </div >
  );
}

