import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'fr'];

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is vali²²
    if (!locales.includes(locale as any)) {
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