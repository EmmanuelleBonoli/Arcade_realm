function PresentationSpaces() {
  return (
    <div className="spaces">
      <div className="descSpaces">
        <h2>Nos espaces</h2>
        <p>
          Notre salle d'arcade rétro gaming est un véritable paradis pour les
          amateurs de jeux classiques.
        </p>
        <p>
          Avec une sélection soigneusement choisie de machines d'arcade
          emblématiques, nous vous offrons l'opportunité de redécouvrir les
          titres qui ont marqué l'histoire du jeu vidéo.
        </p>
        <p>
          Que vous soyez un fan inconditionnel des jeux de plateforme des années
          80, des combats de rue des années 90, ou des jeux de tir à la première
          personne des débuts des années 2000,
          <span style={{ fontWeight: "bold" }}> Arcade Realm</span> a tout ce
          qu'il vous faut.
        </p>
        <p>
          Retrouvez notre espace restauration avec menus
          <span style={{ fontWeight: "bold" }}> Rétro Gourmand</span> et
          <span style={{ fontWeight: "bold" }}>
            {` boissons rafraîchissantes.`}
          </span>
        </p>
      </div>
      <div className="imgSpaces">
        <img
          src="/images/Presentation_espaces/espace_2.jpg"
          alt="bornes d'arcade"
        />
        <img
          src="/images/Presentation_espaces/espace_1.jpg"
          alt="bornes d'arcade"
        />

        <img
          src="/images/Presentation_espaces/Espace3Bar.jpeg"
          alt="bar Arcade Realm"
        />
        <img
          src="/images/Presentation_espaces/Espace4NourriturePokemon.jpg"
          alt="Exemple nourriture proposé"
        />
      </div>
    </div>
  );
}
export default PresentationSpaces;
