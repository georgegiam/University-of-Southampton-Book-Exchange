import React from 'react'
import '../App.css'


function Details(){
    return (
        <div class="container" id="book-details-container">           
            <div class="row">
                <div class="col text-center">                 
                    <img class="card-img-top" src="/images/book-sample.jpeg" id="book-image" />        
                </div>
                <div class="col">
                <h3>Python for Dummies</h3>
                <h6 class="card-subtitle mb-2 text-muted">Used</h6>
                <h5 class="card-subtitle mb-2 text-muted">9.99$</h5>               
                            
                <hr />

                <p>Lorem ipsum, or lipsum as it is sometimes 
                known, is dummy text used in laying out print, graphic or web designs. 
                The passage is attributed to an unknown typesetter in the 15th 
                century who is thought to have scrambled parts of Cicero's De 
                Finibus Bonorum et Malorum for use in a type specimen book. It usually b
                egins with</p> 
                
                <button class="btn btn-primary">Buy</button>
                </div>
            </div>
        </div>    
    )
}

export default Details