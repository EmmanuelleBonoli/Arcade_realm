import PresentationSpaces from "../components/PresentationSpaces";
import PresentationDisplayGames from "../components/PresentationDisplayGames";
import PresentationCrew from "../components/PresentationCrew";
import PresentationReservation from "../components/PresentationReservation";
import PresentationEvents from "../components/PresentationEvents";

function Presentation() {
  return (
    <div className="presentation">
      <PresentationSpaces />
      <PresentationDisplayGames />
      <PresentationCrew />
      <PresentationEvents />
      <PresentationReservation />
    </div>
  );
}

export default Presentation;
