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
import MyNotifications from '../Components/myNotifications'
import MyPurchases from '../Components/myPurchases'
import DatePicker from '../Components/datePicker'
import BookReview from '../Components/BookReview'
import EditBook from '../Components/EditBook'

import firebase from '../FirebaseUtility/firebaseSetup'; 
import * as Firebase from "../FirebaseUtility/readFromDatabase";

// react icons
import { FaSignOutAlt } from 'react-icons/fa';

const Nav = (props) => {
    
    const [isUserLoggedIn, setStatus] = useState(null);
    const [badge, setNum] = useState(0);

    useEffect(async() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                var userInfo = await Firebase.readUsersBadges(user.uid);
                console.log("NavBar: userlogged in");
                setStatus(
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto"> 
                            <li class="nav-item">
                                <Link className="nav-link" to="/myNotifications">Notifications &nbsp;<span className="badge badge-danger">{userInfo}</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/addbook">Add Book</Link>
                            </li>    
                            <li class="nav-item">
                                <Link className="nav-link" to="/myBooks">My Books</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/myPurchases">My Purchases</Link>
                            </li>
                        </ul>

                        <div className="dropdown float-right">
                            <button className="btn btn-info btn-sm dropdown-toggle">{user.email}</button>
                                <div className="dropdown-content">
                                <a className="dropdown-item text-danger" onClick={signOutHandler} href="https://southampton-book-exchange.web.app/login"><FaSignOutAlt/>&nbsp; Signout</a>
                            </div>
                        </div> 
                        
                    </div>
                );
            } else {
                console.log("NavBar: userlogged NOT in");
                setStatus(
                    // <Link to="/login" href="#" className="btn btn-outline-primary btn-sm float-right">Login/Signup</Link>
                    <div className="float-right w-100">
                        <Link to="/login" href="#" className="btn btn-outline-primary btn-sm float-right">Login/Signup</Link>
                    </div>
                );
            }
          });

    }, []);

    function homeHandler() {
        //alert("Home Pressed");
        setTimeout(function () {
            window.location.reload(false);
        }, 500);

    }

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
            <Link className="navbar-brand" to="/" onClick={homeHandler}>
            <img src="images/logo.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                Southampton Book Exchange</Link>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

            

            <div className="collapse navbar-collapse" id="navbarSupportedContent">                
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
                <div className="container" id="myBooks">
                    <h2>My Books</h2> <hr/>
                    <MyBooks/>
                </div>
                
            </Route>
            {/* route to Book Details password */}
            <Route path="/details">
                <BookDetails/>
            </Route>
            {/* route to Notifcations password */}
            <Route path="/myNotifications">
                <MyNotifications/>
            </Route>
            {/* route to Purchase Details password */}
            <Route path="/myPurchases">
                <MyPurchases/>
            </Route>
            {/* route to Date Picker */}
            <Route path="/datePicker">
                <DatePicker/>
            </Route>
            {/* route to book review */}
            <Route path="/review">
                <BookReview/>
            </Route>
            {/* route to book review */}
            <Route path="/editBook">
                <EditBook/>
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
