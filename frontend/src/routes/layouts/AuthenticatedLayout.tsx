import { Outlet } from 'react-router-dom';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/SideBar';
import Footer from '@/components/ui/Footer';

export default function AuthenticatedLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar collapses on mobile */}
      <aside className="w-full md:w-64 bg-white border-r">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
