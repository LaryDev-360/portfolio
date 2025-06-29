import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'fr'];

export default getRequestConfig(async ({ locale }) => {
    // Handle undefined locale or invalid locale
    if (!locale || !locales.includes(locale)) {
        // Return messages for default locale (en)
        return {
            locale: 'en',
            messages: (await import(`./src/messages/en.json`)).default
        };
    }

    return {
        locale,
        messages: (await import(`./src/messages/${locale}.json`)).default
    };
});