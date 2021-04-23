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
import { FaBook, FaCalendar, FaPlus, FaBell, FaSignOutAlt, FaMoneyBill } from 'react-icons/fa';

const Nav = (props) => {
    
    const [isUserLoggedIn, setStatus] = useState(null);
    const [badge, setNum] = useState(0);

    useEffect(async() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                var userInfo = await Firebase.readUsersBadges(user.uid);
                console.log("NavBar: userlogged in");
                setStatus(
                    <div className="dropdown">
                        <button className="btn btn-info btn-sm dropdown-toggle"><span className="badge badge-danger">{userInfo}</span>&nbsp;{user.email}</button>
                    <div className="dropdown-content">
                        <Link className="dropdown-item" to="/myNotifications">< FaBell/>&nbsp; Notifications &nbsp;<span className="badge badge-danger">{userInfo}</span></Link>
                        <Link className="dropdown-item" to="/addbook"><FaPlus/>&nbsp; Add Book</Link>
                        <Link className="dropdown-item" to="/myBooks"><FaBook/>&nbsp; My Books</Link>
                        <Link className="dropdown-item" to="/myPurchases">< FaMoneyBill/>&nbsp; My Purchases</Link>
                        <a className="dropdown-item text-danger" onClick={signOutHandler} href="https://southampton-book-exchange.web.app/login"><FaSignOutAlt/>&nbsp; Signout</a>
                    </div>
                </div> 
                );
            } else {
                console.log("NavBar: userlogged NOT in");
                setStatus(
                    <Link to="/login" href="#" className="btn btn-outline-primary btn-sm">Login/Signup</Link>
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
            <Link id="nav_header" className="navbar-brand" to="/" onClick={homeHandler}>
            <img src="images/logo.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                University of Southampton Book Exchange</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <div className="dropdown">
                    <span className="navbar-toggler-icon"></span>
                    <div className="dropdown-content">
                        <a id="accepted" className="dropdown-item">Accepted</a>
                        <a id="pending" className="dropdown-item" >Pending</a>
                        <a id="Sold" className="dropdown-item" >Sold</a>
                        <a id="All" className="dropdown-item" >All</a>
                    </div>
                </div> 
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