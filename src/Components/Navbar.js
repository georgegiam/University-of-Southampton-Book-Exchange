import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  

import CreateListing from '../Books/CreateListing';
import LoginForm from '../Components/Login';
import RegisterForm from '../Components/Register'
import Confirmation from '../Components/Confirmation'
import ForgotPass from '../Components/ForgotPass'
import MyBooks from '../Components/MyBooks'
import BookDetails from '../Components/BookDetails'

import firebase from '../FirebaseUtility/firebaseSetup'; 

// react icons
import { FaBook, FaCalendar, FaPlus, FaBell, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Nav = (props) => {
    
    const [isUserLoggedIn, setStatus] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("NavBar: userlogged in");
                setStatus(
                    <div className="dropdown">
                    <button className="btn btn-info btn-sm dropdown-toggle">{user.email}</button>
                    <div className="dropdown-content">
                        <a className="dropdown-item" href="#">< FaBell/>&nbsp; Notifications</a>
                        <Link className="dropdown-item" to="/addbook"><FaPlus/>&nbsp; Add Book</Link>
                        <Link className="dropdown-item" to="/myBooks"><FaBook/>&nbsp; My Books</Link>
                        <a className="dropdown-item" href="#"><FaCalendar/>&nbsp; My Calendar</a>
                        <a className="dropdown-item text-danger" onClick={signOutHandler} href="http://localhost:3000/login"><FaSignOutAlt/>&nbsp; Signout</a>
                    </div>
                </div> 
                );
            } else {
                console.log("NavBar: userlogged NOT in");
                setStatus(
                    <Link to="/login" href="#" className="text-decoration-none">Login</Link>
                );
            }
          });

    }, []);

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
                {isUserLoggedIn}
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
            {/* route to confirmation */}
            <Route path="/confirmation">
                <Confirmation/>
            </Route>
            {/* route to Forgot password */}
            <Route path="/forgot">
                <ForgotPass/>
            </Route>
            {/* route to my Books password */}
            <Route path="/myBooks">
                <h2>My Books</h2> <hr/>
                <MyBooks/>
            </Route>
            {/* route to Book Details password */}
            <Route path="/details">
                <BookDetails/>
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