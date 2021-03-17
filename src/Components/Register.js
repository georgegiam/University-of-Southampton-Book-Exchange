import React from 'react'
import '../App.css'


function RegisterForm(){
    return (
        <div class="container" id="register">   
            <h3>Create an Account</h3><br />
            <form>
            <div class="form-row">
                {/* First Name */}
                <div class="form-group col-md-6">                
                    <input type="text" class="form-control" id="inputEmail4" placeholder="First Name" required />
                </div>
                {/* Last Name */}
                <div class="form-group col-md-6">            
                    <input type="text" class="form-control" id="inputPassword4" placeholder="Lat Name" required />
                </div>
            </div>
            {/* Email */}
            <div class="form-group">             
                <input type="email" class="form-control" id="inputAddress" placeholder="Email" required />
                <small class="form-text text-muted font-italic">Use your University email (username@soton.ac.uk) to create an account</small>
            </div>       
            <div class="form-row">
                {/* Password */}
                <div class="form-group col-md-6">         
                    <input type="password" class="form-control" id="inputCity" placeholder="Password" required />
                </div>    
                {/* Password Verification */}
                <div class="form-group col-md-6">      
                    <input type="password" class="form-control" id="inputZip" placeholder="Repeat Password" required />
                </div>
            </div>
            {/* Terms and Conditions */}
            <div class="form-group">
                <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck" required />
                <small >
                    By creating an account I agree to all terms and conditions.
                </small>
                </div>
            </div>
            {/* Register Button */}
            <button type="submit" class="btn btn-primary w-100">Register</button>
            </form> <br />
            
            <small class="d-flex justify-content-center">Already have an account? <a href="#">Login</a></small>  
        </div>    
    )
}

export default RegisterForm