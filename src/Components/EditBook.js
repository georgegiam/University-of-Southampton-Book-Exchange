import React from 'react'
import '../App.css'

// react icons
import { FaLocationArrow, FaStopwatch, FaCalendar, FaMoneyBill } from 'react-icons/fa';


function Edit() {
    return (
        <div className="container" id="edit">
            <div className="container-fluid">
                <h2>Edit book</h2><hr/>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Book title</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" placeholder="book title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Price</label>
                        <input type="number" min="0" class="form-control" id="exampleInputPassword1" placeholder="book price"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="book description" rows="4"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
  }

export default Edit