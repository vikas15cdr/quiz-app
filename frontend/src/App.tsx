// src/App.tsx
import { Outlet } from 'react-router-dom';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <Header />

      {/* Dynamic Content (Changes based on route) */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
}

export default App;