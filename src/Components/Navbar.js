import React from 'react'
<<<<<<< HEAD
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import CreateListing from '../Books/CreateListing'

const Nav = (props) => {


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
                    <li>
                        <Link to="/">Books</Link>
                    </li>
                </ul> 
                <Link href="#" className="text-decoration-none">Login</Link>                              
            </div>
        </nav>
        <Switch>
            <Route path="/addbook">
              <CreateListing/>
            </Route>
            <Route path="/">
                {props.index}
            </Route>
      </Switch>
        </Router>

=======

function Nav(){
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">University of Southampton Book Exchange</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">               
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li> 
                </ul> 
                <a href="#" class="text-decoration-none">Login</a>                              
            </div>
        </nav>
>>>>>>> login
    )
}

export default Nav