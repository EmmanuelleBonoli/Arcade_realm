function MesLotsEchanges() {
  return (
    <div className="container-mle">
      <div className="pseudo-joueur">
        <h1>Wild_Gamer</h1>
      </div>
      <div className="mes-lots">
        <div className="1er-prix">
          <p>1er prix</p>
          <p>Guitar Hero</p>
        </div>
        <div className="2eme-prix">
          <p>2ème prix</p>
          <p>Mug Space Invanders</p>
        </div>
      </div>
      <div className="bouton-echangerlot">
        <button type="button">Échanger un lot</button>
      </div>
    </div>
  );
}

export default MesLotsEchanges;
