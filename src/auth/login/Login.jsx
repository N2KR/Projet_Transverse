import React, { useState } from 'react';//Pour pouvoir avoir des variables d'états
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';//package de react pour créer des routes entres différentes pages (pour changer de page)
import { auth } from '../../firebase/firebase';//firebase
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";// firebase accès
import { LockOpen } from '@material-ui/icons';//icon du cadenna 
import db from "../../firebase/firebase";// firebase
import { doc, getDoc, setDoc } from "firebase/firestore";// import firebase la BDD
import Logo from '../../asset/logo.png';//on attribut à logo notre image
import Alert from '@material-ui/lab/Alert';//personnalisation des alerts

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    let navigate = useNavigate()

    // Pour pouvoir appliquer des transitions 
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    // boutton de connexion
    const handleSubmit = (event) => {
        event.preventDefault();
        loginRequest();
    }

    //  Processus de connexion
    const loginRequest = async () => {
        try {
            const userInfo = await signInWithEmailAndPassword(
                auth,
                login,
                password);
            console.log(userInfo);
            setSuccess("Success");
            await sleep(3000);
            setSuccess("");
            loggedStateFirebase();
        } catch (err) {
            var msg = err.toString().split('(')[1];
            setError('(' + msg);
            await sleep(3000);
            setError("");
        }
    }
    //On ajoute si utilisateur google, à la base de donnée (firebase) de manière asynchrone car on récupère les données de google avant de pouvoir continuer
    //le role 1 veut dire que la personne est bien enregistrer
    const provider = new GoogleAuthProvider()
    const addGoogleUserToBdd = async () => {
        let uid = auth.currentUser.uid;
        const GoogleUserRef = doc(db, "users", uid);
        const GoogleUserData = await getDoc(GoogleUserRef);
        if (GoogleUserData.data() != null) {
            setSuccess("Success");
            await sleep(3000);
            setSuccess("");
        } else {
            await setDoc(GoogleUserRef, {
                role: "1",
                name: auth.currentUser.displayName,
                mail: auth.currentUser.email,
            });
        }
    };

    //Lorsque l'on ce connecte avec google on vérifie qu'il n'y est pas d'erreur
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then(async (result) => {
            await addGoogleUserToBdd();
            loggedStateGoogle();
        }).catch(async (error) => {
            setError("1");
            await sleep(3000);
            setError("");
        })
    };

    // Lorsque le connexion c'est bien faite, on initialise nos variable d'utilisateur qui seront disponible sur toutes les pages
    const loggedStateGoogle = () => {
        window.localStorage.setItem('logged', 'true');
        window.localStorage.setItem('email', auth.currentUser.email);
        window.localStorage.setItem('uid', auth.currentUser.uid);
        window.localStorage.setItem('name', auth.currentUser.displayName);
        //et on change de page pour ne pas rester sur la page de connexion
        navigate('/redirect');
        window.location.reload();
    };

    //Si on c'est connecter avec firebase meme processus que google
    const loggedStateFirebase = () => {
        window.localStorage.setItem('logged', 'true');
        window.localStorage.setItem('email', auth.currentUser.email);
        window.localStorage.setItem('uid', auth.currentUser.uid);
        window.localStorage.setItem('name', login.toString().split('@')[0]);
        navigate('/redirect');
        window.location.reload();
    };

    // C'est une alerte JS, si la connexion a mal été faite alors on envoi un méssage d'alerte
    const renderError = () => {
        if (error !== "") {
            return (
                <div className="login-alert">
                    <Alert severity="error">Connexion échouée — {error}</Alert>
                </div>
            );
        }
    };
    //Meme chose si la connexion est un success
    const renderSuccess = () => {
        if (success !== "") {
            return (
                <div className="login-alert">
                    <Alert severity="success">Connexion réussie</Alert>
                </div>
            );
        }
    };
    //Ce qui est afficher/implementer sur la page de connexion on retrouve toutes les fonctions
    return (
        <div className="login-Container">
            {renderError()}
            {renderSuccess()}
            <div className="login-Contain">
            <span className="login-Title"> <img src={Logo} alt="logo" className="login-logo" />Connexion</span>
                <form onSubmit={handleSubmit}>
                    <center>
                        <div className="login-login">
                            <input type="text" className="login-search" placeholder="Email..." value={login} onChange={(e) => setLogin(e.target.value)}/>
                        </div>
                        <div className="login-password">
                            <input type="password" id="pass" className="password-search" placeholder="Mot de passe..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <input type="submit" className="login-button" value="Connexion" ></input>
                    </center>
                </form>
                <div className="login-google" onClick={signInWithGoogle}>
                    <LockOpen/> Connexion avec Google
                </div>
                <Link to="/register" className="link">
                    <li className="login-registerLink">
                        Enregistrer son compte
                    </li>
                </Link>
            </div>
        </div>
    )
}