import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AuthForm from "./components/Auth/AuthForm"
import Welcome from "./pages/Welcome/Welcome";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
