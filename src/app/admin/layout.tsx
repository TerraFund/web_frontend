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
      <div className="pt-16 flex min-h-[calc(100vh-4rem)] relative w-full overflow-hidden">
        {/* On desktop, Sidebar occupies flex space. On mobile, it's fixed. */}
        <Sidebar />
        <main className="flex-1 w-full min-w-0 overflow-y-auto">
          <div className="min-h-full sm:px-2 md:px-6 lg:px-8">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}