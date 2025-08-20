import Footer from '@/shared/components/Footer';
import HeroAndNavigationSection from '@/app/components/HeroAndNavigationSection';
import QuickStartSection from '@/app/components/QuickStartSection';
import FeaturedExamplesSection from '@/app/components/FeaturedExamplesSection';

export default function HomePage() {
  return (
    <>
      <HeroAndNavigationSection />
      <QuickStartSection />
      <FeaturedExamplesSection />
      <Footer />
    </>
  );
}