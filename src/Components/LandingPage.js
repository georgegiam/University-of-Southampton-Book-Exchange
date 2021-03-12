import React from 'react'
import '../App.css'


function Landpage(){
    return (
        <div class="container" id="book-details-container">   

            <div class="container-fluid w-50">
                {/* search */}
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Search..." />
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" type="button">Search</button>
                    </div>
                </div>   
            </div>

            
            {/* card deck 1 */}
            <div class="card-deck m-5">
                {/* card 1 */}
                <div class="card">
                    <img class="card-img-top" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" alt="Card image cap" />
                    <div class="card-body">
                    <h5 class="card-title">Python for Dummies</h5>                   
                    <h5 class="text-muted">9.99$</h5>
                    </div>
                    <div class="card-footer">
                    <button type="button" class="btn btn-primary btn-sm float-right">Deatils</button>
                    </div>
                </div>
                {/* card 2 */}
                <div class="card">
                    <img class="card-img-top" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" alt="Card image cap" />
                    <div class="card-body">
                    <h5 class="card-title">Python for Dummies</h5>                   
                    <h5 class="text-muted">9.99$</h5>
                    </div>
                    <div class="card-footer">
                    <button type="button" class="btn btn-primary btn-sm float-right">Deatils</button>
                    </div>
                </div>
                {/* card 3 */}
                <div class="card">
                    <img class="card-img-top" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" alt="Card image cap" />
                    <div class="card-body">
                    <h5 class="card-title">Python for Dummies</h5>                   
                    <h5 class="text-muted">9.99$</h5>
                    </div>
                    <div class="card-footer">
                    <button type="button" class="btn btn-primary btn-sm float-right">Deatils</button>
                    </div>
                </div> 
            </div>

            {/* card deck 2 */}
            <div class="card-deck m-5">
                {/* card 1 */}
                <div class="card">
                    <img class="card-img-top" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" alt="Card image cap" />
                    <div class="card-body">
                    <h5 class="card-title">Python for Dummies</h5>                   
                    <h5 class="text-muted">9.99$</h5>
                    </div>
                    <div class="card-footer">
                    <button type="button" class="btn btn-primary btn-sm float-right">Deatils</button>
                    </div>
                </div>
                {/* card 2 */}
                <div class="card">
                    <img class="card-img-top" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" alt="Card image cap" />
                    <div class="card-body">
                    <h5 class="card-title">Python for Dummies</h5>                   
                    <h5 class="text-muted">9.99$</h5>
                    </div>
                    <div class="card-footer">
                    <button type="button" class="btn btn-primary btn-sm float-right">Deatils</button>
                    </div>
                </div>
                {/* card 3 */}
                <div class="card">
                    <img class="card-img-top" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" alt="Card image cap" />
                    <div class="card-body">
                    <h5 class="card-title">Python for Dummies</h5>                   
                    <h5 class="text-muted">9.99$</h5>
                    </div>
                    <div class="card-footer">
                    <button type="button" class="btn btn-primary btn-sm float-right">Deatils</button>
                    </div>
                </div> 
            </div>
        </div>    
    )
}

export default Landpage