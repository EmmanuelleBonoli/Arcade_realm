import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ContactModale from "../components/ContactModale";

function Contact() {
  const navigate = useNavigate();
  const [formModal, setFormModal] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "email" && !value.includes("@")) {
      setEmailError("Format d'e-mail non valide");
    } else {
      setEmailError("");
    }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const openFormModal = (event) => {
    event.preventDefault();

    setFormModal(true);

    // setTimeout(() => {
    //   setFormModal(false);
    //   navigate("/");
    // }, 3500);
  };

  return (
    <div>
      <div className="container">
        <div className="container-form">
          <div className="form-contact">
            <div className="header-contact">
              <img
                src="/images/Contact/PacmanContact.png"
                alt="logo-contact"
                className="pacman"
              />
              <h1>Contact</h1>
            </div>
            <form onSubmit={openFormModal} className="input-container">
              <p>Nom, Prénom</p>
              <input
                type="text"
                id="nom"
                required
                className="name"
                onChange={handleChange}
                value={formData.nom}
              />
              <p>E-mail</p>
              <input
                type="text"
                id="email"
                required
                className="email"
                onChange={handleChange}
                value={formData.email}
              />
              {emailError && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    fontStyle: "italic",
                  }}
                >
                  {emailError}
                </p>
              )}
              <p>Message</p>
              <textarea
                className="message"
                id="message"
                required
                placeholder="Entrez votre message"
                onChange={handleChange}
                value={formData.message}
              />
              <div className="button-contact">
                <button
                  type="submit"
                  className="btn-contact"
                  disabled={
                    !formData.nom || !formData.email || !formData.message
                  }
                >
                  Envoyer
                </button>
              </div>
              {formModal && <ContactModale setFormModal={setFormModal} />}
            </form>

            <div className="container-adresse">
              <div className="adresse">
                <Link
                  to="https://www.google.com/maps/place/4+Rue+Baron,+44000+Nantes/data=!4m2!3m1!1s0x4805eeb04e035b03:0xfe166fb643fd3846?sa=X&ved=2ahUKEwi4wozOz4-DAxVDVqQEHTGkDJIQ8gF6BAgREAA"
                  target="_blank"
                >
                  <img
                    src="/images/Contact/map.png"
                    alt="map"
                    className="map"
                  />
                </Link>

                <p>
                  <strong>Nous retrouver:</strong>
                  <br />4 rue Baron, 44000 Nantes
                </p>
              </div>
              <div className="reseaux-sociaux">
                <p>
                  <strong>Nos réseaux :</strong>
                </p>
                <div className="img-reseaux">
                  <Link
                    to="https://www.facebook.com/?locale=fr_FR"
                    target="_blank"
                  >
                    <img
                      src="/images/Contact/facebook.png"
                      alt="facebook"
                      className="facebook"
                    />
                  </Link>

                  <Link to="https://www.instagram.com/" target="_blank">
                    <img
                      src="/images/Contact/instagram.png"
                      alt="instagram"
                      className="instagram"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
