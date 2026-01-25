import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/widgets/header/ui/Navigation';
import { Footer } from '@/widgets/footer/ui/Footer';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import '@/shared/reset.css';
import '@/shared/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Schnee - Frontend Developer',
  description: 'Schnee. Frontend Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navigation />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}

