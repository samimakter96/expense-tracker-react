import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import Welcome from './pages/Welcome/Welcome';
import Profile from './pages/Profile/Profile';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { useSelector } from 'react-redux';


function App() {
 const darkMode = useSelector((state) => state.theme.darkMode);

 useEffect(() => {
   if (darkMode) {
     document.body.classList.add('bg-dark', 'text-light');
   } else {
     document.body.classList.remove('bg-dark', 'text-light');
   }
 }, [darkMode]);


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
