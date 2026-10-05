import MainLayout from '@/components/layout/MainLayout/MainLayout';
import Hero from '@/components/home/Hero/Hero';
import MovieSection from '@/components/home/MovieSection/MovieSection';

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <MovieSection title="Now Playing" variant="now-playing" />
      <MovieSection title="Coming Soon..." variant="coming-soon" />
    </MainLayout>
  );
}