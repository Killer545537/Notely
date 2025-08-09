import HeroSection from '@/components/hero-section';
import { HeroHeader } from '@/components/header';
import Features from '@/components/features';
import FooterSection from '@/components/footer';

const Home = () => (
    <main>
        <HeroHeader />
        <HeroSection />
        <Features/>
        <FooterSection/>
    </main>
);

export default Home;