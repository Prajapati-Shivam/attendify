import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import Navbar from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import ProtectedPage from '@/components/protected_page/ProtectedPage';
import AuthProvider from '@/providers/auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Attendlytics',
  description:
    'Attendlytics is a web-based attendance and analytics system that helps you to manage your institute attendance and get insights about your institute.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ProtectedPage>
              <Navbar />
              <Sidebar />
              {children}
            </ProtectedPage>
          </AuthProvider>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
