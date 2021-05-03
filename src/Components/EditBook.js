import React, { useState, useEffect } from 'react';
import '../App.css'
import { withRouter } from 'react-router-dom';

import * as Firebase from "../FirebaseUtility/readFromDatabase";

const EditBook = (props) => {

    const [bookTitle, setTitle] = useState(props.location.state.book.bookName);
    const [bookPrice, setPrice] = useState(props.location.state.book.bookPrice);
    const [bookDescription, setDescription] = useState(props.location.state.book.bookDescription);

    async function saveHandler() {
        var bookID = props.location.state.book.ID;
        await Firebase.updateBookByID(bookID, bookTitle, bookPrice, bookDescription);
        const {history} = props; 
        history.push("/myBooks");
    }

    function titleHandler(event) {
        setTitle(event.target.value);
    }

    function priceHandler(event) {
        setPrice(event.target.value);
    }

    function descriptionHandler(event) {
        setDescription(event.target.value);
    }

    return (
        <div className="container" id="edit">
            <div className="container-fluid">
                <h2>Edit book</h2><hr/>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Book title</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" onChange={titleHandler} value={bookTitle}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Price</label>
                        <input type="number" min="0" className="form-control" onChange={priceHandler} id="exampleInputPassword1" value={bookPrice}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" onChange={descriptionHandler} value={bookDescription} rows="4"></textarea>
                    </div>
                    <button type="submit" onClick={saveHandler} className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
  }

export default withRouter(EditBook);