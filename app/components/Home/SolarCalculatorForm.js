'use client';

import React, { useState } from 'react';
import styles from '../../Home.module.css';

const calculateSolarSize = (electricityCost, dayUsage, installationCost = 0) => {
  const usageUnits = electricityCost / 5; // สมมุติ 1 หน่วย = 5 บาท
  const averageDailyUnits = usageUnits / 30;
  const dayUnits = averageDailyUnits * (dayUsage / 100);
  const nightUnits = averageDailyUnits - dayUnits;

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

  const recommendedItem = sizeTable.find((item) => usageUnits <= item.max);
  const recommended = recommendedItem?.size || "เกิน 60 kW";

  const savingsPerMonth = electricityCost * (dayUsage / 100);
  const savingsPerYear = savingsPerMonth * 12;

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

    // ค่าไฟฟ้าต่อเดือน
    if (!formValues.electricityCost) {
      newErrors.electricityCost = '*กรุณากรอกค่าไฟฟ้า';
    } else if (isNaN(Number(formValues.electricityCost)) || Number(formValues.electricityCost) <= 0) {
      newErrors.electricityCost = '*กรุณากรอกค่าไฟฟ้าเป็นตัวเลขบวก';
    }

    // ระบบไฟฟ้า
    if (!formValues.systemType) {
      newErrors.systemType = '*กรุณาเลือกระบบไฟฟ้า';
    }

    // พื้นที่หลังคา
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

    // สำหรับ electricityCost ให้ลบ comma ออก
    if (field === 'electricityCost') {
      value = value.replace(/,/g, '');
      if (!/^\d*$/.test(value)) return; // รับแค่เลข
    }

    // สำหรับ roofArea ให้รับเฉพาะตัวเลขและจุดทศนิยม
    if (field === 'roofArea') {
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        // ปล่อยให้ผ่าน
      } else {
        return; // ไม่รับค่าอื่น
      }
    }

    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const electricityCostNum = Number(formValues.electricityCost);
    const roofAreaNum = Number(formValues.roofArea);
    const { systemType, dayUsage } = formValues;

    // ตรวจสอบความสอดคล้องของพื้นที่กับระบบไฟฟ้าอีกครั้ง
    if (
      (systemType === 'single' && (roofAreaNum < 9 || roofAreaNum > 45)) ||
      (systemType === 'three' && (roofAreaNum < 45 || roofAreaNum > 179))
    ) {
      alert('พื้นที่หลังคาไม่เหมาะสมกับประเภทของระบบไฟฟ้าที่เลือก');
      return;
    }

    const installationCost = 100000; // สมมติ

    const result = calculateSolarSize(electricityCostNum, dayUsage, installationCost);
    setResults(result);
  };

  const handleReset = () => {
    setFormValues({ electricityCost: '', systemType: '', roofArea: '', dayUsage: 60 });
    setErrors({});
    setResults(null);
    setAttemptedRoofInput(false);
  };

  return (
    <div className={styles.containersolar}>
      <div className={styles.formWrapper}>
        <h1 className={styles.headersolar}>
          {!results ? 'ระบบคำนวณขนาด Solar Rooftop ที่เหมาะสม' : 'ผลการคำนวณขนาดติดตั้ง'}
        </h1>

        {!results && (
          <form noValidate onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={`${styles.formGroup} ${styles.flexGrow}`}>
                <label className="form-label">ค่าไฟฟ้าต่อเดือน (บาท):</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="form-field"
                  value={Number(formValues.electricityCost).toLocaleString('en-US') || ''}
                  onChange={handleChange('electricityCost')}
                />
                {errors.electricityCost && <div className="error-text">{errors.electricityCost}</div>}
              </div>

              <div className={`${styles.formGroup} ${styles.alignRight}`}>
                <label className="form-label" style={{ marginBottom: '1rem' }}>
                  ระบบไฟฟ้า:
                </label>
                <div className={styles.radioGroup}>
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="systemType"
                      value="single"
                      checked={formValues.systemType === 'single'}
                      onChange={handleChange('systemType')}
                    />{' '}
                    1 เฟส
                  </label>
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="systemType"
                      value="three"
                      checked={formValues.systemType === 'three'}
                      onChange={handleChange('systemType')}
                    />{' '}
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
              <label className="form-label">พื้นที่หลังคาโดยประมาณ (ตารางเมตร):</label>
              <input
                type="text"
                inputMode="decimal"
                className="form-field"
                disabled={!formValues.systemType}
                value={formValues.roofArea}
                onChange={handleChange('roofArea')}
                onFocus={() => {
                  console.log('Roof input focus, systemType=', formValues.systemType);
                  if (!formValues.systemType) setAttemptedRoofInput(true);
                }}
                onKeyDown={(e) => {
                  if (!formValues.systemType) {
                    e.preventDefault();
                    return;
                  }
                  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', '.', 'Delete'];
                  const isNumberKey = /^\d$/.test(e.key);
                  if (!isNumberKey && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  if (!formValues.systemType) e.preventDefault();
                }}
                onWheel={(e) => {
                  if (!formValues.systemType) e.preventDefault();
                }}
                placeholder={
                  formValues.systemType
                    ? formValues.systemType === 'single'
                      ? 'กรอกพื้นที่หลังคา : 9-45 ตารางเมตร'
                      : 'กรอกพื้นที่หลังคา : 45-179 ตารางเมตร'
                    : ''
                }
              />
              {errors.roofArea && <div className="error-text">{errors.roofArea}</div>}
              {!formValues.systemType && attemptedRoofInput && !errors.roofArea && (
                <div className="error-text">
                  *กรุณาเลือกระบบไฟฟ้าก่อนจึงจะสามารถกรอกพื้นที่หลังคาได้
                </div>
              )}
            </div>


            <h6 className={styles.instructions}>
              หมายเหตุ : ระบบไฟ 1 เฟส จะต้องระบุพื้นที่หลังคาให้อยู่ในช่วง 9-45 ตารางเมตร
            </h6>
            <h6 className={styles.instructions1} style={{ marginLeft: '4rem' }}>
              ระบบไฟ 3 เฟส จะต้องระบุพื้นที่หลังคาให้อยู่ในช่วง 45-179 ตารางเมตร
            </h6>

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
            <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>
              แพ็กเกจที่ออกแบบมาให้เหมาะกับพื้นที่หลังคาและรูปแบบการใช้พลังงานของคุณ
            </h4>

            <div className={`${styles.results} ${styles.fadeInUp}`}>
              <div className={styles.container}>
                {/* แถวสีส้ม */}
                <div className={`${styles.rowsolar} ${styles.highlight}`}>
                  <div className={styles.iconsolar}>
                    <img src="/icons/solar-energy.png" alt="Solar panel" />
                  </div>
                  <div className={styles.textsolar}>ขนาดระบบที่แนะนำ</div>
                  <div className={styles.valuesolar}>{results.recommended}</div>
                </div>

                {/* แถวสีขาว */}
                <div className={styles.rowsolar}>
                  <div className={styles.iconSmall}>
                    <img src="/icons/bill.png" alt="Savings" />
                  </div>
                  <div className={styles.textelectricity}>ค่าไฟที่ลดได้ต่อเดือน</div>
                  <div className={styles.value}>{results.savingsPerMonth?.toLocaleString()} บาท</div>
                </div>

                {/* แถวแยกไอคอนกลางวัน */}
                <div className={styles.rowSimple}>
                  <div className={styles.iconSimple}>
                    <img src="/icons/sun.png" alt="Day usage" />
                  </div>
                  <div className={styles.textFull}>
                    การใช้ไฟช่วงกลางวัน : {results.dayUnits?.toFixed(2)} KW ({results.dayUsage}%)
                  </div>
                </div>

                {/* แถวแยกไอคอนกลางคืน */}
                <div className={styles.rowSimple}>
                  <div className={styles.iconSimple}>
                    <img src="/icons/moon.png" alt="Night usage" />
                  </div>
                  <div className={styles.textFull}>
                    การใช้ไฟช่วงกลางคืน : {results.nightUnits?.toFixed(2)} KW ({(100 - results.dayUsage).toFixed(2)}%)
                  </div>
                </div>

                <h4
                  style={{
                    textAlign: 'center',
                    color: '#F2780C',
                    fontSize: '24px',
                    marginBottom: '6px',
                  }}
                  className="font-500"
                >
                  ระยะเวลาคืนทุน
                </h4>

                <h5
                  style={{
                    textAlign: 'center',
                    color: '#444',
                    fontSize: '18px',
                    marginTop: 0,
                    marginBottom: '20px',
                  }}
                >
                  Solar Rooftop เพื่อลดค่าไฟฟ้าอย่างยั่งยืน
                </h5>

                {/* กล่องขาวที่มี 4 บรรทัด */}
                <div className={styles.cardBox}>
                  <div className={styles.cardBottom}>
                    <div className={styles.labelsolarHead}>ระยะเวลาคืนทุน</div>
                    <div className={styles.valueHighlight}>{results.paybackPeriod || '-'} ปี</div>
                  </div>

                  <div className={styles.cardBottom}>
                    <div className={styles.labelsolar}>ค่าไฟที่ลดได้ต่อปี</div>
                    <div className={styles.value}>{results.savingsPerYear?.toLocaleString() || '-'} บาท</div>
                  </div>

                  <div className={styles.cardBottom}>
                    <div className={styles.labelsolar}>การใช้ไฟเฉลี่ยต่อเดือน</div>
                    <div className={styles.value}>{results.usageUnits?.toFixed(2) || '-'} KW</div>
                  </div>

                  <div className={styles.cardBottom}>
                    <div className={styles.labelsolar}>การใช้ไฟเฉลี่ยต่อวัน</div>
                    <div className={styles.value}>{results.averageDailyUnits?.toFixed(2) || '-'} KW</div>
                  </div>
                </div>
              </div>

              <div className={styles.buttonWrapper}>
                <button
                  className="buttonSecondaryonebule"
                  onClick={() => {
                    setResults(null);
                    setAttemptedRoofInput(false);
                  }}
                >
                  คำนวณใหม่
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
