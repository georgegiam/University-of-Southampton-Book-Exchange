import React, {PureComponent}  from 'react';
import { withRouter } from 'react-router-dom';

import * as Firebase from '../FirebaseUtility/addBookToDatabase'; 
import firebase from "../FirebaseUtility/firebaseSetup";

class CreateListing extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bookCategory: [],
            bookName: '',
            bookCondition: 'Poor',
            price: 0,
            bookDescription: '',
            imageFile: '',
        };

      this.handleInputChange = this.handleInputChange.bind(this);

    }

      handleInputChange(event) {
        const newBooksCetegory = this.state.bookCategory;
        const check = event.target.checked;
        const name = event.target.name;

        if(check) {
            this.setState({
                bookCategory: [...this.state.bookCategory, name]
            })
        } else {
            var index = newBooksCetegory.indexOf(name);
            if(index > -1) {
                newBooksCetegory.splice(index, 1);
                this.setState({
                    bookCategory: newBooksCetegory
                })
            }
        }
    }

    imageHandler = (event) => {
        const image = event.target.files[0];
        this.setState({
            imageFile: image
        })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCondtionChange = (event) => {
        this.setState({
            bookCondition: event.target.value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        Firebase.addToCollection(this.state)
    }

    render () {
        const {history} = this.props; // TODO: This needs to improved as were making multiple render calls here
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              console.log("uid: " + uid);
              this.setState({isLoggedIn: true})
            } else {
                //alert("Please Login First!");
                history.push("/login");
            }
          });

        return (
            <div className="container" id="addBook">
                <div className="container-fluid">
                    <h2>Add new book</h2><br/>

                    <form onSubmit={this.submitHandler}>
                        {/* title */}
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Title</label>
                            <div class="col-sm-10">
                            <input type="text" className="form-control" id="bookName" name="bookName" aria-describedby="bookHelp" placeholder="Enter book title" onChange={this.changeHandler} size="20" required/>
                            <small id="emailHelp" class="form-text text-muted">Please add the full book title</small>
                            </div>
                        </div>
                        {/* price */}
                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Price</label>
                            <div class="col-sm-10">
                            <input type="number" className="form-control" id="price" name="price" aria-describedby="priceHelp" min="0" placeholder="Enter book price" onChange={this.changeHandler} required/>
                            <small id="emailHelp" class="form-text text-muted">Price is in £</small>
                            </div>
                        </div>
                        {/* condition */}
                        <fieldset class="form-group">
                            <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Condition</legend>
                            <div class="col-sm-10">
                                {/* used */}
                                <div class="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="Used" checked={this.state.bookCondition === 'Used'} onChange={this.handleCondtionChange} required/>
                                <label class="form-check-label" for="gridRadios1">
                                    Used
                                </label>
                                </div>
                                {/* good */}
                                <div class="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="Good" checked={this.state.bookCondition === 'Good'} onChange={this.handleCondtionChange} required/>
                                <label class="form-check-label" for="gridRadios2">
                                    Good
                                </label>
                                </div>
                                {/* very good */}
                                <div class="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="Very Good" checked={this.state.bookCondition === 'Very Good'} onChange={this.handleCondtionChange} required/>
                                <label class="form-check-label" for="gridRadios3">
                                    Very Good
                                </label>
                                </div>
                                {/* new */}
                                <div class="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="New" checked={this.state.bookCondition === 'New'} onChange={this.handleCondtionChange} required/>
                                <label class="form-check-label" for="gridRadios3">
                                    New
                                </label>
                                </div>
                            </div>
                            </div>
                        </fieldset>
                        {/* gerne */}
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Type</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option>Action and adventure</option>
                                    <option>Alternate history</option>
                                    <option>Anthology</option>
                                    <option>Art/architecture</option>
                                    <option>Autobiography</option>
                                    <option>Biography</option>
                                    <option>Business/economics</option>
                                    <option>Crafts/hobbies</option>
                                    <option>Chick lit</option>
                                    <option>Children's</option>
                                    <option>Classic</option>
                                    <option>Comic book</option>
                                    <option>Coming-of-age</option>
                                    <option>Crime</option>
                                    <option>Crafts/hobbies</option>
                                    <option>Cookbook</option>
                                    <option>Drama</option>
                                    <option>Diary</option>
                                    <option>Dictionary</option>
                                    <option>Encyclopedia</option>
                                    <option>Fairytale</option>
                                    <option>Fantasy</option>
                                    <option>Graphic novel</option>
                                    <option>Guide</option>
                                    <option>Historical fiction</option>
                                    <option>Horror</option>
                                    <option>Health/fitness</option>
                                    <option>History</option>
                                    <option>Home and garden</option>
                                    <option>Humor</option>
                                    <option>Journal</option>
                                    <option>Mystery</option>
                                    <option>Math</option>
                                    <option>Memoir</option>
                                    <option>Paranormal romance</option>
                                    <option>Picture book</option>
                                    <option>Poetry</option>
                                    <option>Political thriller</option>
                                    <option>Philosophy</option>
                                    <option>Prayer</option>
                                    <option>Romance</option>
                                    <option>Review</option>
                                    <option>Religion, spirituality, and new age</option>
                                    <option>Satire</option>
                                    <option>Science</option>
                                    <option>Self help</option>
                                    <option>Sports and leisure</option>
                                    <option>Science fiction</option>
                                    <option>Short story</option>
                                    <option>Suspense</option>
                                    <option>Thriller</option>
                                    <option>Travel</option>
                                    <option>Textbook</option>
                                    <option>True crime</option>
                                    <option>Western</option>
                                    <option>Young adult</option>
                                </select>
                            </div>
                        </div>
                        {/* description */}
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10">
                            <textarea className="form-control" rows="3" value={this.state.bookDescription} onChange={this.changeHandler} name='bookDescription' placeholder="Write a description for the product" required></textarea>
                            </div>
                        </div>
                        {/* image */}
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Image</label>
                            <div class="col-sm-10">
                            <input type="file" className="form-control-file" onChange={this.imageHandler} required/>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Post</button>
                        </form>
                </div>
            </div>
            

        )
    }
}

export default withRouter(CreateListing);