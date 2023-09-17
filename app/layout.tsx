import './globals.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'โจ๊กปริศนา',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader />
        <div className="px-4">
          <div className="max-w-md relative mx-auto pt-32">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
