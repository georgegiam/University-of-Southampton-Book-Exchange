import React, {Component}  from 'react';
import '../App.css'
import Modal from "react-bootstrap/Modal";

import firebase from "../FirebaseUtility/firebaseSetup";
import * as Firebase from "../FirebaseUtility/readFromDatabase";
import * as FirebaseNotfi from "../FirebaseUtility/notification";
import Aux from "../hoc/Aux"

class MyNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            currentUserID: "",
            test: '',
            isOpen: false,
            date: 'Pending',
            time: 'Pending',
            location: 'Pending'
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

      hideModal = () => {
        this.setState({isOpen: false});
      }

      showModal = () => {
        this.setState({isOpen: true});
      }

      setDateandTimeHandler = (event, bookId, index, id) => {
        FirebaseNotfi.setDateandTime(this.state.currentUserID, id, this.state.date, this.state.time, this.state.location);
        var newAppoint = this.state.appointments;
        newAppoint[index].date = this.state.date;
        newAppoint[index].time = this.state.time;
        newAppoint[index].location = this.state.location;
        newAppoint[index].status = 'accepted';
        this.setState({
          appointments: newAppoint
      });
      this.hideModal();
    }

      changeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value
       });
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
        }
        return (
          <div className="container" id="notifications">
            <div className="container-fluid">
              <h2>My notifications</h2><hr/>
            <Aux key={index}>
            <div className="list-group-item list-group-item-warning" key={index}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mt-0">{appoint.bookName}</h5>
              <p className="card-text"><span className="badge badge-info">{appoint.status}</span> </p>
            </div>
             
   
              
                <h5 className="card-title">Buyer Email: {appoint.buyerEmail}</h5>
                
                <p className="card-text">Date and Time: {appoint.date} {appoint.time}</p>
                <button id={appoint.ID} className="btn btn-success" onClick={this.showModal} disabled={!showAccpetedButton}>Accept</button>&nbsp;
                <a href="#" id={appoint.ID} className="btn btn-danger" onClick={(e) => this.statusHandler(e, "declined", appoint.bookId, index)}>Decline</a>&nbsp;
                <a href="#" id={appoint.ID} className="btn btn-primary" onClick={(e) => this.statusHandler(e, "Sold", appoint.bookId, index)}>Mark as Sold</a>
              
          </div> 


            <Modal className="modal fade" show={this.state.isOpen}>
              <Modal.Header className="modal-header">
                <Modal.Title className="modal-title">Appointment Scheduler</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body">
                Please select a date and time for the book exhange:
                <div className="form-group">
                  <input type="date" className="form-control" id="date" name="date" onChange={this.changeHandler} />
                </div>

                <div className="form-group">
                  <input type="time" className="form-control" id="time" name="time" onChange={this.changeHandler} required/>
                </div>

                <div className="form-group">
                  <input type="text" className="form-control" id="location" name="location" onChange={this.changeHandler} placeholder="Appointment Location" required/>
                </div>
                
                
                
              </Modal.Body>
              <Modal.Footer className="modal-footer">
                <button className="btn btn-danger" onClick={this.hideModal}>Cancel</button>
                <button className="btn btn-primary" onClick={(e) => this.setDateandTimeHandler(e, appoint.bookId, index, appoint.ID)}>Save</button>
              </Modal.Footer>
          </Modal>
          
        </Aux>
            </div>
          </div>
          
            );
    });
}
}

export default MyNotifications;