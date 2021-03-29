import React, {Component}  from 'react';
import '../App.css'

import firebase from "../FirebaseUtility/firebaseSetup";
import * as Firebase from "../FirebaseUtility/readFromDatabase";

class MyBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookIds: [],
            currentUserID: ""
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              const fetchData = async () => {
                const response = await Firebase.readUsersBooks(uid);
                this.setState({ bookIds: response });
                this.setState({ currentUserID: uid})
                //console.log("REP: ", response);
              };
              fetchData();
            } else {
                //alert("Please Login First!");
                //history.push("/login");
            }
          });
      }

      deleteHandler = (event) => {
        var key = Array.from(this.state.bookIds.keys())[event.target.id]; // get the index as a key postion in the map, so we can find the right element selected to be delete
        var newbooksIds = this.state.bookIds; 
        var bookUrl = newbooksIds.get(key).bookImageUrl
        console.log("Book name: ", bookUrl);

        Firebase.deleteBookByID(key, this.state.currentUserID, bookUrl);
        newbooksIds.delete(key);
        this.setState({bookIds: newbooksIds});
        console.log(this.state.bookIds);
      }
    render () {

        let arrayBooks = [...this.state.bookIds.values()]; // convert it to an array to select we map through and draw them
        console.log("My Books: ", this.state.bookIds);
    return arrayBooks.map((book, index) => {
        return (
            <div className="container" id="myBooks" key={index}>   
                <div className="container-fluid">
                    {/* <h2>My Books</h2> <hr/> */}
                    <ul className="list-unstyled">
                        {/* book 1 */}
                        <li className="media">
                            <img className="mr-3" src={book.bookImageUrl} alt="Generic placeholder image" id="book-image"/>
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{book.bookName}</h5>
                                <small className="text-muted">Posted: {JSON.stringify(book.created.toDate())}</small><br/>
                                    {book.bookDescription} <br/>
                                <a href="#">Edit</a> &nbsp;
                                <a onClick={this.deleteHandler} id={index} className="text-danger">Delete</a>
                            </div>
                        </li><br/>
                    </ul>
                </div>
            </div>    
            );
    });
}
}

export default MyBooks;