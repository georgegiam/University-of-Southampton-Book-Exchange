import React from 'react'
import '../App.css'


function LoginForm(){
    return (
        <div class="container" id="login">   
            <h3>Login to your account</h3><br />
            <form>           
            {/* Email */}
            <div class="form-group">             
                <input type="email" class="form-control" id="inputAddress" placeholder="Email" required />                
            </div>      
            {/* Password */}
            <div class="form-group">             
                <input type="password" class="form-control" id="inputAddress" placeholder="Password" required />                
            </div>                      
            {/* Login Button */}
            <button type="submit" class="btn btn-primary w-100">Login</button>
            </form> <br />
            
            <small class="d-flex justify-content-center">Not a member yet? <a href="#">Create an account</a></small>  
        </div>    
    )
}

export default LoginForm