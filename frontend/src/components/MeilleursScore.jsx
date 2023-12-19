import React from "react";

function MeilleursScore() {
  return (
    <div className="container-MeilleursScore">
      <div className="user-name">
        <img src="/images/Utilisateur/Rectangle 142.png"/>
        <h1>Wild_Gamer</h1>
      </div>
      <div className="liste-jeux-points">
        <div className="nom-jeux">
            <p>Guitar Hero</p>
            <p>Death Sh.</p>
            <p>Pacman</p>
        </div>
        <div className="gl-trait">
            <div className="trait"></div>
        </div>
        <div className="user-point">
            <p>9 542 pts</p>
            <p>6 021 pts</p>
            <p>600pts</p>
        </div>
      </div>
      <div className="total-points">
        <p>Total points : 16163 pts</p>
      </div>
    </div>
  );
}

export default MeilleursScore;
