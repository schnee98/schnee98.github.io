import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/widgets/header/ui/Navigation';
import { Footer } from '@/widgets/footer/ui/Footer';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import '@/shared/reset.css';
import '@/shared/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Schnee98 - Frontend Developer',
    template: '%s | Schnee98'
  },
  description: 'Frontend Developer interested in the value of solid, reliable and robust products.',
  keywords: ['frontend', 'developer', 'react', 'typescript', 'nextjs', 'web development'],
  authors: [{ name: 'Schnee98' }],
  openGraph: {
    title: 'Schnee98 - Frontend Developer',
    description: 'Frontend Developer interested in the value of solid, reliable and robust products.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Schnee98\'s Blog',
  },
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://schnee98.github.io' : 'http://localhost:3000'),
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

