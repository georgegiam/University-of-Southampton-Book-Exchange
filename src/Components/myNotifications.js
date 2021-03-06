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
          // Code resource used for react router history: https://reactrouter.com/web/api/history
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
          empty = <div className="alert alert-primary text-center" role="alert">
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
        var day = new Date(calDate).getDate();
        if(isNaN(day)) {
          day = "N/A";
        }


        return (
          // calendar card
          <div className="row row-striped" id="app-date" key={index}>
            
              
              <div className="col-2 text-center" >
                <h1 className="display-4"><span className="badge badge-secondary">{day}</span></h1>
                <h2>{months[month]}</h2>
                <p className="card-text"><span className="badge badge-info">{appoint.status}</span> </p>
              </div>

              {/* notification info in desktop view */}
              <div className="col-10" id="desktop-data">
                <h3>{appoint.bookName}</h3>
                <ul className="list-inline">
                    <li className="list-inline-item"><FaStopwatch/> {appoint.time}</li>
                  <li className="list-inline-item"><FaLocationArrow/> {appoint.location}</li>
                  <li className="list-inline-item"><FaMailBulk/> {appoint.buyerEmail}</li>
                </ul>
                <p className="card-text">Stars: {appoint.review.stars}</p>
                <p className="card-text">Review:  {appoint.review.reviewText}</p>
                <button id={appoint.ID} className="btn btn-sm btn-success" onClick={(e) => this.showModal(e, appoint, index)} disabled={!showAccpetedButton}>Accept</button>&nbsp;
                <button id={appoint.ID} className="btn btn-sm btn-danger" onClick={(e) => this.statusHandler(e, "declined", appoint.bookId, index)}disabled={!showDeclineButton}>Decline</button>&nbsp;
                <button id={appoint.ID} className="btn btn-sm btn-primary" onClick={(e) => this.statusHandler(e, "Sold", appoint.bookId, index)} disabled={!showSoldButton}>Mark as Sold</button>
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