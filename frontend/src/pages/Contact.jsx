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
              <input
                type="text"
                placeholder="Entrez votre message"
                className="message"
              />
            </div>
            <button type="submit" className="btn-contact">
              Envoyer
            </button>
<div className="adresse">
            <p>
              Nous retrouver:<br></br> 4 rue Baron, 44000 Nantes
            </p>
            </div>
            <div className="reseaux-sociaux">
            <p>Nos réseaux :</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
