import DonneesPerso from "../components/DonneesPerso"

function ProfileAdmin() {
    return (
      <div className="profileAdmin">
        <div className="adminLayout">
          <div className="buttonsChoice">
            <button type="button" className="">
              Données Personnelles
            </button>
           
            <button type="button" className="">
              Gestion des services
            </button>
            <button type="button" className="">
              Gestion des profils
            </button>
          </div>
          <div className="displayChoice">
          <DonneesPerso />
          </div>
        </div>
      </div>
    );
  }
  export default ProfileAdmin;