import React, {PureComponent} from "react";
import '../App.css'
import Aux from '../hoc/Aux'

class Landpage extends PureComponent {

    render() {

        console.log("At landing page now and books added :", this.props.books);
        return this.props.books.map((book, index) => {
            let endTag = null;
            let isNewDeck = ((index + 1) % 4) === 0;
            if(isNewDeck){
                endTag = <div class="w-100"></div>
            }
            return (
                <Aux>
                <div className="card">
                    <img className="card-img-top" src={book.bookImageUrl} alt="Card image cap" />
                        <div className="card-body">
                            <b><h5 className="card-title">{book.bookName}</h5></b>                
                            <h5 className="text-muted">£{book.bookPrice}</h5>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-primary btn-sm float-right">Details</button>
                        </div>
                </div>
                    {endTag}
                </Aux>

                );
            });
    }
}

export default Landpage