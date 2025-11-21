import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background_light dark:bg-background_dark">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}