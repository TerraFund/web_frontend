import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}