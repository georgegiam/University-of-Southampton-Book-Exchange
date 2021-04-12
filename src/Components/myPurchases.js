import React, {Component}  from 'react';
import '../App.css'
import { withRouter } from 'react-router-dom';

import firebase from "../FirebaseUtility/firebaseSetup";
import * as Firebase from "../FirebaseUtility/readFromDatabase";

class MyPurchases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: [],
            currentExchange: [],
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              var uid = user.uid;
              const fetchData = async () => {
                const response = await Firebase.readUsersPurchases(uid);
                this.setState({ purchases: response[0] });
                this.setState({ currentExchange: response[1] });
              };
              fetchData();
            }
          });
      }

    reviewHandler = (exchange, purchase) => {
        const {history} = this.props; 
        history.push({
            pathname: '/review',
            state: {exchangeDetails: exchange,
            purchaseDetails: purchase}
        })
      }
      

    render () {

        console.log("My purchases: ", this.state.purchases);
        console.log("My Exchanges: ", this.state.currentExchange);

    return <div className="container" id="purchases">
        <div className="container-fluid">
            <h2>My purchases</h2><hr/>
        <ul className="list-group"> {this.state.purchases.map((bookItem, index) => {
        if(this.state.currentExchange.length > 0) {
            return (
                <li key={index} href="#" className="list-group-item list-group-item-info flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{bookItem.bookName}</h5>
                        <small><span className="badge badge-warning">{this.state.currentExchange[index].status}</span> </small>
                    </div>
                    <p className="mb-1">£{bookItem.bookPrice}</p>
                    <div className="d-flex w-100 justify-content-between">
                        <small>Exchange Date and Time: {this.state.currentExchange[index].date} {this.state.currentExchange[index].time}</small>
                    </div>
                    <small>Exchange Location: {this.state.currentExchange[index].location}</small>
                    <br></br>
                    <button className="btn btn-success" onClick={() => this.reviewHandler(this.state.currentExchange[index], this.state.purchases[index])} disabled={this.state.currentExchange[index].status != "Sold"}>Leave a Review</button>&nbsp;
                </li>
            );
        } 

        }) 
    } </ul>
        </div>
        
    </div> 
    
    }
}

export default withRouter(MyPurchases);
