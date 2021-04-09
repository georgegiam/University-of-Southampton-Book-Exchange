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

      showModal = (appoint) => {
        const {history} = this.props; 
        history.push({
            pathname: '/datePicker',
            state: {appointment: appoint,
            currentUserID: this.state.currentUserID}
        })
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
        console.log("My appointments: ", this.state.appointments);

    return this.state.appointments.map((appoint, index) => {

        if(appoint.status === 'accepted') {
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
                  
              <h5 className="card-title">Buyer Email: {appoint.buyerEmail}</h5>
                
              <p className="card-text">Date and Time: {appoint.date} {appoint.time}</p>
              <button id={appoint.ID} className="btn btn-success" onClick={() => this.showModal(appoint)} disabled={!showAccpetedButton}>Accept</button>&nbsp;
              <a href="#" id={appoint.ID} className="btn btn-danger" onClick={(e) => this.statusHandler(e, "declined", appoint.bookId, index)}>Decline</a>&nbsp;
              <a href="#" id={appoint.ID} className="btn btn-primary" onClick={(e) => this.statusHandler(e, "Sold", appoint.bookId, index)}>Mark as Sold</a>
          </div> 
        
            );
    });
}
}

export default withRouter(MyNotifications);