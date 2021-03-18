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

  render() {
    let cardBooks = null;

    if (this.state.books) {
      cardBooks = (
        <div>
          <h5 className="text-muted">Featured Books</h5> <hr />
          <div className="card-deck m-5">
            <Landpage 
            books={this.state.books}></Landpage>
          </div>
        </div>
      );
    }

    console.log("Books: ", this.state.books);

    return (
      <div>
        <Nav />
        {cardBooks}
        {/* <CreateListing/> */}
      </div>
    );
  }
}

export default App;
