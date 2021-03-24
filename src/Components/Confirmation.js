import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import firebase from "../FirebaseUtility/firebaseSetup";


const Confirmation = () => {

    const history = useHistory();

    useEffect(() => {
        if(firebase.auth().isSignInWithEmailLink(window.location.href)) {
            var email = window.localStorage.getItem('emailForSignIn');
            var pass = window.localStorage.getItem('passForSignIn');
            // TODO: if the above is empty that means they are opening it from another device - re-ask them again
    
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    // User is signed in here
                    //history.push("/");
                    window.localStorage.removeItem('emailForSignIn');
                    window.localStorage.removeItem('passForSignIn');
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log("Error with create account: ", errorMessage);
                    alert(errorMessage);
            });
        }
        else {
            console.log('Page was not loaded from link!!');
            history.push("/");
        }
    }, []);

    return (
        <div>
             <div class="jumbotron text-center">
            <h1 class="display-3">Thank you for signing up for University of Southampton Book Exchange</h1>
            <p class="lead">You can now login and sell your own books!</p>
            <hr/>
            <p class="lead">
                <a class="btn btn-primary btn-sm" href="http://localhost:3000/" role="button">Continue to homepage</a>
            </p>
            </div>
        </div>
    )

}

export default Confirmation;