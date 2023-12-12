function Classement() {
  return (
    <div className="parent-container">
      <div className="classement-recompense">
        <div className="classement">
          <h1>Classement de la semaine</h1>
          <img
            className="podium-img"
            src="/Images/Podium/podiumvector.png"
            alt="podium"
          />
        </div>
        <div className="récompenses">
          <h2>Récompenses</h2>
        </div>
      </div>
      <div className="lots">
        <h2>Lots à gagner</h2>
      </div>
    </div>
  );
}

export default Classement;
