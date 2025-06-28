import { notFound } from 'next/navigation';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Projects from '../../components/Projects';
import Contact from '../../components/Contact';
import Header from '@/components/Header';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

const locales = ['en', 'fr'];

export default async function Home(
    { params }: { params: { locale: string } }

) {
    const locale = params.locale;
    if (!locales.includes(locale)) {
        notFound();
    }
    return (
        <>
            <Header />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
}
