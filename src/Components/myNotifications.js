import React, {Component}  from 'react';
import '../App.css'
import { withRouter } from 'react-router-dom';

import firebase from "../FirebaseUtility/firebaseSetup";
import * as Firebase from "../FirebaseUtility/readFromDatabase";
import * as FirebaseNotfi from "../FirebaseUtility/notification";
import { FaLocationArrow, FaStopwatch, FaCalendar, FaMailBulk, FaUserAlt, FaMoneyBillWave } from 'react-icons/fa';

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
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        console.log("My appointments: ", this.state.appointments);

        if(this.state.appointments.length == 0) {
          empty = <div class="alert alert-primary text-center" role="alert">
          No notifications
        </div>
      }

    return <div className="container" id="notifications">
            <div className="container-fluid">
              <div className="container-fluid d-flex justify-content-between p-0">
              <h2>My notifications</h2>
            
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
    
            <hr/> 
            
          
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

        if(appoint.status === 'Sold' || appoint.status === 'Reviewed') {
          showAccpetedButton = false;
          showSoldButton = false;
          showDeclineButton = false;
        }

        var calDate = Date.parse(appoint.date)
        var month = new Date(calDate).getMonth();
        var day = new Date(calDate).getDay();


        return (
          <div className="list-group-item list-group-item-warning" key={index}>
          <p className="card-text"><span className="badge badge-info">{appoint.status}</span> </p>
          <div className="container" id="calendar">
          <div className="container-fluid">
              <div class="row row-striped">
                  <div class="col-2 text-center">
                      <h1 class="display-4"><span class="badge badge-secondary">{day}</span></h1>
                      <h2>{months[month]}</h2>
                  </div>
                  <div class="col-10">
                      <h3><strong>{appoint.bookName}</strong></h3>
                      <ul class="list-inline">
                          <li class="list-inline-item"><FaStopwatch/> {appoint.time}</li>
                          <li class="list-inline-item"><FaLocationArrow/> {appoint.location}</li>
                          <li class="list-inline-item"><FaUserAlt/> {appoint.buyerName}</li>
                          <li class="list-inline-item"><FaMailBulk/> {appoint.buyerEmail}</li>
                      </ul>
                  <p className="card-text">Rating: {appoint.review.stars} stars  {appoint.review.reviewText}</p>
                  <button id={appoint.ID} className="btn btn-success" onClick={(e) => this.showModal(e, appoint, index)} disabled={!showAccpetedButton}>Accept</button>&nbsp;
                  <button id={appoint.ID} className="btn btn-danger" onClick={(e) => this.statusHandler(e, "declined", appoint.bookId, index)}disabled={!showDeclineButton}>Decline</button>&nbsp;
                 <button id={appoint.ID} className="btn btn-primary" onClick={(e) => this.statusHandler(e, "Sold", appoint.bookId, index)} disabled={!showSoldButton}>Mark as Sold</button>
                  </div>
              </div>
          </div>
      </div>
      </div>
        
            );
    })
  }
      </div>
    </div>
  }
}

export default withRouter(MyNotifications);