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
        const {history} = this.props; 
        history.push({
            pathname: '/details',
            state: {book: data}
        })
    }

    
    render() {

        // Code resource used for flex: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
        return <div className="w-100" style={{flexWrap: "wrap", display: "flex", justifyContent: "center"}}> {this.props.books.map((book, index) => {
            if(book.isAvailable) {
                return (
                    <a key={index} style={{cursor: "pointer"}} onClick={((e) => this.moreInfoHandler(e, book))} value={book}>
                        <div className="card shadow bg-white rounded" id="book-card">
                            <img id="card-img" className="card-img-top" src={book.bookImageUrl} alt="Card image cap" />
                            <div className="card-body">
                                <b><h5 className="card-title">{book.bookName}</h5></b>                
                                <h5 className="text-muted">£{book.bookPrice}</h5>
                            </div>
                        </div>
                    </a>
                );
            }
            }) 
        } </div>
    }

}

export default withRouter(Landpage);