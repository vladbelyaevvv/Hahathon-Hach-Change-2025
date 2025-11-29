import { Outlet } from 'react-router-dom';
import Header from './Header';
import type { User } from '../api/types';

interface LayoutProps {
  user: User;
  onLogout: () => void;
}

function Layout({ user, onLogout }: LayoutProps) {
  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <Outlet />
    </div>
  );
}

export default Layout;

