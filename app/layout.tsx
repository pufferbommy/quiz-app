import './globals.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Noto_Sans_Thai } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const notoSansThai = Noto_Sans_Thai({
  weight: '400',
  subsets: ['thai'],
});

export const metadata: Metadata = {
  title: 'โจ๊กปริศนา',
  description: 'โจ๊กปริศนา',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={notoSansThai.className}>
      <body>
        <NextTopLoader />
        <div className="px-4 h-full">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
