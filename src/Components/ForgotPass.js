import React from 'react';
import firebase from "../FirebaseUtility/firebaseSetup";

const forgotPass = () => {

    let email = '';

    function emailHandler(event) {
        email = event.target.value;
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Forgot Event: ", event);
        firebase.auth().sendPasswordResetEmail(email)
            .then(function() {
                alert('Reset password email sent');
            }).catch(function(error){
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return(
            <div className="container" id="register">   
                <div className="container-fluid">
                <h3>Forgot Password</h3><br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">             
                        <input type="email" className="form-control" id="inputAddress" name="email" onChange={emailHandler} placeholder="Email" required />
                        <small className="form-text text-muted font-italic">Please enter your University email address</small>
                    </div> 
                    <button type="submit" className="btn btn-primary w-100">Send Email</button>
                </form>
                </div>
            </div>
    )

}





export default forgotPass;