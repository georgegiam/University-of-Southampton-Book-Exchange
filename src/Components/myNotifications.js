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

    render () {

        var showAccpetedButton = true;
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
            {empty}   
    {this.state.appointments.map((appoint, index) => {

        if(appoint.status === 'accepted' || appoint.status === 'Expired') {
          showAccpetedButton = false;
        } else{
          showAccpetedButton = true;
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
              <a href="#" id={appoint.ID} className="btn btn-danger" onClick={(e) => this.statusHandler(e, "declined", appoint.bookId, index)}>Decline</a>&nbsp;
              <a href="#" id={appoint.ID} className="btn btn-primary" onClick={(e) => this.statusHandler(e, "Sold", appoint.bookId, index)}>Mark as Sold</a>
          </div> 
        
            );
    })
  }
      </div>
    </div>
  }
}

export default withRouter(MyNotifications);