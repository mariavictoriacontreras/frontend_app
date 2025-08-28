import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import './styles/theme.scss';

export default function App() {
  return (
    <Router>

    <Navbar />

      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
      </Routes>

      <Footer />

    </Router>

  );
}
