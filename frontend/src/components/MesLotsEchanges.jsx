function MesLotsEchanges() {
  return (
    <div className="container-mle">
      <div className="pseudo-joueur">
        <img src="images/Utilisateur/Rectangle 144.png" alt="medaille vector" />
        <h1>Wild_Gamer</h1>
      </div>
      <div className="mes-lots">
        <div className="t-1">
          <div className="premier-prix">
            <p className="titre-prix">1er prix</p>
            <p className="nom-item">Nintendo Nes</p>
          </div>
          <div className="img-prix">
            <img src="images/SuperNes3.png" alt="nintendo-nes" />
          </div>
        </div>
        <div className="t-2">
          <div className="deuxieme-prix">
            <p className="titre-prix">2ème prix</p>
            <p className="nom-item">Mug Space Invaders</p>
          </div>
          <div className="img-prix">
            <img src="images/Utilisateur/InvadersMug.png" alt="invaders-mug" />
          </div>
        </div>
      </div>
      <div className="bouton-echangerlot">
        <img src="images/Utilisateur/Rectangle 139.png" alt="echange-bouton" />
        <p>Échanger un lot</p>
      </div>
    </div>
  );
}

export default MesLotsEchanges;
