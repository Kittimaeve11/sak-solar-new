// app/api/review/route.js
import { NextResponse } from 'next/server';

const mockReviews = [
  {
    id: '1',
    title: 'รีวิวแอร์บ้าน ประหยัดไฟ',
    date: '6 กรกฎาคม 2568',
    thumbnail: 'https://www.youtube.com/watch?v=V79Hfn7EYGU',
    url: 'https://www.youtube.com/watch?v=V79Hfn7EYGU',
    description: 'สินเชื่อโซลาร์เซลล์ ประหยัด..ลดค่าไฟฟ้าได้จริง',
  },
  {
    id: '2',
    title: 'สินเชื่อโซลาร์เซลล์ ประหยัด ลดค่าไฟฟ้าได้จริง',
    date: '6 กรกฎาคม 2568',
    thumbnail: 'https://www.youtube.com/watch?v=MXjpk4iM2nM',
    url: 'https://www.youtube.com/watch?v=MXjpk4iM2nM',
    description: 'คลิปนี้พูดถึงระบบโซลาร์รูฟท็อปในบ้านเดี่ยว พร้อมคำนวณระยะคืนทุน',
  },
    {
    id: '3',
    title: 'โซลาร์รูฟท็อป คุ้มไหม?',
    date: '7 กรกฎาคม 2568',
    thumbnail: 'https://i3.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=MXjpk4iM2nM',
    description: 'คลิปนี้พูดถึงระบบโซลาร์รูฟท็อปในบ้านเดี่ยว พร้อมคำนวณระยะคืนทุน',
  }
];

export async function GET() {
  return NextResponse.json(mockReviews);
}
