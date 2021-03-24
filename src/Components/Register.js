import React from 'react'
import '../App.css'

import firebase from "../FirebaseUtility/firebaseSetup";

import { withRouter } from 'react-router-dom';

class RegisterForm extends React.Component{

    // constructor
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          pass: '',
          repeatPass: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    // getting the email
    handleChange(event) {
        this.setState({email: event.target.value});
      }

    handlePassChange = (event) => {
        this.setState({pass: event.target.value});
    }

    handleRepeatPassChange = (event) => {
        this.setState({repeatPass: event.target.value});
    }
    
    //   check the email when submit
    handleSubmit(event) {
        let valid_email = "@soton.ac.uk";
        var pos = this.state.email.indexOf("@");
        var check_email = this.state.email.substr(pos, this.state.email.length);

        if (check_email != valid_email || this.state.pass !== this.state.repeatPass) {
            alert("You must use your university email OR passwords do not match");
        }
        else {
            const {history} = this.props;
            // add user to firebase
            var actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                url: 'http://localhost:3000/confirmation',
                // This must be true.
                handleCodeInApp: true
              };
            firebase.auth().sendSignInLinkToEmail(this.state.email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', this.state.email);
                window.localStorage.setItem('passForSignIn', this.state.pass);
                alert("Please check your email for verfication");
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            })
        }

        event.preventDefault();
    }

    render() {
        return (
            <div className="container" id="register">   
                <div className="container-fluid">
                <h3>Create an Account</h3><br />
                <form onSubmit={this.handleSubmit}>
                {/* Email */}
                <div className="form-group">             
                    <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} id="inputAddress" placeholder="Email" required />
                    <small className="form-text text-muted font-italic">Use your University email (username@soton.ac.uk) to create an account</small>
                </div>       
                <div className="form-row">
                    {/* Password */}
                    <div className="form-group col-md-6">         
                        <input type="password" className="form-control" name ="pass" id="inputCity" onChange={this.handlePassChange} placeholder="Password" required />
                    </div>    
                    {/* Password Verification */}
                    <div className="form-group col-md-6">      
                        <input type="password" className="form-control" id="inputZip" onChange={this.handleRepeatPassChange} placeholder="Repeat Password" required />
                    </div>
                </div>
                {/* Terms and Conditions */}
                <div className="form-group">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" required />
                    <small >
                        By creating an account I agree to all terms and conditions.
                    </small>
                    </div>
                </div>
                {/* Register Button */}
                <button type="submit" className="btn btn-primary w-100">Register</button>
                </form> <br />
                
                <small className="d-flex justify-content-center">Already have an account? <a href="http://localhost:3000/login">Login</a></small>
                </div>  
            </div>    
        )
    }
}

export default withRouter(RegisterForm);