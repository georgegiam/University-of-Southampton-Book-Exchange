import React from 'react'

function Details(){
    return (
        <div class="container">
            <div class="container-fluid">
            <div class="row">
                <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Python For Dummies</h5>                      

                        <h6 class="card-subtitle mb-2 text-muted">Used</h6>
                        <h5 class="card-subtitle mb-2 text-muted">9.99$</h5> 
                        <p class="card-text">Some quick example text. This text contins any important information from the seler.</p>                       
                        <a class="btn btn-primary" href="#" role="button">Buy</a>
                    </div>
                    </div>
                </div>
                <div class="col">
                <h5 class="card-title">About the Book</h5>  
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                 when an unknown printer took a galley of type and scrambled it to make a type 
                 specimen book. It has survived not only five centuries, but also the leap into 
                 electronic typesetting, remaining essentially unchanged. 
                </div>
            </div>
            </div>
        </div>
    )
}

export default Details