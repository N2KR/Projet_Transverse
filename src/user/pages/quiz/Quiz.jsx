import "./quiz.css";
import React, { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import db from "../../../firebase/firebase";
import Alert from "@material-ui/lab/Alert";
// import quiz from "../../asset/JsonData/question.json";

export default function Quiz() {
  document.title = "SafeNet - Quiz";
  const [Q1, setQ1] = useState("oui");
  const [Q2, setQ2] = useState("oui");
  const [Q3, setQ3] = useState("oui");
  const [Q4, setQ4] = useState("oui");
  const [Q5, setQ5] = useState("oui");
  const [Q6, setQ6] = useState("oui");
  const [Q7, setQ7] = useState("oui");
  const [Q8, setQ8] = useState("oui");
  const [Q9, setQ9] = useState("oui");
  const [Q10, setQ10] = useState("oui");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const uid = localStorage.getItem("uid");
  const total = localStorage.getItem("resultats");
  const results = doc(db, "users", uid);

  useEffect(() => {
    Fetchdata();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const renderSuccess = () => {
    if (success !== "") {
      return (
        <div className="register-alert">
          <Alert severity="success">
            Quiz Réussi ! Merci de patienter quelques instants.
          </Alert>
        </div>
      );
    }
  };

  const renderError = () => {
    if (error !== "") {
      return (
        <div className="register-alert">
          <Alert severity="error">
            Quiz échoué.. Vous pouvez réessayer !— {error}
          </Alert>
        </div>
      );
    }
  };

  const Fetchdata = async () => {
    const docSnap = await getDoc(results);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.resultat !== undefined) {
        window.localStorage.setItem("resultats", data.resultat);
      } else {
        window.localStorage.setItem("resultats", "");
      }
    } else {
      console.log("No such document!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(Q1, Q2);
    result();
  };

  const renderQuiz = () => {
    if (total === "") {
      return (
        <div className="quiz-container">
          <div className="quiz-title">SafeNet CyberSecurity Quiz</div>
          <form onSubmit={handleSubmit}>
            <div className="quiz-question">
              <label className="quiz-description">
                1 - Vous recevez un spam dans votre boîte mail, vous bloquer
                l’expéditeur puis vous le supprimer ?
                <select
                  className="quiz-select"
                  value={Q1}
                  onChange={(e) => setQ1(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <div className="quiz-question">
              <label className="quiz-description">
                2 - Vous venez de recevoir un SMS sur votre smartphone vous
                indiquant que votre colis n’a pas pu être livré et celui-ci vous
                demande de payer des frais d'expédition.
                <br />
                Or vous n’avez rien commandé, décidez vous de payer malgré tout
                ?
                <select
                  className="quiz-select"
                  value={Q2}
                  onChange={(e) => setQ2(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <div className="quiz-question">
              <label className="quiz-description">
                3 - Sur Instagram une célébrité vous proposes de vous offrir le
                dernier iPhone, mais pour cela il vous demande de cliquer sur un
                lien. Bloquez-vous son profil ?
                <select
                  className="quiz-select"
                  value={Q3}
                  onChange={(e) => setQ3(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <div className="quiz-question">
              <label className="quiz-description">
                4 - Un site attire votre regard sur un site internet que vous ne
                connaissez pas, cliquez-vous dessus ?
                <select
                  className="quiz-select"
                  value={Q4}
                  onChange={(e) => setQ4(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <div className="quiz-question">
              <label className="quiz-description">
                5 - Vous êtes sur un site que vous ne connaissez pas,
                acceptez-vous les cookies ?
                <select
                  className="quiz-select"
                  value={Q5}
                  onChange={(e) => setQ5(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <div className="quiz-question">
              <label className="quiz-description">
                6 - Vous êtes dans une gare, un réseau public est disponible
                vous y connectez-vous ?
                <select
                  className="quiz-select"
                  value={Q6}
                  onChange={(e) => setQ6(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <div className="quiz-question">
              <label className="quiz-description">
                7 - Un site web vous demande d’enregistrer votre carte bleue
                pour vous y connecter, acceptez-vous de le faire ?
                <select
                  className="quiz-select"
                  value={Q7}
                  onChange={(e) => setQ7(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <div className="quiz-question">
              <label className="quiz-description">
                8 - Un bon mot de passe doit contenir au moins 8 caractères de
                types différents (majuscule, minuscule, chiffre, caractères
                spéciaux...)
                <select
                  className="quiz-select"
                  value={Q8}
                  onChange={(e) => setQ8(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <div className="quiz-question">
              <label className="quiz-description">
                9 - Un site web au protocole « HTTP » et non pas « HTTPS » vous
                demande de saisir des informations personnelles, les
                saisissez-vous ?
                <select
                  className="quiz-select"
                  value={Q9}
                  onChange={(e) => setQ9(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <div className="quiz-question">
              <label className="quiz-description">
                10 - Le phishing est-il un type de piratage ?
                <select
                  className="quiz-select"
                  value={Q10}
                  onChange={(e) => setQ10(e.target.value)}
                >
                  <option value="oui">OUI</option>
                  <option value="non">NON</option>
                </select>
              </label>
            </div>
            <center>
              <input
                type="submit"
                className="quiz-button"
                value="Valider"
              ></input>
            </center>
          </form>
        </div>
      );
    }
  };

  console.log("a =", total);

  const renderResult = () => {
    if (total !== "") {
      return (
        <div className="quiz-result">
          Félicitation vous avez réussi, vous avez eu {total}/10 !
          <br/>
          <a className="quiz-diplome" href='/Diplome.png' download>Click ici pour télécharger ton diplome</a>
        </div>
      );
    }
  };

  const result = async () => {
    let nb = 0;
    if (Q1 === "oui") {
      nb += 1;
    }
    if (Q2 === "non") {
      nb += 1;
    }
    if (Q3 === "oui") {
      nb += 1;
    }
    if (Q4 === "non") {
      nb += 1;
    }
    if (Q5 === "non") {
      nb += 1;
    }
    if (Q6 === "non") {
      nb += 1;
    }
    if (Q7 === "non") {
      nb += 1;
    }
    if (Q8 === "oui") {
      nb += 1;
    }
    if (Q9 === "non") {
      nb += 1;
    }
    if (Q10 === "oui") {
      nb += 1;
    }
    if (nb >= 6) {
      await updateDoc(results, {
        resultat: nb,
      });
      setSuccess("Success");
      await sleep(10000);
      setSuccess("");
      window.location.reload();
      await sleep(3000);
      window.location.reload();
    } else {
      setError("Error");
      await sleep(3000);
      setError("");
    }
  };

  return (
    <div className="quiz">
      {renderSuccess()}
      {renderError()}
      {renderQuiz()}
      {renderResult()}
    </div>
  );
}
