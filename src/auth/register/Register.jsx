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

export default function Register() {
    let navigate = useNavigate()
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    var username = "";

    // Sleep Function
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    // Handle Register Button
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ login }, { password });
        registerRequest();
    };

    //  Registration Process
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

    // Successfully Registered and Redirect
    const logginPage = () => {
        navigate('/');
        window.location.reload();
    };

    // Alert Message
    const renderError = () => {
        if (error !== "") {
            return (
                <div className="register-alert">
                    <Alert severity="error">Enregistrement échouée — {error}</Alert>
                </div>
            );
        }
    };

    const renderSuccess = () => {
        if (success !== "") {
            return (
                <div className="register-alert">
                    <Alert severity="success">Enregistrement réussie</Alert>
                </div>
            );
        }
    };

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