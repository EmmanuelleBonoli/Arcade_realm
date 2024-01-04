import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import GameContext from "../contexts/GameContext";

function Home() {
  const navigate = useNavigate();
  const { openGames, setOpenGames } = useContext(GameContext);

  function handleGamePlay() {
    setOpenGames(!openGames);
    navigate("/gamesonline");
  }

  return (
    <div className="HomePage">
      <div className="Carouselle">
        <div className="Int-carouselle">
          <Carousel
            className="npm-Carouselle"
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop
            autoPlay
            interval={2000}
          >
            <div className="Carouselle-1">
              <img
                src="/images/affiche_accueil.png"
                className="acc-affiche-1"
                alt=""
              />
              <div className="text-evenements">
                <h1>NOS ÉVÉNEMENTS À VENIR</h1>
                <p>
                  De nombreux lots à gagner !<br />
                  Nous contacter pour toute inscription ou renseignements.
                </p>
              </div>
              <img
                src="/images/affiche_accueil.png"
                className="acc-affiche-2"
                alt=""
              />
            </div>
            <div className="Carouselle-2">
              <div className="text-classement">
                <h1>PODIUM DES JOUEURS</h1>
                <p>
                  Retrouver le top 3 de nos meilleurs joueurs de la semaine !
                </p>
              </div>
              <img src="/images/podium.png" alt="podium" />
            </div>
            <div className="Carouselle-3">
              <div className="bloc-mario">
                <img src="/images/mario.png" className="mario" alt="mario" />
              </div>
              <div className="text-contact">
                <h1>CONTACTEZ - NOUS</h1>
                <p>
                  Une idée d'amélioration, de nouveaux jeux à proposer, un
                  commentaire négatif sur notre personnel super gentil ?
                  Partagez vos avis dans notre espace de contact.
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <div className="presentation">
        <div className="titre-texte">
          <h1>Présentation de la salle d’Arcade</h1>
          <p>
            Découvrez nos espaces GAMER. Vous trouverez un bar, un espace
            restauration, et bien sûr une salle dédiée à 100% pour le
            rétro-gaming, conçue pour des passionné(e)s par des passionné(e)s.
          </p>
        </div>
        <div className="metal-texte">
          <img src="/images/metal-slug.png" alt="metal-slug" />
          <p>
            <Link to="/presentationarcaderealm">
              <span>Découvrir-ici</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="cards">
        <div
          onClick={handleGamePlay}
          role="presentation"
          className="cards-1 card-global"
        >
          <p className="texte-cards">JEUX DU MOMENT</p>
          <img src="/images/jeux_accueil.png" alt="jeux-accueil" />
        </div>
        <Link to="/classementetlots">
          <div className="cards-2 card-global">
            <p className="texte-cards">CLASSEMENT ET LOT</p>
            <div className="Image-lot">
              <img src="/images/Coupe.png" alt="coupe" />
              <img src="/images/SuperNes3.png" alt="supernes" />
            </div>
          </div>
        </Link>
        <Link to="/evenements">
          <div className="cards-3 card-global">
            <p className="texte-cards">ÉVÈNEMENTS</p>
            <img src="/images/affiche_accueil.png" alt="evenements" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
