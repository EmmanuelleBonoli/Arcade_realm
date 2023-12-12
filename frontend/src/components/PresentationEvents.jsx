function PresentationEvents() {
  return (
    <div className="presentationEvents">
      <div className="descEvents">
        <div className="textEvents">
          <h2>Nos évènements</h2>
          <p>
            Affûtez vos compétences, car chaque mois, Arcade Realm organise des
            tournois épiques mettant en vedette les jeux les plus emblématiques
            de chaque décennie.
          </p>
          <p>
            Des trophées rétro, des récompenses exclusives et une ambiance
            compétitive palpitante vous attendent.
          </p>
          <p>Que le meilleur joueur gagne !</p>
        </div>
        <div className="imgEvents">
          <img
            src="./public/images/Presentation_evenement/p_evenement_1.jpg"
            alt=""
          />
          <img
            src="./public/images/Presentation_evenement/p_evenement_2.jpg"
            alt=""
          />
        </div>
      </div>
      <img
        className="bannerEvents"
        src="./public/images/Presentation_evenement/p_evenement_3.jpg"
        alt=""
      />
    </div>
  );
}

export default PresentationEvents;
