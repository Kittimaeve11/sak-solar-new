'use client';

import React from 'react';
import styles from './FreeServices.module.css';

export default function FreeServices({ contacts = [], locale }) {
  if (!contacts || contacts.length === 0) return null;

  // แบ่ง contacts ออกเป็นสองส่วน
  const count = contacts.length;
  let topContacts = [];
  let bottomContacts = [];

  if (count < 6) {
    topContacts = contacts;
  } else if (count === 6) {
    topContacts = contacts.slice(0, 3);
    bottomContacts = contacts.slice(3);
  } else {
    const topCount = Math.floor(count / 2);
    topContacts = contacts.slice(0, topCount);
    bottomContacts = contacts.slice(topCount);
  }

  const renderCards = (items) =>
    items.map(
      (item) =>
        item?.image && (item.SubjectTH || item.SubjectENG) && (
          <div key={item.id} className={styles.cardfree }>
            <img
              src={item.image}
              alt={item.SubjectENG || 'Free Service'}
              className={styles.icon}
              loading="lazy"
            />
            <p className={styles.textfree }>{locale === 'th' ? item.SubjectTH : item.SubjectENG}</p>
          </div>
        )
    );

  return (
    <div>
       <h1 className={styles.headersolar}>ข้อมูลบริการฟรี</h1>
      <h4
        style={{
          textAlign: 'center',
          marginTop: -10,
          marginBottom: 20,
          fontWeight: 400,
        }}
      >
        บริการครบครันตั้งแต่การปรึกษา ติดตั้งฟรี จนถึงการดูแลหลังการขาย
      </h4>

      <div style={{ marginBottom: '24px' }}>
        <div className={styles.gridWrapper}>
          <div className={styles.gridContainer}>{renderCards(topContacts)}</div>
        </div>

        {bottomContacts.length > 0 && (
          <div className={styles.gridWrapper}>
            <div className={styles.gridContainer}>{renderCards(bottomContacts)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
