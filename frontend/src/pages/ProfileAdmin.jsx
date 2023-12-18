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
        <div className="displayChoice" />
      </div>
    </div>
  );
}

export default ProfileAdmin;
