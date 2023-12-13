function PresentationEvents() {
  return (
    <div className="presentationEvents">
      <div className="descEvents">
        <div className="textEvents">
          <h2>Nos évènements</h2>
          <p>
            Affûtez vos compétences, car chaque mois,
            <span style={{ fontWeight: "bold" }}> Arcade Realm</span> organise
            des tournois épiques mettant en vedette les jeux les plus
            emblématiques de chaque décennie.
          </p>
          <p>
            Des trophées rétro, des récompenses exclusives et une ambiance
            compétitive palpitante vous attendent.
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>
              Que le meilleur joueur gagne !
            </span>
          </p>
        </div>
        <div className="imgEvents">
          <img
            src="./images/Presentation_evenement/p_evenement_1.png"
            alt="borne d'arcade"
          />
          <img
            src="./images/Presentation_evenement/p_evenement_2.png"
            alt="borne d'arcade"
          />
        </div>
      </div>
      <img
        className="bannerEvents"
        src="./images/Presentation_evenement/p_evenement_3.jpg"
        alt="foule humaine"
      />
    </div>
  );
}

export default PresentationEvents;
