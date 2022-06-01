import "./contact.css";
import React from "react";
import contact_items from "../../asset/JsonData/contact.json";
import Male from "../../asset/image/male.png";
import Female from "../../asset/image/female.png";
//Ici on va gerer la page de contact avec les utilisateur stocker dans la page JSON ici c'est nous l'équipe 
const ContactItem = (props) => {
  return (
    <div className="contact_items">
      <div className="contact-user">
        <div className="contact-center">
          {props.gender === "male" && (
            <img src={Male} className="contact-profile" alt="man png" />
          )}
          {props.gender === "female" && (
            <img src={Female} className="contact-profile" alt="woman png" />
          )}
        </div>
        <div className="contact-name">{props.title}</div>
        <div className="contact-description">{props.description}</div>
      </div>
    </div>
  );
};
//On va donc afficher tout le contenu de la page et avec le css on gère le style comme d'habitude
export default function Contact() {
  document.title = "SafeNet - Contact";

  return (
    <div className="contact">
      <div className="contact-container">
        {contact_items.map((item, index) => (
          <ContactItem
            title={item.display_name}
            description={item.description}
            gender={item.gender}
          />
        ))}
      </div>
      <div className="contact-list">
        <div className="contact-list-container">
          <div className="contact-list-head">
            <div className="contact-title"> Notre adresse </div>
            <div className="contact-subtitle"> Où vous pouvez nous trouver </div>
          </div>
          <span className="contact-span">
            <div className="contact-phone">
              <div className="contact-icon">
                <i className="bx bx-phone"></i>
              </div>
              <div>Appelez-nous</div>
              <div>01 23 45 67 89 (FR)</div>
            </div>
            <div className="contact-mail">
              <div className="contact-icon">
                <i className="bx bx-mail-send"></i>
              </div>
              <div>Adresse électronique</div>
              <div>support@safenet.com</div>
            </div>
            <div className="contact-linkedin">
              <div className="contact-icon">
                <i className="bx bxl-linkedin"></i>
              </div>
              <div>LinkedIn</div>
              <div>Page de l'entreprise</div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
