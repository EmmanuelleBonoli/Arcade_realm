function Contact() {
  return (
    <div>
      <div className="container">
      <div className="container-form">
        <div className="form-contact">
          <div className="header-contact">
            <img src="./images/Contact/PacmanContact.png" alt="logo-contact" className="pacman" />
          <h1>Contact</h1>
          </div>
          <div className="input-container">
          <p>Nom, Prénom</p>
          <input type="text" placeholder="" />
          <p>E-mail</p>
          <input type="text" placeholder="" />
          <p>Message</p>
          <input type="text" placeholder="" />
          </div>
          <button type="submit" className="btn-contact">
            Envoyer
          </button>
          <p>Nous retrouver:<br></br> 4 rue Baron,
          44000 Nantes</p>

          <p>Nos réseaux :</p>

        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;
