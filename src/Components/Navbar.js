import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import CreateListing from '../Books/CreateListing';
import LoginForm from '../Components/Login';
import RegisterForm from '../Components/Register'

import firebase from '../FirebaseUtility/firebaseSetup'; 

const Nav = (props) => {


    function signOutHandler() {
        firebase.auth().signOut().then(() => {
                // Sign-out successful.
              }).catch((error) => {
                // An error happened.
              });
        }

    return (
        <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">University of Southampton Book Exchange</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">               
                    <li className="nav-item">
                        <Link to="/addbook">Add Book</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/">Books</Link>
                    </li>
                </ul> 
                <button href="#" className="text-decoration-none" onClick={signOutHandler}>Logout</button>        
                <Link to="/login" href="#" className="text-decoration-none">Login</Link>                              
            </div>
        </nav>
        <Switch>
            <Route path="/login">
              <LoginForm/>
            </Route>
            <Route path="/addbook">
              <CreateListing/>
            </Route>
            <Route path="/register">
                <RegisterForm/>
            </Route>
            <Route path="/">
                {props.index}
            </Route>
      </Switch>
        </Router>

    )
}

export default Nav