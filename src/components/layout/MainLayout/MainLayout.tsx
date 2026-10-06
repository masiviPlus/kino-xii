import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-layout__content">{children}</main>
      <Footer />
    </div>
  );
}