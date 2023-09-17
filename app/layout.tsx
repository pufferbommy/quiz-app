import './globals.css';
import type { Metadata } from 'next';

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
        <div className="px-3">
          <div className="max-w-md relative mx-auto pt-20">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
