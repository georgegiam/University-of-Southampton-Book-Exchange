import React from 'react'

function Nav(){
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">University of Southampton Book Exchange</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">               
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li> 
                </ul> 
                <a href="#" class="text-decoration-none">Login</a>                              
            </div>
        </nav>
    )
}

export default Nav