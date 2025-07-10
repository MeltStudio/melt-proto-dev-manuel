import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tasks Management App',
  description:
    'A modern task management application built with Next.js, React Query, and Tailwind CSS',
  keywords: ['tasks', 'management', 'productivity', 'react', 'nextjs'],
  authors: [{ name: 'Tasks Management Team' }],
  openGraph: {
    title: 'Tasks Management App',
    description:
      'Manage your tasks efficiently with our comprehensive task management system',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
