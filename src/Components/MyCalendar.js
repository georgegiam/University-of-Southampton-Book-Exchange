import React from 'react'
import '../App.css'

// react icons
import { FaLocationArrow, FaStopwatch, FaCalendar, FaMoneyBill } from 'react-icons/fa';


function Calendar() {
    return (
        <div className="container" id="calendar">
            <div className="container-fluid">
                <h2>My calendar</h2><hr/>
                <div class="row row-striped">
                    <div class="col-2 text-center">
                        <h1 class="display-4"><span class="badge badge-secondary">23</span></h1>
                        <h2>OCT</h2>
                    </div>
                    <div class="col-10">
                        <h3><strong>Book title</strong></h3>
                        <ul class="list-inline">
                            <li class="list-inline-item"><FaCalendar/> Monday</li>
                            <li class="list-inline-item"><FaStopwatch/> 2:00 PM</li>
                            <li class="list-inline-item"><FaLocationArrow/> Cafe</li>
                        </ul>
                        <p>25$</p>
                    </div>
                </div>
            </div>
        </div>
    );
  }

export default Calendar