import React, { Component } from "react";

import "./App.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";


// components
import Landpage from "./Components/LandingPage";
import Nav from "./Components/Navbar";
import CreateListing from './Books/CreateListing'

import * as Firebase from "./FirebaseUtility/readFromDatabase";


class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    books: [],
    searchQuery: '',
  };

  componentDidMount() {
    const fetchData = async () => {
      let newBooks = [];
      const response = await Firebase.readAllCollection("Books", newBooks);
      this.setState({ books: response });
    };
    fetchData();
    console.log("Calling Did mount");
  }

  searchHandler =(event) => {
    const fetchData = async () => {
      const response = await Firebase.searchBookByTitle(this.state.searchQuery);
      this.setState({ books: response });
    };
    fetchData();
  }

  changeHandler = (event) => {
    this.setState({searchQuery: event.target.value});
}

  render() {
    let cardBooks = null;


    if (this.state.books) {
      cardBooks = (

          <div className="container w-50" id="landing">
            
            <div className="container-fluid text-center">
            <img src="images/logo.png" width="130" height="130"/>
            </div>
          
          <h2 className="text-center">University of Southampton Book Exchange</h2><br/>

          <div className="container-fluid text-center w-50">
          <div class="input-group">
              <input type="text" class="form-control" placeholder="Search a book..." id="search" onChange={this.changeHandler}/>
              <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" onClick={this.searchHandler}>Search</button>
              </div>
              <div id="match-list"></div>
            </div>
          </div><br/>

          <h5 className="text-muted">Featured Books</h5>
              
        <hr />
            <Landpage 
                books={this.state.books}>
            </Landpage>
        </div>
      );
    }

    console.log("Books: ", this.state.books);

    return (
      <div>
        <Nav 
        index={cardBooks}/>
        {/* {cardBooks} */}
      </div>

    );
  }
}

export default App;
