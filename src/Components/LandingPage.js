import React, {PureComponent} from "react";
import '../App.css'
import Aux from '../hoc/Aux'
import { withRouter } from 'react-router-dom';

class Landpage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    moreInfoHandler = (event, data) => {
        //console.log(data);
        const {history} = this.props; 
        history.push({
            pathname: '/details',
            state: {book: data}
        })
    }

    render() {

        
        return this.props.books.map((book, index) => {
            let endTag = null;
            let isNewDeck = ((index + 1) % 4) === 0;
            // 4th card is added in the row
            if(isNewDeck){
                // what's this??
                endTag = <div className="w-100"></div>
            }
            return (
                    <Aux key={index}>
                        <div className="card" id="book-card">
                        <img className="card-img-top" src={book.bookImageUrl} alt="Card image cap" />
                        <div className="card-body">
                            <b><h5 className="card-title">{book.bookName}</h5></b>                
                            <h5 className="text-muted">£{book.bookPrice}</h5>
                        </div>
                        <div class="card-footer text-muted">
                        <a onClick={((e) => this.moreInfoHandler(e, book))} value={book} className="btn btn-primary float-right">More Info</a>
                        </div>
                    </div>
                    {endTag}
                </Aux>
                );
            });
    }
}

export default withRouter(Landpage);