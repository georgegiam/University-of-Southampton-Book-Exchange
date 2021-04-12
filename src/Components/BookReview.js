import React, { useState, useEffect } from 'react';
import '../App.css'
import { withRouter } from 'react-router-dom';

// react icons
import { FaStar } from 'react-icons/fa';

import * as FirebaseNotfi from "../FirebaseUtility/notification";

const Review = (props) => {

    const [reviewText, setText] = useState("No Text Review Given");
    const [star, setStar] = useState("0");

    let bookInfo = null;
    let exchangeInfo = null;
    if(props.location.state) {
        bookInfo = props.location.state.purchaseDetails;
        exchangeInfo = props.location.state.exchangeDetails;
    }

    function reviewTextHandler(event) {
        setText(event.target.value);
    }


    function ratingHandler(event) {
        setStar(event.target.value);
    }

    async function reviewHandler () {
        const {history} = props; 
        let review = {stars: star, reviewText: reviewText};
        FirebaseNotfi.setReview(exchangeInfo.sellerId, exchangeInfo.ID, review);
        history.push("/myPurchases");
    }

    return (
    <div className="container" id="review">
        <div className="container-fluid">
            <h2>Book Review</h2><hr/>

            <form>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Book</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputEmail3" value={bookInfo.bookName} disabled/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Seller</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputPassword3" value={exchangeInfo.sellerName} disabled/>
                    </div>
                </div>
                <fieldset class="form-group">
                    <div class="row">
                    <legend class="col-form-label col-sm-2 pt-0">Rate</legend>
                    <div class="col-sm-10">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onChange={ratingHandler} value="1"/>
                            <label class="form-check-label" for="inlineRadio1"><FaStar/></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" onChange={ratingHandler} value="2"/>
                            <label class="form-check-label" for="inlineRadio2"><FaStar/><FaStar/></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" onChange={ratingHandler} value="3" />
                            <label class="form-check-label" for="inlineRadio3"><FaStar/><FaStar/><FaStar/></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" onChange={ratingHandler} value="4" />
                            <label class="form-check-label" for="inlineRadio3"><FaStar/><FaStar/><FaStar/><FaStar/></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" onChange={ratingHandler} value="5" />
                            <label class="form-check-label" for="inlineRadio3"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></label>
                        </div>
                    </div>
                    </div>
                </fieldset>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Review</label>
                    <div class="col-sm-10">
                    <textarea class="form-control" onChange={reviewTextHandler} id="exampleFormControlTextarea1" rows="4"></textarea><br/>
                    <button type="submit" onClick={reviewHandler} class="btn btn-primary">Submit</button>
                    </div>
                </div>
                </form>
        </div>
    </div>);
  }



export default withRouter(Review);