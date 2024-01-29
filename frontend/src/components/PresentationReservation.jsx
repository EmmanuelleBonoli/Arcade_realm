function PresentationReservation() {
  return (
    <div className="presentationReservation">
      <div className="descReservation">
        <h2>Réservations de Groupe</h2>
        <p>
          Plongez dans l'univers du rétro gaming en réservant votre expérience
          exclusive chez
          <span style={{ fontWeight: "bold" }}> Arcade Realm</span>, où chaque
          réunion devient une aventure inoubliable ! Que ce soit pour une soirée
          entre amis, un anniversaire mémorable, une sortie d'entreprise ou
          simplement pour s'immerger dans la nostalgie du passé, nos
          réservations vous garantissent un accès privilégié à notre salle
          d'arcade rétro gaming.
        </p>
        <p>
          Forfaits Personnalisés, soirées d'Entreprise Ludiques, événements
          Sociaux et Associatifs.
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>
            Venez créer des moments rétro inoubliables avec nous !
          </span>
        </p>
      </div>
      <div className="container-banner">
        <img
          className="bannerReservation"
          src="/images/Presentation_reservation/reservation_1.jpg"
          alt="meeting"
        />
      </div>
    </div>
  );
}

export default PresentationReservation;
