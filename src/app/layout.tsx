import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../styles/globals.css';

export const metadata = {
  title: 'Lary Enock | Portfolio',
  description: 'Fullstack Developer',
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}