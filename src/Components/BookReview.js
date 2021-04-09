import React from 'react'
import '../App.css'
// react icons
import { FaStar } from 'react-icons/fa';

function Review (props) {
    return (
    <div className="container" id="review">
        <div className="container-fluid">
            <h2>Book Review</h2><hr/>

            <form>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Book</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputEmail3" value="book title" disabled/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Seller</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputPassword3" value="seller name" disabled/>
                    </div>
                </div>
                <fieldset class="form-group">
                    <div class="row">
                    <legend class="col-form-label col-sm-2 pt-0">Rate</legend>
                    <div class="col-sm-10">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                            <label class="form-check-label" for="inlineRadio1"><FaStar/></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                            <label class="form-check-label" for="inlineRadio2"><FaStar/><FaStar/></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                            <label class="form-check-label" for="inlineRadio3"><FaStar/><FaStar/><FaStar/></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                            <label class="form-check-label" for="inlineRadio3"><FaStar/><FaStar/><FaStar/><FaStar/></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                            <label class="form-check-label" for="inlineRadio3"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></label>
                        </div>
                    </div>
                    </div>
                </fieldset>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Review</label>
                    <div class="col-sm-10">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
                </form>
        </div>
    </div>);
  }



export default Review