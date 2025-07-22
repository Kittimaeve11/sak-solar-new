// app/layout.js
import { LocaleProvider } from './Context/LocaleContext';
import Navbartest from './components/Navbartest';
import TabMenu from './components/TabMenu';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import './globals.css';
import ContactChannels from './components/ContactChannels';
import CookieBanner from './components/CookieBanner';
import FloatingButtons from './components/FloatingButtons';
import RouteLoadingOverlay from './components/RouteLoadingOverlay';
import localFont from 'next/font/local';
import ToastProvider from './components/ToastProvider';
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
    <html lang="th">
      <body>
        {/* <RouteLoadingOverlay /> */}
        <LocaleProvider>
          <Navbartest />
          <TabMenu />
          <main>{children}</main>
          <ToastProvider />
          <FloatingButtons />
          <BackToTopButton />
          {/* <ContactChannels /> */}
          {/* <CookieBanner /> */}

          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
