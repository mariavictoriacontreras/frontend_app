import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import AuthForm from "./components/AuthForm/authform.js"; // nuestro login/register
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import UserAdoptionList from './components/AdoptionRequest/UserAdoptionList.js'
import RefugeAdoptionList from './components/AdoptionRequest/RefugeAdoptionList.js'
import LandingPage from "./pages/LandingPage.js";
import './styles/theme.scss';
import AdoptionList from "./components/Adoption/adoptionlist";
import PetForm from "./pages/PetForm";
import AdoptionRequest from "./components/AdoptionRequest/AdoptionRequest.jsx";
import AdoptionRequestDetail from "./components/AdoptionRequest/AdoptionRequestDetail.jsx";

export default function App() {
  return (
    <Router>

    <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<AuthForm activeTab="login" />} />
        <Route path="/register" element={<AuthForm activeTab="register" />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
        <Route path="/pets" element={<AdoptionList />} />
        <Route path="/pets/new" element={<PetForm />} />
        <Route path="/pets/edit/:idPet" element={<PetForm />} />
        <Route path="/adopt/:id" element={<AdoptionRequest />} />
        <Route path="/my-requests" element={<UserAdoptionList />} />
        <Route path="/refuge/requests" element={<RefugeAdoptionList />} />
          <Route path="/solicitudes/:id" element={<AdoptionRequestDetail />} />
      </Routes>

      <Footer />

    </Router>

  );
}
