import React, { useState } from 'react';
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { LockOpen } from '@material-ui/icons';
import db from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Logo from '../../asset/logo.png';
import Alert from '@material-ui/lab/Alert';

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    let navigate = useNavigate()

    // Sleep Function
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    // Handle Login Button
    const handleSubmit = (event) => {
        event.preventDefault();
        loginRequest();
    }

    //  Authentification Process
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

    // Successfully Logged and Redirect
    const loggedStateGoogle = () => {
        window.localStorage.setItem('logged', 'true');
        window.localStorage.setItem('email', auth.currentUser.email);
        window.localStorage.setItem('uid', auth.currentUser.uid);
        window.localStorage.setItem('name', auth.currentUser.displayName);
        navigate('/redirect');
        window.location.reload();
    };

    const loggedStateFirebase = () => {
        window.localStorage.setItem('logged', 'true');
        window.localStorage.setItem('email', auth.currentUser.email);
        window.localStorage.setItem('uid', auth.currentUser.uid);
        window.localStorage.setItem('name', login.toString().split('@')[0]);
        navigate('/redirect');
        window.location.reload();
    };

    // Alert Message
    const renderError = () => {
        if (error !== "") {
            return (
                <div className="login-alert">
                    <Alert severity="error">Connexion échouée — {error}</Alert>
                </div>
            );
        }
    };

    const renderSuccess = () => {
        if (success !== "") {
            return (
                <div className="login-alert">
                    <Alert severity="success">Connexion réussie</Alert>
                </div>
            );
        }
    };

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