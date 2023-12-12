import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 3,
  },
};


function Home() {
  return (
    <div className="HomePage">
      <div className="Carouselle">
        <div className="Int-carouselle">
          <Carousel className="npm-Carouselle"
          showThumbs={false}
          showStatus={false}
          >
            <div className="Carouselle-1">
              <img src="Images/affiche_accueil.png" className="acc-affiche-1" />
              <div className="text-evenements">
                <h1>NOS ÉVÉNEMENTS À VENIR</h1>
                <p>
                  De nombreux lots à gagner !<br />
                  Nous contacter pour toute inscription ou
                  <br /> renseignements.
                </p>
              </div>
              <img src="Images/affiche_accueil.png" className="acc-affiche-2" />
            </div>
            <div className="Carouselle-2">
              <div className="text-classement">
                <h1>PODIUM DES JOUEURS</h1>
                <p>
                  Retrouver le top 3 de nos meilleurs joueurs de la semaine !
                </p>
              </div>
              <img src="Images/affiche_accueil.png"/>
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
          <img src="/Images/metal-slug.png" alt="metal-slug" />
          <p>
            <Link to={"/presentationarcaderealm"}>
              <span>Découvrir-ici</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="cards">
        <div className="cards-1 card-global">
          <p className="texte-cards">JEUX DU MOMENT</p>
          <img src="Images/Jeux.png" />
        </div>
        <Link to={"/classementetlots"}>
          <div className="cards-2 card-global">
            <p className="texte-cards">CLASSEMENT ET LOT</p>
            <img src="Images/Coupe.png" />
            <img src="Images/SuperNes3.png" />
          </div>
        </Link>
        <Link to={"/evenements"}>
          <div className="cards-3 card-global">
            <p className="texte-cards">ÉVÈNEMENTS</p>
            <img src="Images/affiche_accueil.png" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
