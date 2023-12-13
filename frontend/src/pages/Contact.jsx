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
              <button type="submit" className="btn-contact">
                Envoyer
              </button>
            </div>

            <div className="container-adresse">
              <div className="adresse">
                <img src="./images/Contact/map.png" alt="map" className="map" />
                <p>
                  <strong>Nous retrouver:</strong>
                  <br></br>4 rue Baron,<br></br> 44000 Nantes
                </p>
              </div>
              <div className="reseaux-sociaux">
                <p>
                  <strong>Nos réseaux :</strong>
                </p>
                <img
                  src="/images/Contact/facebook.png"
                  alt="facebook"
                  className="facebook"
                />
                <img
                  src="/images/Contact/instagram.png"
                  alt="instagram"
                  className="instagram"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
