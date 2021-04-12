import React, { Component } from 'react';
import * as FirebaseNotfi from "../FirebaseUtility/notification";

import { withRouter } from 'react-router-dom';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: this.props.location.state.appointment,
            currentUserID: this.props.location.state.currentUserID,
            date: 'Pending',
            time: 'Pending',
            location: 'Pending',
        };

    } 
    setDateandTimeHandler = async (event) => {
        const {history} = this.props
        await FirebaseNotfi.setDateandTime(this.state.currentUserID, this.state.appointment.ID, this.state.date, this.state.time, this.state.location);
        history.push("/myNotifications");
    }

    dateHandler = (event) => {
        this.setState({date: event.target.value});
      }

    timeHandler = (event) => {
        this.setState({time: event.target.value});
      }

    locationHandler = (event) => {
        this.setState({location: event.target.value});
      }


    render() {
    console.log('date picker', this.state.appointment);

    return (
      <div className="container" id="scheduler">
        <div className="container-fluid">
          <h2>Appointmen scheduler</h2><hr/>
          <form onSubmit={(e) => this.setDateandTimeHandler(e)}>
            <p>Please select a date and time for the book exhange</p>
            <div className="form-group">
              <input type="date" className="form-control" onChange={this.dateHandler} required />
            </div>

            <div className="form-group">
              <input type="time" className="form-control"onChange={this.timeHandler} required/>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" onChange={this.locationHandler} placeholder="Appointment Location" required/>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
      </div>

        )
    }

}

export default withRouter(DatePicker);