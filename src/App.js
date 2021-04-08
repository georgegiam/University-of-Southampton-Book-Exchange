import React, { Component } from "react";

import "./App.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Landpage from "./Components/LandingPage";
import Nav from "./Components/Navbar";

import * as Firebase from "./FirebaseUtility/readFromDatabase";
import { Typeahead } from 'react-bootstrap-typeahead';
// import Autocomplete from "./Autocomplete";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    books: [],
    bookAutoComplete: [],
    searchQuery: [],
  };

  getBooks = async () => {
    const fetchData = async () => {
      let newBooks = [];
      let newAuto = [];
      const response = await Firebase.readAllCollection("Books", newBooks);
      this.setState({ books: response });
      for(var i = 0; i < response.length; i++) {
          newAuto.push(response[i].bookName);
      }
      this.setState({ bookAutoComplete: newAuto });
    };
    fetchData();
  }

  componentDidMount() {
    console.log("Calling Did mount");
    this.getBooks()
  }

  searchHandler =(event) => {
    if(this.state.searchQuery.length > 0) {
      const fetchData = async () => {
        console.log(event);
        const response = await Firebase.searchBookByTitle(this.state.searchQuery[0]);
        this.setState({ books: response });
      };
      fetchData();
    } else {
      alert('No match found, please use the autocomplete suggestions for their names');
    }

  }

  clearHandler = (event) => {
    console.log('Clear: ', this.state);
    this.setState({searchQuery: []});
    this.getBooks();
  }

  changeHandler = (event) => {
    if(event) {
      this.setState({searchQuery: event});
    }

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
          <div className="input-group">
            <Typeahead
              id="example"
              onChange={this.changeHandler}
              options={this.state.bookAutoComplete}
              placeholder="Search by book title"
              selected={this.state.searchQuery}>
          </Typeahead>
              <div className="input-group-append">
              <button className="btn btn-outline-primary" type="button" onClick={this.searchHandler}>Search</button>
              <button className="btn btn-outline-primary" type="button" onClick={this.clearHandler}>Clear</button>
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
