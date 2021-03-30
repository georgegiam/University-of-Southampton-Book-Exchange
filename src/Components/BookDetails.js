import React, {PureComponent}  from 'react';
import '../App.css'

import { withRouter } from 'react-router-dom';


class BookDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.location.state.book,
        };
    }

    render () {
        
        //console.log("This Book details state:", this.state.book);

    return (
            <div className="container" id="book-details-container">           
                <div className="row">
                    <div className="col text-center">                 
                        <img className="card-img-top" src={this.state.book.bookImageUrl} id="book-image" />        
                    </div>
                    <div className="col">
                    <h3>{this.state.book.bookName}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">{this.state.book.bookCategory}</h6>
                    <h5 className="card-subtitle mb-2 text-muted">£{this.state.book.bookPrice}</h5>               
                                
                    <hr />

                    <p>{this.state.book.bookDescription}</p> 
                    
                    <button className="btn btn-primary">Buy</button>
                    </div>
                </div>
            </div>    
        )
    }
}

export default withRouter(BookDetails)