import { Link, NavLink } from "react-router-dom";

function Contact() {
 
  return (
    <div>
      <div className="container">
        <div className="container-form">
          <div className="form-contact">
            <div className="header-contact">
              <img
                src="./images/Contact/PacmanContact.png"
                alt="logo-contact"
                className="pacman"
              />
              <h1>Contact</h1>
            </div>
            <div className="input-container">
              <p>Nom, Prénom</p>
              <input type="text" placeholder="" className="name" />
              <p>E-mail</p>
              <input type="text" placeholder="" className="email" />
              <p>Message</p>

              <textarea
                className="message"
                placeholder="Entrez votre message"
              />
              <div className="button-contact">
                <NavLink to="/">
                  <button type="submit" className="btn-contact">
                    Envoyer
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="container-adresse">
              <div className="adresse">
                <Link
                  to="https://www.google.com/maps/place/4+Rue+Baron,+44000+Nantes/data=!4m2!3m1!1s0x4805eeb04e035b03:0xfe166fb643fd3846?sa=X&ved=2ahUKEwi4wozOz4-DAxVDVqQEHTGkDJIQ8gF6BAgREAA"
                  target="_blank"
                >
                  <img
                    src="./images/Contact/map.png"
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
