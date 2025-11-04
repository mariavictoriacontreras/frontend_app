import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import AuthForm from "./components/AuthForm/authform.js"; // nuestro login/register
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import './styles/theme.scss';
import AdoptionList from "./components/Adoption/adoptionlist";
import PetForm from "./pages/PetForm";

export default function App() {
  return (
    <Router>

    <Navbar />

      <Routes>
        <Route path="/login" element={<AuthForm activeTab="login" />} />
        <Route path="/register" element={<AuthForm activeTab="register" />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
        <Route path="/pets" element={<AdoptionList />} />
        <Route path="/pets/new" element={<PetForm />} />
        <Route path="/pets/edit/:idPet" element={<PetForm />} />
      </Routes>

      <Footer />

    </Router>

  );
}
