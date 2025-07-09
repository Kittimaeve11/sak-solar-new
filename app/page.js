'use client';

import { useLocale } from './Context/LocaleContext';
import './globals.css';
import styles from './Home.module.css';
import Image from 'next/image';
import BannerSlider from './components/BannerSlider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { products } from './data/products';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { PiSolarPanelDuotone } from "react-icons/pi";

const calculateSolarSize = (electricityCost, dayUsage, installationCost) => {
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

const validationSchema = Yup.object({
  product: Yup.string().required('กรุณาระบุสินค้าหรือบริการ'),
  package: Yup.string().required('กรุณาเลือกแพ็คเกจ'),
  usageTime: Yup.string().required('กรุณาระบุช่วงเวลาใช้ไฟ'),
  fullName: Yup.string().required('กรุณาระบุชื่อ-นามสกุล'),
  phone: Yup.string().required('กรุณาระบุเบอร์โทร'),
  contactTime: Yup.string().required('กรุณาเลือกช่วงเวลาติดต่อกลับ'),
  product: Yup.string().required('กรุณาเลือกสินค้าหรือบริการ'),

});



export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const { locale } = useLocale();
  const [results, setResults] = useState(null);
  const [attemptedRoofInput, setAttemptedRoofInput] = useState(false);
  const [showForm, setShowForm] = useState(true); // NEW
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState({ provinces: [], amphures: [], tambons: [] });
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetch('/api/home-page')
      .then((res) => res.json())
      .then((data) => setContacts(data.contacts));
  }, []);

  let topContacts = [];
  let bottomContacts = [];
  const count = contacts.length;
  if (count < 6) {
    topContacts = contacts;
    bottomContacts = [];
  } else if (count === 6) {
    topContacts = contacts.slice(0, 3);
    bottomContacts = contacts.slice(3);
  } else {
    const topCount = Math.floor(count / 2);
    topContacts = contacts.slice(0, topCount);
    bottomContacts = contacts.slice(topCount);
  }

  const validationSchema = Yup.object({
    electricityCost: Yup.number().required('*กรุณากรอกค่าไฟฟ้า'),
    systemType: Yup.string().required('*กรุณาเลือกระบบไฟฟ้า'),
    roofArea: Yup.number()
      .transform((value, originalValue) => {
        return originalValue === '' ? NaN : value;
      })

      .required('*กรุณากรอกพื้นที่หลังคา')
      .when('systemType', {
        is: 'single',
        then: (schema) =>
          schema
            .min(9, '*พื้นที่สำหรับ 1 เฟส ต้องไม่ต่ำกว่า 9 ตารางเมตร.')
            .max(45, '*พื้นที่สำหรับ 1 เฟส ต้องไม่เกิน 45 ตารางเมตร.'),
      })
      .when('systemType', {
        is: 'three',
        then: (schema) =>
          schema
            .min(45, '*พื้นที่สำหรับ 3 เฟส ต้องไม่ต่ำกว่า 45 ตารางเมตร.')
            .max(179, '*พื้นที่สำหรับ 3 เฟส ต้องไม่เกิน 179 ตารางเมตร.'),
      }),
  });

  useEffect(() => {
    const loadData = async () => {
      const [prov, amph, tamb] = await Promise.all([
        fetch('/data/thai_provinces.json').then(res => res.json()),
        fetch('/data/thai_amphures.json').then(res => res.json()),
        fetch('/data/thai_tambons.json').then(res => res.json()),
      ]);
      setProvinces(prov);
      setAmphures(amph);
      setTambons(tamb);
    };

    loadData();
  }, []);


  useEffect(() => {
    setProductOptions(products); // โหลดข้อมูลจำลองในครั้งแรก
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const [p, a, t] = await Promise.all([
        fetch('/data/thai_provinces.json').then(res => res.json()),
        fetch('/data/thai_amphures.json').then(res => res.json()),
        fetch('/data/thai_tambons.json').then(res => res.json()),
      ]);
      setData({ provinces: p, amphures: a, tambons: t });
    };
    fetchData();
  }, []);

  // 🔻 ปิด dropdown เมื่อคลิกนอก
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // ฟังก์ชันค้นหาที่อยู่
  const handleInputChange = (e) => {
    const text = e.target.value.trim();
    setQuery(text);

    if (!text) return setSuggestions([]);

    const matched = [];

    // 🔍 ค้นหาจากตำบลก่อน
    data.tambons.forEach((t) => {
      if (t.name_th.includes(text)) {
        const amphure = data.amphures.find((a) => a.id === t.amphure_id);
        const province = data.provinces.find((p) => p.id === amphure?.province_id);
        matched.push({
          subDistrict: t.name_th,
          district: amphure?.name_th || '',
          province: province?.name_th || '',
        });
      }
    });

    // ค้นหาอำเภอ
    data.amphures.forEach((a) => {
      if (a.name_th.includes(text)) {
        const province = data.provinces.find((p) => p.id === a.province_id);
        matched.push({
          subDistrict: '',
          district: a.name_th,
          province: province?.name_th || '',
        });
      }
    });

    // ค้นหาจังหวัด
    data.provinces.forEach((p) => {
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
    const text = `${item.subDistrict ? item.subDistrict + ', ' : ''}${item.district ? item.district + ', ' : ''}${item.province}`;
    setQuery(text);
    setSuggestions([]);
    setFieldValue('subDistrict', item.subDistrict);
    setFieldValue('district', item.district);
    setFieldValue('province', item.province);
  };

  return (
    <>
      <BannerSlider />
      <h5 className="headline">
        ติดตั้งโซลาร์เซลล์กับทีมช่างที่ได้มารฐาน <br />
        และได้รับการรับรองจากการไฟฟ้า (PEA)
      </h5>
      <div >

        <h1 className={styles.headersolar}>ข้อมูลบริการฟรี</h1>
        <h3 style={{
          textAlign: 'center',
          marginTop: '0px',
          marginBottom: '20px',
          fontWeight: 400
        }}>บริการครบครันตั้งแต่การปรึกษา ติดตั้งฟรี จนถึงการดูแลหลังการขาย </h3>


        <div style={{ marginBottom: '24px' }}>
          {count < 6 ? (

            <div className={styles.gridWrapper}>

              <div className={styles.gridContainer}>

                {topContacts
                  .filter(
                    (item) =>
                      item &&
                      item.image &&
                      (item.SubjectTH || item.SubjectENG)
                  )
                  .map((item) => (
                    <div key={item.id} className={styles.cardfree}>
                      <img
                        src={item.image}
                        alt={item.SubjectENG}
                        className={styles.icon}
                      />
                      <p className={styles.label}>
                        {locale === 'th' ? item.SubjectTH : item.SubjectENG}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.gridWrapper}>
                <div className={styles.gridContainer}>
                  {topContacts
                    .filter(
                      (item) =>
                        item &&
                        item.image &&
                        (item.SubjectTH || item.SubjectENG)
                    )
                    .map((item) => (
                      <div key={item.id} className={styles.cardfree}>
                        <img
                          src={item.image}
                          alt={item.SubjectENG}
                          className={styles.icon}
                        />
                        <p className={styles.textfree}>
                          {locale === 'th' ? item.SubjectTH : item.SubjectENG}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.gridWrapper}>
                <div className={styles.gridContainer}>
                  {bottomContacts
                    .filter(
                      (item) =>
                        item &&
                        item.image &&
                        (item.SubjectTH || item.SubjectENG)
                    )
                    .map((item) => (
                      <div key={item.id} className={styles.cardfree}>
                        <img
                          src={item.image}
                          alt={item.SubjectENG}
                          className={styles.icon}
                        />
                        <p className={styles.textfree}>
                          {locale === 'th' ? item.SubjectTH : item.SubjectENG}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

          )}
        </div>

        <div className={styles.containersolar}>
          <div className={styles.formWrapper}>
            <h1 className={styles.headersolar}>
              {showForm ? 'ระบบคำนวณขนาด Solar Rooftop ที่เหมาะสม' : 'ผลการคำนวณขนาดติดตั้ง'}
            </h1>

            {showForm && (
              <>
                {/* <h6 className={styles.instructions}>วิธีใช้งาน : กรอกข้อมูลที่ต้องการคำนวณ</h6>
                <h6 className={styles.instructions1}>1 : กดคำนวณ</h6>
                <h6 className={styles.instructions1}>2 : กดคำนวณแพ็คเกจ เพื่อเปรียบเทียบแพ็คเกจที่เหมาะสม</h6>
                <h6 className={styles.instructions2}>คำแนะนำ : เพื่อให้ข้อมูลที่คำนวณแม่นยำที่สุด กรุณาเคลียร์ข้อมูลก่อนคำนวณครั้งใหม่</h6> */}
              </>
            )}
            {showForm && (
              <Formik
                initialValues={{ electricityCost: '', systemType: '', roofArea: '', dayUsage: 60 }}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={(values) => {
                  const { electricityCost, systemType, roofArea, dayUsage } = values;

                  if (
                    (systemType === 'single' && (roofArea < 9 || roofArea > 45)) ||
                    (systemType === 'three' && (roofArea < 45 || roofArea > 179))
                  ) {
                    alert('พื้นที่หลังคาไม่เหมาะสมกับประเภทของระบบไฟฟ้าที่เลือก');
                    return;
                  }

                  const result = calculateSolarSize(electricityCost, dayUsage);
                  setResults(result);
                  setShowForm(false); // Hide form
                }}
              >
                {({ values, setFieldValue, resetForm }) => (
                  <Form noValidate>
                    <div className={styles.row}>
                      <div className={`${styles.formGroup} ${styles.flexGrow}`}>
                        <label className="form-label">ค่าไฟฟ้าต่อเดือน (บาท):</label>
                        <Field type="number" name="electricityCost" className="form-field" />
                        <ErrorMessage name="electricityCost" component="div" className="error-text" />
                      </div>

                      <div className={`${styles.formGroup} ${styles.alignRight}`}>
                        <label className="form-label" style={{ marginBottom: '1rem' }}>ระบบไฟฟ้า:</label>
                        <div className={styles.radioGroup}>
                          <label className="form-radio">
                            <Field type="radio" name="systemType" value="single" className="radio-input" /> 1 เฟส
                          </label>
                          <label className="form-radio">
                            <Field type="radio" name="systemType" value="three" className="radio-input" /> 3 เฟส
                          </label>
                        </div>
                        <ErrorMessage name="systemType" component="div" className="error-text" style={{ marginTop: '0.5rem' }} />
                      </div>
                    </div>

                    <label className="form-label">เปอร์เซ็นต์การใช้ไฟฟ้าในช่วงกลางวันและกลางคืน</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={values.dayUsage}
                      onChange={(e) => setFieldValue('dayUsage', Number(e.target.value))}
                      className={styles.rangeControl}
                      style={{
                        background: `linear-gradient(to right, #F2780C ${values.dayUsage}%, #F2F2F2 ${values.dayUsage}%)`,
                      }}
                    />
                    <div className={styles.usageSplit}>
                      <span>ช่วงกลางวัน {values.dayUsage} %</span>
                      <span>ช่วงกลางคืน {100 - values.dayUsage} %</span>
                    </div>

                    <div className={styles.formGroup}>
                      <label className="form-label">พื้นที่หลังคาโดยประมาณ (ตารางเมตร):</label>
                      <Field
                        type="number"
                        name="roofArea"
                        inputMode="decimal"
                        step="any"
                        className="form-field"
                        min={values.systemType === 'single' ? 9 : values.systemType === 'three' ? 45 : undefined}
                        max={values.systemType === 'single' ? 45 : values.systemType === 'three' ? 179 : undefined}
                        disabled={!values.systemType}
                        onFocus={() => {
                          if (!values.systemType) {
                            setAttemptedRoofInput(true);
                          }
                        }}
                        onChange={(e) => {
                          setFieldValue('roofArea', e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (!values.systemType) {
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
                          if (!values.systemType) e.preventDefault();
                        }}
                        onWheel={(e) => {
                          if (!values.systemType) e.preventDefault();
                        }}
                      />
                    </div>
                    <ErrorMessage name="roofArea" component="div" className="error-text" />
                    {!values.systemType && (
                      <div className="error-text">*กรุณาเลือกระบบไฟฟ้าก่อนจึงจะสามารถกรอกพื้นที่หลังคาได้</div>
                    )}

                    <h6 className={styles.instructions}>หมายเหตุ : ระบบไฟ 1 เฟส จะต้องระบุพื้นที่หลังคาให้อยู่ในช่วง 9-45 ตารางเมตร </h6>
                    <h6 className={styles.instructions1} style={{ marginLeft: '4rem' }}>
                      ระบบไฟ 3 เฟส จะต้องระบุพื้นที่หลังคาให้อยู่ในช่วง 45-179 ตารางเมตร
                    </h6>

                    <div className={styles.buttonGroup}>
                      <button type="submit" className="buttonSecondaryonebule">คำนวณ</button>
                      <button
                        type="button"
                        className="buttonSecondaryonedelte"
                        onClick={() => {
                          resetForm();
                          setResults(null);
                          setShowForm(true); // Show form again after reset
                        }}
                      >
                        เคลียร์ข้อมูลและรีเฟรชหน้า
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
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
                      <div className={styles.textFull}>การใช้ไฟช่วงกลางวัน : {results.dayUnits?.toFixed(2)} KW ({results.dayUsage}%)</div>
                    </div>

                    {/* แถวแยกไอคอนกลางคืน */}
                    <div className={styles.rowSimple}>
                      <div className={styles.iconSimple}>
                        <img src="/icons/moon.png" alt="Night usage" />
                      </div>
                      <div className={styles.textFull}>การใช้ไฟช่วงกลางคืน : {results.nightUnits?.toFixed(2)} KW ({(100 - results.dayUsage).toFixed(2)}%)</div>
                    </div>
                    <h4
                      style={{
                        textAlign: 'center',
                        color: '#F2780C',
                        fontSize: '24px',
                        marginBottom: '6px', // ลดจาก 10px
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
                        marginTop: '0',       // เอาระยะห่างด้านบนออก
                        marginBottom: '20px',
                      }}
                    >
                      Solar Rooftop เพื่อลดค่าไฟฟ้าอย่างยั่งยืน
                    </h5>

                    {/* กล่องขาวที่มี 4 บรรทัด */}
                    <div className={styles.cardBox}>
                      <div className={styles.cardBottom}>
                        <div className={styles.labelsolarHead}>ระยะเวลาคืนทุน</div>
                        <div className={styles.valueHighlight}>{results.paybackPeriod} - ปี </div>
                      </div>

                      <div className={styles.cardBottom}>
                        <div className={styles.labelsolar}>ค่าไฟที่ลดได้ต่อปี</div>
                        <div className={styles.value}>{results.savingsPerYear?.toLocaleString()} บาท</div>
                      </div>

                      <div className={styles.cardBottom}>
                        <div className={styles.labelsolar}>การใช้ไฟเฉลี่ยต่อเดือน</div>
                        <div className={styles.value}>{results.usageUnits?.toFixed(2)} KW</div>
                      </div>

                      <div className={styles.cardBottom}>
                        <div className={styles.labelsolar}>การใช้ไฟเฉลี่ยต่อวัน</div>
                        <div className={styles.value}>{results.averageDailyUnits?.toFixed(2)} KW</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.buttonWrapper}>
                    <button
                      className="buttonSecondaryonebule"
                      onClick={() => {
                        setShowForm(true);
                        setResults(null);
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
      </div>



      <div className={styles.formWrapper} style={{ marginTop: '3rem' }}>
        <h1 className={styles.headersolar}>สนใจโซลาร์เซลล์</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          หรือต้องการปรึกษาการติดตั้ง เรายินดีให้คำแนะนำ
        </p>
        <Formik
          initialValues={{
            product: '',
            package: '',
            usageTime: '',
            fullName: '',
            phone: '',
            district: '',
            subDistrict: '',
            province: '',
            contactTime: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('ส่งข้อมูล:', values);
          }}
        >
          {({ values, setFieldValue }) => {
            useEffect(() => {
              const matchedTambon = tambons.find(t => t.name_th === values.subDistrict);
              if (matchedTambon) {
                const amphure = amphures.find(a => a.id === matchedTambon.amphure_id);
                const province = provinces.find(p => p.id === amphure?.province_id);
                if (amphure && province) {
                  setFieldValue('district', amphure.name_th);
                  setFieldValue('province', province.name_th);
                }
              }
            }, [values.subDistrict]);

            return (
              <Form >
                <div>
                  <label className="form-label">สินค้าหรือบริการที่สนใจ :</label>
                  {productOptions.map((product) => (
                    <div key={product.slug}>
                      <label className="form-radio">
                        <Field type="radio" name="product" className="radio-input" value={product.slug} />
                        {product.name}
                      </label>
                    </div>
                  ))}
                  <ErrorMessage name="product" component="div" className="error-text" />
                </div>
                <div className="form-select-wrapper">
                  <label htmlFor="package" className="form-label">ราคาที่ยอมรับได้ :</label>

                  <Field name="package">
                    {({ field }) => (
                      <div className="custom-select-container" style={{ position: 'relative' }}>
                        <select
                          {...field}
                          className={`form-select ${field.value === '' ? 'placeholder' : ''}`}
                          required
                          style={{ fontSize: '15px' }}
                        >
                          <option value="" disabled hidden >กรุณาเลือกราคาที่ยอมรับได้**</option>
                          <option value="low">ประหยัด (ต่ำกว่า 100,000 บาท)</option>
                          <option value="medium">กลาง (100,000 - 250,000 บาท)</option>
                          <option value="premium">Premium (มากกว่า 250,000 บาท)</option>
                          <option value="unsure">ไม่แน่ใจ ต้องการให้เจ้าหน้าที่แนะนำ</option>                        </select>
                        <MdOutlineKeyboardArrowDown className="select-arrow" />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage name="package" component="div" className="error-text" />
                </div>

                <div>
                  <label className="form-label">ช่วงเวลาที่ใช้ไฟ :</label>
                  <div className="radio-group">
                    <label className="form-radio">
                      <Field type="radio" name="usageTime" value="day" className="radio-input" />
                      กลางวัน
                    </label>
                    <label className="form-radio">
                      <Field type="radio" name="usageTime" value="night" className="radio-input" />
                      กลางคืน
                    </label>
                  </div>
                  <ErrorMessage name="usageTime" component="div" className="error-text" />
                </div>
                <div >
                  <label className="form-label">ชื่อจริง-นามสกุลจริง :</label>
                  <Field type="text" name="fullName" placeholder="กรุณากรอกชื่อ - นามสกุล ของท่าน**" required className="form-field" style={{ fontSize: '15px' }} />
                  <ErrorMessage name="fullName" component="div" className="error-text" />
                </div>

                <div >
                  <label className="form-label">หมายเลขโทรศัพท์มือถือ :</label>
                  <Field type="tel" name="phone" placeholder="กรุณากรอกเบอร์โทรศัพท์ของท่าน**" required className="form-field" style={{ fontSize: '15px' }} />
                  <ErrorMessage name="phone" component="div" className="error-text" />
                </div>

                <div
                  ref={wrapperRef}
                  style={{
                    position: 'relative',
                    marginBottom: 0 // 👈 ไม่มีช่องว่างด้านล่าง เพื่อให้ <ul> ติดกับ input
                  }}
                >
                  <label className="form-label">ค้นหาที่อยู่ :</label>
                  <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    className="form-field"
                    placeholder="เช่น (ตำบล)ท่าอิฐ, (อำเภอ)เมืองอุตรดิตถ์, (จังหวัด)อุตรดิตถ์"
                    style={{ fontSize: '15px' }}
                  />

                  {suggestions.length > 0 && (
                    <ul
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #ccc',
                        zIndex: 1000,
                        listStyle: 'none',
                        padding: 0,
                        margin: 0, // 👈 ตรงนี้สำคัญ! ไม่มีระยะห่างจาก input
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}
                    >
                      {suggestions.map((s, i) => (
                        <li
                          key={i}
                          style={{ padding: '8px', cursor: 'pointer' }}
                          onClick={() => handleSelect(s)}
                        >
                          {`${s.subDistrict ? s.subDistrict + ', ' : ''}${s.district ? s.district + ', ' : ''}${s.province}`}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Hidden Formik fields */}
                  <Field type="hidden" name="subDistrict" />
                  <Field type="hidden" name="district" />
                  <Field type="hidden" name="province" />

                  <ErrorMessage name="subDistrict" component="div" className="error-text" />
                  <ErrorMessage name="district" component="div" className="error-text" />
                  <ErrorMessage name="province" component="div" className="error-text" />
                </div>


                <div className="form-select-wrapper">
                  <label htmlFor="contactTime" className="form-label">ช่วงเวลาที่สะดวกให้ติดต่อกลับ :</label>

                  <Field name="contactTime">
                    {({ field }) => (
                      <div className="custom-select-container" style={{ position: 'relative' }}>
                        <select
                          {...field}
                          className={`form-select ${field.value === '' ? 'placeholder' : ''}`}
                          required
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
                    )}
                  </Field>
                  <ErrorMessage name="contactTime" component="div" className="error-text" />
                </div>

                <div className={styles.row} style={{ display: 'flex', justifyContent: 'center' }}>
                  <button type="submit" className="buttonSecondaryoneorange">
                    ส่งข้อความ
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>


    </>
  );
}