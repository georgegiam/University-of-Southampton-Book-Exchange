import React, {PureComponent} from "react";
import '../App.css'
import Aux from '../hoc/Aux'

class Landpage extends PureComponent {

    render() {
        return this.props.books.map((book, index) => {
            let endTag = null;
            let isNewDeck = ((index + 1) % 4) === 0;
            if(isNewDeck){
                endTag = <div className="w-100"></div>
            }
            return (
                    <Aux key={index}>
                        <div className="card" id="book-card">
                            <a href="#"><img className="card-img-top" src={book.bookImageUrl} alt="Card image cap" /></a>
                            <div className="card-body">
                                <b><h5 className="card-title">{book.bookName}</h5></b>                
                                <h5 className="text-muted">£{book.bookPrice}</h5>
                            </div>
                    </div>

             
                    {endTag}
                </Aux>
                );
            });
    }
}

export default Landpage