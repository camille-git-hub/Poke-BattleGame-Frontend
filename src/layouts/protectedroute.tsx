import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';

function ProtectedRoute({}) {

  return (
    <div className="">
      <header className="">
        <Navbar />
      </header>
      <main className="p-4 max-w-4xl mx-auto mb-40">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ProtectedRoute;

