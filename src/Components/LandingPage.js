import React, {PureComponent} from "react";
import '../App.css'

class Landpage extends PureComponent {

    render() {

        console.log("At landing page now:", this.props.books);
        return this.props.books.map((book, index) => {
            return (
                <div className="card">
                    <img className="card-img-top" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" alt="Card image cap" />
                    <div className="card-body">
                    <h5 className="card-title">{book.bookName}</h5>                   
                    <h5 className="text-muted">{book.bookPrice}</h5>
                    </div>
                    <div className="card-footer">
                    <button type="button" className="btn btn-primary btn-sm float-right">Deatils</button>
                    </div>
                </div>
                );
            });
    }
}

export default Landpage