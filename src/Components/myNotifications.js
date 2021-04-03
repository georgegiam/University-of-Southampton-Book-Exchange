import React, {Component}  from 'react';
import '../App.css'

import firebase from "../FirebaseUtility/firebaseSetup";
import * as Firebase from "../FirebaseUtility/readFromDatabase";
import * as FirebaseNotfi from "../FirebaseUtility/notification";

class MyNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            currentUserID: "",
            test: ''
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


    statusHandler = async (event, status) => {
        event.preventDefault();
        console.log(this.state);
        FirebaseNotfi.setStatus(this.state.currentUserID, event.target.id, status);
        await this.getData();
    }

    render () {

        console.log("My appointments: ", this.state.appointments);

    return this.state.appointments.map((appoint, index) => {
        return (
            <div className="card2" key={index}>
            <h5 className="card-header">Book Name: {appoint.bookName}</h5>
            <div className="card-body">
              <h5 className="card-title">Buyer Email: {appoint.buyerEmail}</h5>
              <p className="card-text">Status: {appoint.status}</p>
              <p className="card-text">Date: {appoint.date}  Time: {appoint.time}</p>
              <a href="#" id={appoint.ID} className="btn btn-primary" onClick={(e) => this.statusHandler(e, "accepted")}>Accept</a>
              <a href="#" id={appoint.ID} className="btn btn-primary" onClick={(e) => this.statusHandler(e, "declined")}>Decline</a>
              <a href="#" id={appoint.ID} className="btn btn-primary" onClick={(e) => this.statusHandler(e, "Sold")}>Mark as Sold</a>
            </div>
          </div> 
            );
    });
}
}

export default MyNotifications;