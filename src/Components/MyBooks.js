import React from 'react'
import '../App.css'


function BookList() {
    return (
        <div class="container" id="myBooks">   
            <div className="container-fluid">
                <h2>My Books</h2> <hr/>
                <ul class="list-unstyled">
                    {/* book 1 */}
                    <li class="media">
                        <img class="mr-3" src="./logo192.png" alt="Generic placeholder image" id="book-image"/>
                        <div class="media-body">
                            <h5 class="mt-0 mb-1">Book Title</h5>
                            <small className="text-muted">Posted in May 12, 2021</small><br/>
                                Book description <br/>
                            <a href="#">Edit</a> &nbsp;
                            <a href="#" className="text-danger">Delete</a>
                        </div>
                    </li><br/>
                    {/* book 2 */}
                    <li class="media">
                        <img class="mr-3" src="./logo192.png" alt="Generic placeholder image" id="book-image"/>
                        <div class="media-body">
                            <h5 class="mt-0 mb-1">Book Title</h5>
                            <small className="text-muted">Posted in May 12, 2021</small><br/>
                                Book description <br/>
                            <a href="#">Edit</a> &nbsp;
                            <a href="#" className="text-danger">Delete</a>
                        </div>
                    </li><br/>
                    {/* book 3 */}
                    <li class="media">
                    <img class="mr-3" src="./logo192.png" alt="Generic placeholder image" id="book-image"/>
                        <div class="media-body">
                            <h5 class="mt-0 mb-1">Book Title</h5>
                            <small className="text-muted">Posted in May 12, 2021</small><br/>
                                Book description <br/>
                            <a href="#">Edit</a> &nbsp;
                            <a href="#" className="text-danger">Delete</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>    
    )
}

export default BookList