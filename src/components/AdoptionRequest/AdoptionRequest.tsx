import { useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createAdoptionRequest } from "../../services/AdoptionRequestService"; 
import "./AdoptionRequest.scss";

interface FormData {
  fullName: string;
  address: string;
  location: string;
  contact: string;
  hasYard: boolean;
  agreesIndoor: boolean;
  willUseLeash: boolean;
  agreesNoWandering: boolean;
  hasOtherPets: boolean;
  otherPetsNeutered: boolean;
  otherPetsAggressive: boolean;
  agreesNeuter: boolean;
  agreesVaccinate: boolean;
  agreesRabies: boolean;
  agreesDeworm: boolean;
  agreesQualityFood: boolean;
  agreesVetCheck: boolean;
  hoursAlone: string;
  walksPerDay: string;
  caretakerDuringTrips: string;
  returnReason: string;
  windowsProtected: boolean;
  agreesFollowup: boolean;
  agreesInterview: boolean;
  householdInfo: string;
  ownsHome: boolean;
  canHavePets: boolean;
}

export default function AdoptionForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    address: "",
    location: "",
    contact: "",
    hasYard: false,
    agreesIndoor: false,
    willUseLeash: false,
    agreesNoWandering: false,
    hasOtherPets: false,
    otherPetsNeutered: false,
    otherPetsAggressive: false,
    agreesNeuter: false,
    agreesVaccinate: false,
    agreesRabies: false,
    agreesDeworm: false,
    agreesQualityFood: false,
    agreesVetCheck: false,
    hoursAlone: "",
    walksPerDay: "",
    caretakerDuringTrips: "",
    returnReason: "",
    windowsProtected: false,
    agreesFollowup: false,
    agreesInterview: false,
    householdInfo: "",
    ownsHome: false,
    canHavePets: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {

      await createAdoptionRequest(Number(id), formData);
      alert("Solicitud enviada con éxito ");
      navigate("/");
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      alert("Hubo un problema al enviar el formulario.");
    }
  };

  return (
    <div className="adoption-form-container">
      <h1>Solicitud de Adopción</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Dirección</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Localidad</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Contacto</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>¿Tiene patio?</label>
          <select name="hasYard" value={String(formData.hasYard)} onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Permite que el animal viva adentro?</label>
          <select
            name="agreesIndoor"
            value={String(formData.agreesIndoor)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Usará correa para pasearlo?</label>
          <select
            name="willUseLeash"
            value={String(formData.willUseLeash)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Evitará que deambule solo?</label>
          <select
            name="agreesNoWandering"
            value={String(formData.agreesNoWandering)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Tiene otras mascotas?</label>
          <select
            name="hasOtherPets"
            value={String(formData.hasOtherPets)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Las otras mascotas están castradas?</label>
          <select
            name="otherPetsNeutered"
            value={String(formData.otherPetsNeutered)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Alguna es agresiva?</label>
          <select
            name="otherPetsAggressive"
            value={String(formData.otherPetsAggressive)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Se compromete a castrar?</label>
          <select
            name="agreesNeuter"
            value={String(formData.agreesNeuter)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Se compromete a vacunar?</label>
          <select
            name="agreesVaccinate"
            value={String(formData.agreesVaccinate)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Desparasitará regularmente?</label>
          <select
            name="agreesDeworm"
            value={String(formData.agreesDeworm)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Las ventanas están protegidas?</label>
          <select
            name="windowsProtected"
            value={String(formData.windowsProtected)}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div>
          <label>¿Cuántas horas estaría solo?</label>
          <input
            type="number"
            name="hoursAlone"
            value={formData.hoursAlone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>¿Cuántos paseos por día?</label>
          <input
            type="number"
            name="walksPerDay"
            value={formData.walksPerDay}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>¿Quién lo cuidará durante tus viajes?</label>
          <input
            type="text"
            name="caretakerDuringTrips"
            value={formData.caretakerDuringTrips}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Motivo por el cual devolvería al animal</label>
          <textarea
            name="returnReason"
            value={formData.returnReason}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div>
          <label>Información sobre tu hogar</label>
          <textarea
            name="householdInfo"
            value={formData.householdInfo}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <button type="submit" className="btn-submit">
          Enviar solicitud
        </button>
      </form>
    </div>
  );
}
