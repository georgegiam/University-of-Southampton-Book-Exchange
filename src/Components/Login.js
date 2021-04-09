import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'

import firebase from "../FirebaseUtility/firebaseSetup";

// react icons
import { FaFacebook, FaGoogle } from 'react-icons/fa';

import { useHistory } from 'react-router-dom';

const LoginForm = () => {

    const history = useHistory();

    let email = "";
    let pass = "";

    function emailHandler(event) {
        email = event.target.value;
    }

    function passHandler(event) {
        pass = event.target.value;
    }

    function googleHandler(type) {
        var provider = null;

        if(type === "google") {
            provider = new firebase.auth.GoogleAuthProvider();
        } else if (type === "facebook") {
            provider = new firebase.auth.FacebookAuthProvider();
        }

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                console.log("User: ", result.user);
                history.push("/");
            }).catch((error) => {
                console.log("Error: " + error.message);
            });
    }

    function registerHandler() {
        history.push("/register");
    }
    
    function submitHandler(event) {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    history.push("/");
                })
                .catch((error) => {
                    alert("Failed: " + error.message);
                });

        }

    return (
        <div className="container" id="login">   
            <h3>Login to your account</h3><br />
            <form onSubmit={submitHandler}>           
            {/* Email */}
            <div className="form-group">             
                <input type="email" className="form-control" id="inputAddress" name="email" onChange={emailHandler} placeholder="Email" required />                
            </div>      
            {/* Password */}
            <div className="form-group">             
                <input type="password" className="form-control" id="inputPassword" name="pass" onChange={passHandler} placeholder="Password" required />                
            </div>                      
            {/* Login Button */}
            <button type='submit' className="btn btn-primary w-100">Sign in</button>

            </form><br/>

            <div className="container-fluid text-center">
                {/* does nothing yet */}
                <a href="http://localhost:3000/forgot"><small>I forgot my password</small></a><br/><br/>

                <small>Sign in with:</small><br/>

                <a href="#" id="social">
                    <FaGoogle onClick={() => googleHandler("google")}/>
                </a>
            </div><br/>
            
            <small className="d-flex justify-content-center">Not a member yet?&nbsp;<a href="#" onClick={registerHandler}>Create an account</a></small>  
        </div>    
    )
}

export default LoginForm;