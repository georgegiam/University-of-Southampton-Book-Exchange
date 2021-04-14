import React, {Component}  from 'react';
import '../App.css'
import { withRouter } from 'react-router-dom';

import firebase from "../FirebaseUtility/firebaseSetup";
import * as Firebase from "../FirebaseUtility/readFromDatabase";
import * as FirebaseNotfi from "../FirebaseUtility/notification";

class MyNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            currentUserID: "",
        };
    }

    componentDidMount() {
        this.getData();
      }

      getData = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              var uid = user.uid;
              const fetchData = async () => {
                const response = await Firebase.readUsersAppointments(uid);
                this.setState({ appointments: response });
                this.setState({ currentUserID: uid})
              };
              fetchData();
            }
          });
      }

      showModal = (event, appoint, index) => {
        var todaysDate = new Date().getTime() / 1000;
        var expiredDate = appoint.purchaseDate.seconds + 172800;
        if(expiredDate >= todaysDate) {
          const {history} = this.props; 
          history.push({
              pathname: '/datePicker',
              state: {appointment: appoint,
              currentUserID: this.state.currentUserID}
          })
        } else {
          alert("48 hours exipired. The book will be made avaiable again and this notification will be deleted");
          this.statusHandler(event, "Expired", appoint.bookId, index);
        }
      }
      
      statusHandler = async (event, status, bookId, index) => {
          event.preventDefault();
          console.log(this.state);
          FirebaseNotfi.setStatus(this.state.currentUserID, event.target.id, status, bookId);
          await this.getData();
          var newAppoint = this.state.appointments;
          newAppoint[index].status = status;
          this.setState({
            appointments: newAppoint
        });
    }

    filterHandler = async (event) => {
      var response = null;
      if(event.target.id === "All") {
        response = await Firebase.readUsersAppointments(this.state.currentUserID);
      } else {
        response = await Firebase.readUsersAppointmentsByStatus(this.state.currentUserID, event.target.id);
      }
      this.setState({ appointments: response });
    }

    render () {
        var empty = null; 
        console.log("My appointments: ", this.state.appointments);

        if(this.state.appointments.length == 0) {
          empty = <div class="alert alert-primary text-center" role="alert">
          No notifications
        </div>
      }

    return <div className="container" id="notifications">
            <div className="container-fluid">
            <h2>My notifications</h2><hr/> 
            <div class="dropdown">
              <button class="dropbtn">Filter</button>
              <div class="dropdown-content">
                <a id="accepted" href="#" onClick={this.filterHandler}>Accepted</a>
                <a id="pending" href="#" onClick={this.filterHandler} >Pending</a>
                <a id="Sold" href="#" onClick={this.filterHandler}>Sold</a>
                <a id="All" href="#" onClick={this.filterHandler}>All</a>
              </div>
            </div>
            {empty}   
    {this.state.appointments.map((appoint, index) => {
        var showAccpetedButton = true;
        var showSoldButton = false;
        var showDeclineButton = true;

        if(appoint.status === 'accepted' || appoint.status === 'Expired') {
          showAccpetedButton = false;
          showSoldButton = true;
          showDeclineButton = false;
        } else{
          showAccpetedButton = true;
        }

        if(appoint.status === 'Sold') {
          showAccpetedButton = false;
          showSoldButton = false;
          showDeclineButton = false;
        }


        return (
            <div className="list-group-item list-group-item-warning" key={index}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mt-0">{appoint.bookName}</h5>
                <p className="card-text"><span className="badge badge-info">{appoint.status}</span> </p>
              </div>
                  
              <h5 className="card-title">Buyer Email: {appoint.buyerEmail} Buyer Name: {appoint.buyerName}</h5>
                
              <p className="card-text">Date: {appoint.date}  Time: {appoint.time}</p>
              <p className="card-text">Location: {appoint.location}</p>
              <p className="card-text">Rating: {appoint.review.stars} stars  {appoint.review.reviewText}</p>
              <button id={appoint.ID} className="btn btn-success" onClick={(e) => this.showModal(e, appoint, index)} disabled={!showAccpetedButton}>Accept</button>&nbsp;
              <button id={appoint.ID} className="btn btn-danger" onClick={(e) => this.statusHandler(e, "declined", appoint.bookId, index)}disabled={!showDeclineButton}>Decline</button>&nbsp;
              <button id={appoint.ID} className="btn btn-primary" onClick={(e) => this.statusHandler(e, "Sold", appoint.bookId, index)} disabled={!showSoldButton}>Mark as Sold</button>
          </div> 
        
            );
    })
  }
      </div>
    </div>
  }
}

export default withRouter(MyNotifications);