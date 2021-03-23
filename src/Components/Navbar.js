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
            <Link className="navbar-brand" to="/">University of Southampton Book Exchange</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">               
                    {/* any other link goes here */}
                </ul> 
                <div class="dropdown">
                    <button class="btn btn-secondary btn-sm dropdown-toggle">user@soton.ac.uk</button>
                    <div class="dropdown-content">
                        <a class="dropdown-item" href="#">Notifications <span class="badge badge-danger">9</span></a>
                        <Link class="dropdown-item" to="/addbook">Add Book</Link>
                        <Link class="dropdown-item" to="#">My Books</Link>
                        <a class="dropdown-item" href="#">My Calendar</a>
                        <a class="dropdown-item text-danger" onClick={signOutHandler} href="#">Logout</a>
                    </div>
                </div>   
                {/* <Link to="/login" href="#" className="text-decoration-none">Login</Link> */}
            </div>
        </nav>
        <Switch>
            {/* route to login */}
            <Route path="/login">
              <LoginForm/>
            </Route>
            {/* route to addbook */}
            <Route path="/addbook">
              <CreateListing/>
            </Route>
            {/* route to register */}
            <Route path="/register">
                <RegisterForm/>
            </Route>
             {/* route to index */}
            <Route path="/">
                {props.index}
            </Route>
      </Switch>
        </Router>

    )
}

export default Nav