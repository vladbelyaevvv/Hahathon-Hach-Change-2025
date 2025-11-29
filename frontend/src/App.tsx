import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import AssignmentPage from './pages/AssignmentPage';
import Layout from './components/Layout';
import type { User } from './api/types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (stored in localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/courses" replace /> : <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route
          path="/"
          element={
            user ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Navigate to="/courses" replace />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CoursePage />} />
          <Route path="assignments/:assignmentId" element={<AssignmentPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


