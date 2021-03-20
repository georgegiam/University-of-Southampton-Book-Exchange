import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'

import firebase from "../FirebaseUtility/firebaseSetup";

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
            <input type='submit' className="btn btn-primary w-100" value="Login"/>
            <button type="submit" className="btn btn-primary w-100" onClick={() => googleHandler("google")}>Sign in with Google</button>
            <button type="submit" className="btn btn-primary w-100" onClick={() => googleHandler("facebook")} disabled>Sign in with Facebook</button>
            </form> <br />
            
            <small className="d-flex justify-content-center">Not a member yet? <a href="#">Create an account</a></small>  
        </div>    
    )
}

export default LoginForm;