import "./redirect.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import db from "../../firebase/firebase";
import Logo from '../../asset/logo.png';

//Lorsque l'on doit changer de page, on a une transition 
export default function Redirect() {
  let navigate = useNavigate();
  const uid = localStorage.getItem("uid");
  const role = doc(db, "users", uid);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  //la fonction useEffect fait en sorte que lorsque l'on va sur une page, elle se lance
  useEffect(() => {
    Fetchdata();
    // eslint-disable-next-line
  }, []);
  //fonction qui va faire une requete à la base de données, pour connaitre le role de l'utilsateur(active que a chaque chargement de la page redirecte)
  const Fetchdata = async () => {
    const docSnap = await getDoc(role);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.role !== undefined) {
        await sleep(3000)
        window.localStorage.setItem("role", data.role);
        navigate("/home");
        window.location.reload();
      } else {
        window.localStorage.setItem("role", "");
      }
    } else {
      console.log("No such document!");
    }
  };
  //se qui va appraitre à l'ecran lors de la redirection 
  return (
    <div>
      <div className="loading">
      <span className="loading-Logo">
        <img src={Logo} alt="loading-Logo" className="loading-Avatar" />
        <span className="loading-Title"> SafeNet</span>
        </span>
        <div className="loading-container">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}
