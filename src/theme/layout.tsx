import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/theme/styles/theme.css';
import { CartProvider } from '@/theme/components/CartContext';
import { CartDrawer } from '@/theme/components/CartDrawer';
import { Header } from '@/theme/components/Header';
import { Footer } from '@/theme/components/Footer';
import { RivodeskAnalytics } from '@/theme/RivodeskAnalytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Halvior',
    template: '%s | Halvior',
  },
  description: 'Built to outlast. Belgian discipline. Uncompromising craft.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CartProvider>
          <RivodeskAnalytics />
          <Header shopName="Halvior" />
          <CartDrawer />
          <main>{children}</main>
          <Footer shopName="Halvior" />
        </CartProvider>
      </body>
    </html>
  );
}