import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout(props: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    const locale = await Promise.resolve(props.params.locale);

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    {props.children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
