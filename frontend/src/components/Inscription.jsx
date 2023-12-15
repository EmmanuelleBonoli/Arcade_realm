import React, { useState } from "react";

export default function Inscription({ onClose }) {
  return (
    <>
      <div className="container-inscription" onClick={onClose}>
        <div className="inscription-form">
          <div className="header-container">
            <h1>Inscription</h1>
            <img
              src="/images/Login/GhostLogin.png"
              alt="GhostLogin"
              className="GhostLogin"
            />
          </div>
          <div className="login-container">
            <p>Choisissez votre pseudo</p>
            <input type="text" className="pseudo" />

            <p>Choisissez votre mot de passe</p>
            <input type="text" className="motdepasse" />

            <button type="submit" className="btn-inscription">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
