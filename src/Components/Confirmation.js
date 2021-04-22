import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import firebase from "../FirebaseUtility/firebaseSetup";


const Confirmation = () => {

    const history = useHistory();

    useEffect(() => {
        if(firebase.auth().isSignInWithEmailLink(window.location.href)) {
            var email = window.localStorage.getItem('emailForSignIn');
            var pass = window.localStorage.getItem('passForSignIn');
            var firstName = window.localStorage.getItem('firstNameForSignIn');
            var lastName = window.localStorage.getItem('lastNameForSignIn');
    
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then(function(user) {
                    user.user.updateProfile({
                        displayName: firstName + " " + lastName
                      });
                    window.localStorage.removeItem('emailForSignIn');
                    window.localStorage.removeItem('passForSignIn');
                    window.localStorage.removeItem('firstNameForSignIn');
                    window.localStorage.removeItem('lastNameForSignIn');
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
             <div className="jumbotron text-center">
            <h1 className="display-3">Thank you for signing up for University of Southampton Book Exchange</h1>
            <p className="lead">You can now login and sell your own books!</p>
            <hr/>
            <p className="lead">
                <a className="btn btn-primary btn-sm" href="https://southampton-book-exchange.web.app/" role="button">Continue to homepage</a>
            </p>
            </div>
        </div>
    )

}

export default Confirmation;