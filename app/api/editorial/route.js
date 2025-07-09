export async function GET() {
  const editorial = [
    {
      id: 1,
      title: "การบำรุงรักษาโซลาร์เซลล์อย่างถูกต้อง",
      date: "26 มิถุนายน 2568",
      mainImage: "/editorial/editorial1/editorial-main-1.jpg",
      content: `การทำความสะอาดแผงโซลาร์เซลล์ควรทำทุก 3–6 เดือน เพื่อขจัดฝุ่นและสิ่งสกปรกที่อาจลดประสิทธิภาพการผลิตไฟฟ้า ควรตรวจสอบสถานะของอินเวอร์เตอร์เป็นประจำ รวมถึงสัญญาณไฟที่บ่งบอกการทำงาน หากพบความผิดปกติควรติดต่อผู้เชี่ยวชาญทันที เพื่อความปลอดภัย ควรปิดระบบก่อนเริ่มทำความสะอาด และใช้เครื่องมือที่เหมาะสม`,
      gallery: ["/editorial/editorial1/editorial-gallery-1.jpg", "/editorial/editorial1/editorial-gallery-2.jpg","/editorial/editorial1/editorial-gallery-3.jpg", "/editorial/editorial1/editorial-gallery-4.jpg","/editorial/editorial1/editorial-gallery-5.jpg"]
    },
    {
      id: 2,
      title: "เทรนด์เทคโนโลยีโซลาร์เซลล์ในปี 2024",
      date: "26 มิถุนายน 2568",
      mainImage: "/editorial/beautiful-alternative-energy-plant-with-solar-panels_9_11zon.jpg",
      content: `ปี 2024 เทคโนโลยีโซลาร์เซลล์มีการพัฒนาอย่างต่อเนื่อง เช่น แผงแบบ PERC และ TOPCon ที่ให้ประสิทธิภาพสูงขึ้น นอกจากนี้ยังมีการเชื่อมต่อกับระบบสมาร์ทโฮมที่สามารถควบคุมผ่านแอปพลิเคชัน และการใช้งานแบตเตอรี่ลิเธียมไอออนที่ปลอดภัยและเก็บพลังงานได้ยาวนาน`,
      gallery: ["/editorial/article4-1.jpg", "/editorial/article4-2.jpg"]
    },
    {
      id: 3,
      title: "การคำนวณผลตอบแทนจากการติดตั้งโซลาร์",
      date: "26 มิถุนายน 2568",
      mainImage: "/editorial/solar-panels-red-tile-roof-with-clear-blue-sky-background_21_11zon.jpg",
      content: `การคำนวณ ROI ก่อนติดตั้งระบบโซลาร์เซลล์ควรพิจารณาค่าไฟเฉลี่ยต่อเดือน ขนาดระบบที่เหมาะสม ราคาติดตั้ง และประสิทธิภาพของระบบ โดยทั่วไป การลงทุนในโซลาร์เซลล์สามารถคืนทุนได้ภายใน 5–7 ปี ขึ้นอยู่กับปัจจัยด้านการใช้ไฟและราคาพลังงานในอนาคต`,
      gallery: ["/editorial/article5-1.jpg", "/editorial/article5-2.jpg"]
    },
    {
      id: 4,
      title: "แผงโซลาร์เซลล์แบบไหนเหมาะกับเมืองไทย",
      date: "26 มิถุนายน 2568",
      mainImage: "/editorial/bernd-dittrich-CDA62CsGDDM-unsplash_10_11zon.jpg",
      content: `แผง Monocrystalline เหมาะกับประเทศไทยเนื่องจากมีแดดจัดและให้ประสิทธิภาพสูงกว่าประเภทอื่น ควรเลือกแผงที่ได้รับการรับรองมาตรฐาน มอก. และมีการรับประกันอย่างน้อย 25 ปี รวมถึงเลือกผู้ผลิตที่มีศูนย์บริการในประเทศเพื่อความมั่นใจในการใช้งานระยะยาว`,
      gallery: ["/editorial/article6-1.jpg", "/editorial/article6-2.jpg"]
    },
    {
      id: 5,
      title: "โซลาร์เซลล์กับระบบกักเก็บพลังงาน (Battery)",
      date: "26 มิถุนายน 2568",
      mainImage: "/editorial/bill-mead-wmaP3Tl80ww-unsplash_11_11zon.jpg",
      content: `ระบบแบตเตอรี่ช่วยให้สามารถเก็บพลังงานไว้ใช้ในช่วงกลางคืนหรือเมื่อไฟดับ โดยเฉพาะในพื้นที่ที่ไฟฟ้าไม่เสถียร ปัจจุบันนิยมใช้แบตเตอรี่ลิเธียมไอออนที่มีความปลอดภัยและอายุการใช้งานยาวนาน เหมาะสำหรับบ้านที่ต้องการพึ่งพาพลังงานแสงอาทิตย์แบบ 100%`,
      gallery: ["/editorial/article7-1.jpg", "/editorial/article7-2.jpg"]
    },
    {
      id: 6,
      title: "ระบบ Net Metering และการขายไฟกลับ",
      date: "26 มิถุนายน 2568",
      mainImage: "/editorial/close-view-solar-panel_12_11zon.jpg",
      content: `ระบบ Net Metering ช่วยให้เจ้าของบ้านสามารถขายไฟฟ้าส่วนเกินกลับเข้าสู่ระบบของการไฟฟ้า ซึ่งขึ้นอยู่กับขนาดของระบบและนโยบายของรัฐ การติดตั้งระบบนี้ต้องขออนุญาตจากหน่วยงานที่เกี่ยวข้อง และควรศึกษาข้อมูลให้ชัดเจนก่อนดำเนินการ`,
      gallery: ["/editorial/article8-1.jpg", "/editorial/article8-2.jpg"]
    },
    {
      id: 7,
      title: "ค่าใช้จ่ายในการดูแลระบบโซลาร์ระยะยาว",
      date: "26 มิถุนายน 2568",
      mainImage: "/editorial/markus-spiske-rNn_TU8dvoY-unsplash_13_11zon.jpg",
      content: `แม้ว่าโซลาร์เซลล์ไม่มีค่าใช้จ่ายรายเดือน แต่ควรเผื่องบประมาณในการบำรุงรักษา เช่น ค่าทำความสะอาด ตรวจสอบระบบ และเปลี่ยนอินเวอร์เตอร์เมื่อครบอายุการใช้งาน ประมาณการค่าใช้จ่ายอยู่ที่ 1–2% ของค่าติดตั้งต่อปี`,
      gallery: ["/editorial/article9-1.jpg", "/editorial/article9-2.jpg"]
    },
    {
      id: 8,
      title: "ประโยชน์ของการติดตั้งโซลาร์เซลล์ (อัปเดต)",
      date: "26 มิถุนายน 2568",
      mainImage: "/editorial/modern-solar-power-station-generates-sustainable-electricity-outdoors-generated-by-ai_14_11zon.jpg",
      content: `โซลาร์เซลล์มีข้อดีทั้งด้านสิ่งแวดล้อมและเศรษฐกิจ เช่น การลดคาร์บอน ลดค่าไฟ และเพิ่มความสามารถในการพึ่งพาตนเองด้านพลังงาน อีกทั้งยังส่งเสริมการใช้พลังงานสะอาดในระดับประเทศอย่างยั่งยืน`,
      gallery: ["/editorial/article10-1.jpg", "/editorial/article10-2.jpg"]
    },
    {
      id: 9,
      title: "การติดตั้งโซลาร์เซลล์บนหลังคาเชิงพาณิชย์",
      date: "1 กรกฎาคม 2568",
      mainImage: "/editorial/aerial-view-private-house-with-solar-panels-roof_7_11zon.jpg",
      content: `การติดตั้งโซลาร์เซลล์บนหลังคาอาคารพาณิชย์สามารถลดค่าไฟฟ้าของธุรกิจได้อย่างมีนัยสำคัญ การวางแผนโครงสร้างหลังคาและระบบไฟฟ้าอย่างเหมาะสม รวมถึงเลือกใช้อุปกรณ์ที่มีคุณภาพ จะช่วยให้การลงทุนคุ้มค่าในระยะยาว`,
      gallery: ["/editorial/commercial-1.jpg", "/editorial/commercial-2.jpg"]
    },
    {
      id: 10,
      title: "แนวทางการขออนุญาตติดตั้งโซลาร์เซลล์ในประเทศไทย",
      date: "1 กรกฎาคม 2568",
      mainImage: "/editorial/aerial-view-private-house-with-solar-panels-roof_7_11zon.jpg",
      content: `ผู้ที่ต้องการติดตั้งโซลาร์เซลล์ในประเทศไทยจำเป็นต้องยื่นขออนุญาตกับหน่วยงานที่เกี่ยวข้อง เช่น การไฟฟ้า และองค์กรปกครองส่วนท้องถิ่น พร้อมแนบเอกสารสำคัญ เช่น แบบแปลน ขนาดระบบ สำเนาบัตรประชาชน และเอกสารสิทธิ์ในที่ดิน` ,
      gallery: ["/editorial/permit-1.jpg", "/editorial/permit-2.jpg"]
    }
  ];

  return Response.json({ editorial });
}