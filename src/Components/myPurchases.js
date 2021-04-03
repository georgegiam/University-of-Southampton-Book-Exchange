import React, {Component}  from 'react';
import '../App.css'

import firebase from "../FirebaseUtility/firebaseSetup";
import * as Firebase from "../FirebaseUtility/readFromDatabase";

class MyPurchases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: [],
            currentStatus: ""
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              var uid = user.uid;
              const fetchData = async () => {
                const response = await Firebase.readUsersPurchases(uid);
                this.setState({ purchases: response[0] });
                this.setState({ currentStatus: response[1]})
              };
              fetchData();
            }
          });
      }

    render () {

        console.log("My purchases: ", this.state.purchases);

    return <div className="list-group"> {this.state.purchases.map((bookItem, index) => {
        console.log('Gonna get status!')
        return (
                <a key={index} href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Book Name: {bookItem.bookName}</h5>
                <small>Purchase date: 3 days ago</small>
                <small>Status: {this.state.currentStatus[index]}</small>
                </div>
                <p className="mb-1">£{bookItem.bookPrice}</p>
                <small>{bookItem.bookDescription}</small>
                </a>
            );
        }) 
    } </div>
    
    }
}

export default MyPurchases;