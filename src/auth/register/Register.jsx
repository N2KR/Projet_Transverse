import "./register.css"
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from '../../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import db from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import Logo from '../../asset/logo.png';
import Alert from '@material-ui/lab/Alert';
//Donc lorsque l'utilisateur s'enregistre sur le site non allons initialiser les valeures
export default function Register() {
    let navigate = useNavigate()
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    var username = "";

    // fonction pour temps de transition
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    // Pour gérer l'action du boutton register
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ login }, { password });
        registerRequest();//on envoie la requete d'incription
    };

    //  Processus d'enregistrement toujours asynchrone car on a besoin d'ecrire dans la base de données l'ajout d'un utilisateur
    const registerRequest = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                login,
                password);
            console.log(user);
            setSuccess("Success");
            await sleep(3000);
            setSuccess("");
            const newUserRef = doc(db, "users", auth.currentUser.uid);
            if (login.includes('@')) {
                username = login.toString().split('@')[0];
            } else {
                username = login;
            }
            await setDoc(newUserRef, {
                role: "1",
                name: username,
                mail: login,
            });
            logginPage();
        } catch (err) {
            var msg = err.toString().split('(')[1];
            setError('(' + msg);
            await sleep(3000);
            setError("");
        }
    };

    // Lorsque l'on est enregistrer l'utilisateur est directement rediriger vers la page d'accueil (login)
    const logginPage = () => {
        navigate('/');
        window.location.reload();
    };

    // Message d'alerte personnalisé
    const renderError = () => {
        if (error !== "") {
            return (
                <div className="register-alert">
                    <Alert severity="error">Enregistrement échouée — {error}</Alert>
                </div>
            );
        }
    };
    // Message d'alerte personnalisé
    const renderSuccess = () => {
        if (success !== "") {
            return (
                <div className="register-alert">
                    <Alert severity="success">Enregistrement réussie</Alert>
                </div>
            );
        }
    };
    //Ce que la page d'enregistrement afficher
    return (
        <div className="register-Container">
            {renderError()}
            {renderSuccess()}
            <div className="register-Contain">
                <span className="register-Title"> <img src={Logo} alt="logo" className="register-logo" />Enregistrement</span>
                <form onSubmit={handleSubmit}>
                    <center>
                        <div className="register">
                            <input type="email" className="register-search" placeholder="Email..." value={login} onChange={(e) => setLogin(e.target.value)} />
                        </div>
                        <div className="pswd">
                            <input type="password" id="pass" className="register-search" placeholder="Mot de passe..." value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <input type="submit" className="register-button" value="Enregistrer"></input>
                    </center>
                </form>
                <Link to="/" className="link">
                    <li className="register-loginLink">
                        <ArrowBack/> Connexion
                    </li>
                </Link>
            </div>
        </div>
    )
}