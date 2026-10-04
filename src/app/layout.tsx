import type { Metadata } from 'next';
import './globals.scss';
import { Archivo } from 'next/font/google';


export const metadata: Metadata = {
  title: 'Redberry Cinema',
  description: 'Cinema booking application',
};

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}