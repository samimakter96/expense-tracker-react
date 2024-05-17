import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AuthForm from "./components/Auth/AuthForm"
import Welcome from "./pages/Welcome"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<AuthForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
