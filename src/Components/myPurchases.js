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
            currentUserID: "",
        };
    }

    async componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              var uid = user.uid;
              const fetchData = async () => {
                const response = await Firebase.readUsersPurchases(uid);
                this.setState({ purchases: response[0] });
                this.setState({ currentExchange: response[1] });
                this.setState({ currentUserID: uid})
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

      filterHandler = async (event) => {
        var response = null;
        var matchedPurchases = [];
        if(event.target.id === "All") {
          response = await Firebase.readUsersPurchases(this.state.currentUserID);
          this.setState({ purchases: response[0] });
          this.setState({ currentExchange: response[1] });
        } else {
          response = await Firebase.readUsersPurchasesByStatus(this.state.currentUserID, event.target.id);
          var purchase = response[0];
          var exchange = response[1];
          for(var i = 0; i < purchase.length; i++) {
              var id = purchase[i].tracking;
              let obj = exchange.find(o => o.ID === id);
              if(obj) {
                  matchedPurchases.push(purchase[i]);
              }
  
          }
          this.setState({ purchases: matchedPurchases });
          this.setState({ currentExchange: response[1] });
        }

      }
      

    render () {

        var empty = null;
        
        console.log("My purchases: ", this.state.purchases);
        console.log("My Exchanges: ", this.state.currentExchange);
        if(this.state.purchases.length == 0) {
            empty = <div className="alert alert-primary text-center" role="alert">
            No purchases made
          </div>
        }

    return <div className="container" id="purchases">
        <div className="container-fluid">
        <div className="container-fluid d-flex justify-content-between p-0">
            <h2>My purchases</h2><hr/>
            <div className="dropdown">
                    <button className="btn btn-secondary btn-sm dropdown-toggle">Filter by</button>
                    <div className="dropdown-content">
                        <a id="accepted" className="dropdown-item" onClick={this.filterHandler}>Accepted</a>
                        <a id="pending" className="dropdown-item" onClick={this.filterHandler}>Pending</a>
                        <a id="Sold" className="dropdown-item" onClick={this.filterHandler}>Sold</a>
                        <a id="All" className="dropdown-item" onClick={this.filterHandler}>All</a>
                    </div>
                </div> 
              </div>
            
            
        <ul className="list-group">
            {empty}
             {this.state.purchases.map((bookItem, index) => {
        if(this.state.currentExchange.length > 0 && this.state.purchases.length === this.state.currentExchange.length) {
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
