export async function GET() {
    const projectData = [
        {
            id: 1,
            title: "ต.ในเมือง อ.พิชัย จ.อุตรดิตถ์ ",
            type: "โรงงาน",
            description: "12,500 BTU",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/factory/F1/main-F1.png",
            content: `
                    ...
                    `,
            gallery: [
                "/success/factory/F1/gallery-F1-1.png",
                "/success/factory/F1/gallery-F1-2.png",
                "/success/factory/F1/gallery-F1-3.png",
                "/success/factory/F1/gallery-F1-4.png",
                "/success/factory/F1/gallery-F1-5.png"
            ]
        },
        {
            id: 2,
            title: "ต.ในเมือง อ.พิชัย จ.อุตรดิตถ์ ",
            type: "โรงงาน",
            description: "22,000 BTU",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/factory/F2/main-F2.jpg",
            content: `
                    ...
                    `,
            gallery: [
                "/success/factory/F2/gallery-f2-1.jpg",
                "/success/factory/F2/gallery-f2-2.jpg",
                "/success/factory/F2/gallery-f2-3.jpg",
                "/success/factory/F2/gallery-f2-4.jpg",
                "/success/factory/F2/gallery-f2-5.jpg"
            ]
        },

        {
            id: 3,
            title: "ต.ไร่อ้อย อ.พิชัย จ.อุตรดิตถ์ ",
            type: "โรงงาน",
            description: "3.3kW",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/factory/F3/main-F3.jpg",
            content: `
                    แบบติดตั้งระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคาและอาคาร ขนาด 30125 กิโลวัตต์
                    (3.125 kWp PV ROOFTOP PROJECT)
                    สถานที่ติดตั้ง  ตําบล ไร่อ้อย อําเภอ พิชัย จังหวัด อุตรดิตถ์ 53120
                    `,
            gallery: [
                "/success/factory/F3/gallery-f3-1.jpg",
                "/success/factory/F3/gallery-f3-2.jpg",
                "/success/factory/F3/gallery-f3-3.jpg",
                "/success/factory/F3/gallery-f3-4.jpg",
                "/success/factory/F3/gallery-f3-5.jpg"

            ]
        },

        {
            id: 4,
            title: "ต.ขุนฝาง อ.เมือง จ.อุตรดิตถ์  ",
            type: "โรงงาน",
            description: "17,500 BTU",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/factory/F4/main-F4.png",
            content: `
                    ...
                    `,
            gallery: [
                "/success/factory/F4/gallery-f4-1.png",
                "/success/factory/F4/gallery-f4-2.png",
                "/success/factory/F4/gallery-f4-3.png",
                "/success/factory/F4/gallery-f4-4.png",
                "/success/factory/F4/gallery-f4-5.png"

            ]
        },

        {
            id: 5,
            title: "ต.ชมพู อ.เนินมะปราง จ.พิษณุโลก  ",
            type: "โรงงาน",
            description: "20kW",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/factory/F5/main-F5.jpg",
            content: `
                    
แบบติดตั้งระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคาและอาคาร ขนาด 20.00 กิโลวัตต์
(20.00 kWp PV ROOFTOP PROJECT)
บานคุณ สมเกียรติ ปคุณพูลสิน
สถานที่ติดตั้ง 206/1 หมู่ 6 ตําบล ชมพู
อําเภอ เนินมะปราง จังหวัด พิษณุโลก 65190
                    `,
            gallery: [
                "/success/factory/F5/gallery-f5-1.jpg",
                "/success/factory/F5/gallery-f5-2.jpg",
                "/success/factory/F5/gallery-f5-3.jpg",
                "/success/factory/F5/gallery-f5-4.jpg",
                "/success/factory/F5/gallery-f5-5.jpg"
            ]
        },
        {
            id: 6,
            title: "ต.ท่าอิฐ อ.เมือง จ.อุตรดิตถ์ ",
            type: "บ้าน",
            description: "10kW",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/house/H1/main-H1.jpg",
            content: `
                    
แบบติดตั้งระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคาและอาคาร ขนาด 10.00 กิโลวัตต์
(10.00 kWp PV ROOFTOP PROJECT)
บ้านคุณ มณฑี พลอยสีสังข์
สถานที่ติดตั้ง 39/226 ตําบล ท่าอิฐ อําเภอ เมืองอุตรดิตถ์ จังหวัด อุตรดิตถ์ 53000
                    `,
            gallery: [
                "/success/house/H1/gallery-H1-1.jpg",
                "/success/house/H1/gallery-H1-2.jpg",
                "/success/house/H1/gallery-H1-3.jpg",
                "/success/house/H1/gallery-H1-4.jpg",
                "/success/house/H1/gallery-H1-5.jpg"

            ]
        },
        {
            id: 7,
            title: "ต.นาอิน อ.พิชัย จ.อุตรดิตถ์ ",
            type: "บ้าน",
            description: "9,200 BTU",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/house/H2/main-H2.png",
            content: `
                    ...
                    `,
            gallery: [
                "/success/house/H2/gallery-H2-1.png",
                "/success/house/H2/gallery-H2-2.png",
                "/success/house/H2/gallery-H2-3.png",
                "/success/house/H2/gallery-H2-4.png",
                "/success/house/H2/gallery-H2-5.png"

            ]
        },
        {
            id: 8,
            title: "ต.บุญเกิด อ.ดอกคำใต้ จ.พะเยา",
            type: "บ้าน",
            description: "9,200 BTU",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/house/H3/main-H3.png",
            content: `
                    ...
                    `,
            gallery: [
                "/success/house/H3/gallery-H3-1.png",
                "/success/house/H3/gallery-H3-2.png",
                "/success/house/H3/gallery-H3-3.png",
                "/success/house/H3/gallery-H3-4.png",
                "/success/house/H3/gallery-H3-5.png"

            ]
        },
        {
            id: 9,
            title: "ต.วังแดง อ.ตรอน จ.อุตรดิตถ์ ",
            type: "บ้าน",
            description: "12,500 BTU",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/house/H4/main-H4.jpg",
            content: `
                    ...
                    `,
            gallery: [
                "/success/house/H4/gallery-H4-1.jpg",
                "/success/house/H4/gallery-H4-2.jpg",
                "/success/house/H4/gallery-H4-3.jpg",
                "/success/house/H4/gallery-H4-4.jpg",
                "/success/house/H4/gallery-H4-5.jpg"
            ]
        },
        {
            id: 10,
            title: "ต.วังโพรง อ.เนินมะปราง จ.พิษณุโลก ",
            type: "บ้าน",
            description: "22,000 BTU",
            size: "3.5 kW",
            panelCount: 6,
            postDate: "12 นิถุนายน 2568",
            productType: "แอร์",
            coverImage: "/success/house/H5/main-H5.jpg",
            content: `
                    ...
                    `,
            gallery: [
                "/success/house/H5/gallery-H5-1.jpg",
                "/success/house/H5/gallery-H5-2.jpg",
                "/success/house/H5/gallery-H5-3.jpg",
                "/success/house/H5/gallery-H5-4.jpg",
                "/success/house/H5/gallery-H5-5.jpg"

            ]
        }

];

    const projects = [];
    const baseCount = projectData.length;

    for (let i = 0; i < 550; i++) {
        const base = projectData[i % baseCount];
        projects.push({
            ...base,
            id: i + 1,
        });
    }

    return Response.json({ projects });
}
