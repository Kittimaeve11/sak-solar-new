import { LocaleProvider } from './Context/LocaleContext';
import Navbartest from './components/Navbartest';
import TabMenu from './components/TabMenu';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import './globals.css';
import FloatingButtons from './components/FloatingButtons';
import ToastProvider from './components/ToastProvider';
import ClientConditionalLayout from './components/ClientConditionalLayout'; // <-- ใส่ไว้

import localFont from 'next/font/local';

const sukhumvitTadmai = localFont({
  src: [
    { path: '../public/fonts/SukhumvitTadmai-UltraLight.otf', weight: '200', style: 'normal' },
    { path: '../public/fonts/SukhumvitTadmai-Text.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/SukhumvitTadmai-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../public/fonts/SukhumvitTadmai-ExtraBold.otf', weight: '800', style: 'normal' },
  ],
  variable: '--font-sukhumvit',
  display: 'swap',
});

export const metadata = {
  title: 'Saksiame Solar ศักดิ์สยามโซลาร์',
  description: 'เว็บไซต์ Saksiame Solar',
  icons: {
    icon: 'logosakico.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={sukhumvitTadmai.variable}>
      <body className="font-sukhumvit">
        <LocaleProvider>
          {/* component นี้จะใช้ client side hook แยกออกไป */}
          <ClientConditionalLayout>{children}</ClientConditionalLayout>
        </LocaleProvider>
      </body>
    </html>
  );
}
