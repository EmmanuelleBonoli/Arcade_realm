function MesJeuxFavoris() {
  return (
    <div className="container-jfav">
      <div className="pseudo-joueur">
        <img
          src="public/images/Utilisateur/heartFavorite.png"
          alt="favoris-coeur"
        />
        <h1>Wild_Gamer</h1>
      </div>
      <div className="jeux-favoris">
        <p>▶︎ Mortal Kombat</p>
        <p>▶︎ Space Invaders</p>
        <p>▶︎ Metal Slug</p>
        <p>▶︎ Pacman</p>
      </div>
    </div>
  );
}

export default MesJeuxFavoris;
