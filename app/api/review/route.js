// app/api/review/route.js
import { NextResponse } from 'next/server';

const mockReviews = [
  {
    id: '1',
    title: 'รีวิวแอร์บ้าน ประหยัดไฟ',
    date: '2025-07-06',
    thumbnail: 'https://i3.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'รีวิวแอร์ประหยัดไฟ พร้อมวิเคราะห์ค่าติดตั้งและบำรุงรักษา',
  },
  {
    id: '2',
    title: 'โซลาร์รูฟท็อป คุ้มไหม?',
    date: '2025-07-05',
    thumbnail: 'https://i3.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg',
    url: 'https://www.w3schools.com/html/movie.mp4',
    description: 'คลิปนี้พูดถึงระบบโซลาร์รูฟท็อปในบ้านเดี่ยว พร้อมคำนวณระยะคืนทุน',
  },
];

export async function GET() {
  return NextResponse.json(mockReviews);
}
