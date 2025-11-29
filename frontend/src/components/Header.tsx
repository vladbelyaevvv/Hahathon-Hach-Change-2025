import { useNavigate } from 'react-router-dom';
import type { User } from '../api/types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

function Header({ user, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-logo" onClick={() => navigate('/courses')}>
          Учебная платформа
        </h1>
        <div className="header-user">
          <span className="user-name">{user.fullName}</span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

