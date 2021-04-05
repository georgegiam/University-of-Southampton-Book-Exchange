import React, {PureComponent}  from 'react';
import '../App.css'

import { withRouter } from 'react-router-dom';

import * as Firebase from "../FirebaseUtility/notification";
import firebase from "../FirebaseUtility/firebaseSetup";

class BookDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.location.state.book,
        };
    }

    buyHandler = (event) => {
        // Check to see if the user is logged in, if not re-direct them to the login page here
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if(user.uid === this.state.book.sellerID) {
                    alert('Cant buy your own book!')
                    return;
                } 
                Firebase.addAppointment(this.state.book.ID, this.state.book.isAvailable, this.state.book.bookName, this.state.book.bookDescription, this.state.book.bookPrice, user.uid, user.email ,this.state.book.sellerID, this.state.book.sellerEmail);
                var latestBook = this.state.book;
                latestBook.isAvailable = false;
                this.setState({book: latestBook}); // TODO: What happens when they referesh, we might be better fetching the book here again to get the latest value?
            } else {
                alert("Please Login First!");
                //history.push("/login");
            }
          });
    }

    render () {
        
        console.log("This Book details state:", this.state.book);

    return (
            <div className="container" id="book-details">           
                <div className="row">
                    <div className="col text-center">                 
                        <img className="card-img-top" src={this.state.book.bookImageUrl} id="book-image" />        
                    </div>
                    <div className="col">
                    <h3>{this.state.book.bookName}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">{this.state.book.bookCategory}</h6>
                    <h5 className="card-subtitle mb-2 text-muted">£{this.state.book.bookPrice}</h5>               
                                
                    <hr />
                    
                     <p>{this.state.book.bookDescription}</p> 
                    
                    <button className="btn btn-primary" onClick={this.buyHandler}>Buy</button>
                    </div>
                </div>
            </div>    
        )
    }
}

export default withRouter(BookDetails)