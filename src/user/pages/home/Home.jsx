import "./home.css";
import React from "react";
import siegeImage from "../../asset/image/siege.png";
import auditImage from "../../asset/image/audit.png";

export default function Home() {
  document.title = "SafeNet - Accueil";

  return (
    <div className="home">
      <div className="home-container">
        <h1>Qui somme nous ?</h1>
        <p className="home-paragraph">
          SafeNet est une société spécialisée dans la recherche et la protection
          sur le web.
          <br /> Nous développons différentes solutions digitales pour nos
          clients et nous leur fournissons une protection optimale.
          <br />
          <br /> De nos jours vos données sont revendues à prix d'or et elles sont
          ensuite exploitées par des entreprises pour différentes utilisations.
          <br /> Chez SafeNet nous savons que vous ne souhaitez pas voir vos
          données exploitées à des fins malveillantes.
          <br /> Pour nous la sécurité de vos informations est essentielle.
          <br />
          <br /> Dans l’optique de sensibiliser sur les dangers du web nous vous
          mettons à disposition notre quiz sur la cybersécurité.
          <br />
          Répondez correctement à au moins 6 questions sur les 10 et vous
          obtiendrez votre certificat SafeNet Formation Sécurité.
          <br />
          <br /> Le siège social est situé au 30 Av de la République, 94800
          Villejuif.
          <br /> Notre capital Social est de 1 122 000,00€ et notre chiffre
          d’affaires pour l’année 2021 est de 5 398 500,00€
          <br /> Nous avons pour objectif d’être les numéros 1 sur le marché
          d’ici 2025.
        </p>
        <span className="home-span">
          <img src={auditImage} className="home-audit" alt="Conseil" />
          <img src={siegeImage} className="home-siege" alt="Siege Social" />
        </span>
      </div>
    </div>
  );
}
