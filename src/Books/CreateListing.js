import React, {PureComponent}  from 'react';
import { withRouter } from 'react-router-dom';

import * as Firebase from '../FirebaseUtility/addBookToDatabase'; 
import firebase from "../FirebaseUtility/firebaseSetup";

class CreateListing extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bookCategory: '',
            bookName: '',
            bookCondition: 'Poor',
            price: 0,
            bookDescription: '',
            imageFile: '',
        };


    }

    typeHandler = (event) => {
        this.setState({
            bookCategory: event.target.value
        });
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
                                <select class="form-control" id="exampleFormControlSelect1" onChange={this.typeHandler}>
                                    <option value="Action and adventure">Action and adventure</option>
                                    <option value="Alternate history">Alternate history</option>
                                    <option value="Anthology">Anthology</option>
                                    <option value="Art/architecture" >Art/architecture</option>
                                    <option value="Autobiography"> Autobiography</option>
                                    <option value="Biography">Biography</option>
                                    <option value="Business/economics">Business/economics</option>
                                    <option value="Crafts/hobbies">Crafts/hobbies</option>
                                    <option value="Chick lit">Chick lit</option>
                                    <option value="Children's">Children's</option>
                                    <option value="Classic">Classic</option>
                                    <option value="Comic book">Comic book</option>
                                    <option value="Coming-of-age">Coming-of-age</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Crafts/hobbies">Crafts/hobbies</option>
                                    <option value="Cookbook">Cookbook</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Diary">Diary</option>
                                    <option value="Dictionary">Dictionary</option>
                                    <option value="Encyclopedia">Encyclopedia</option>
                                    <option value="Fairytale">Fairytale</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Graphic novel">Graphic novel</option>
                                    <option value="Guide">Guide</option>
                                    <option value="Historical fiction">Historical fiction</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Health/fitness">Health/fitness</option>
                                    <option value="History">History</option>
                                    <option value="Home and garden">Home and garden</option>
                                    <option value="Humor">Humor</option>
                                    <option value="Journal">Journal</option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="Math">Math</option>
                                    <option value="Memoir">Memoir</option>
                                    <option value="Paranormal romance">Paranormal romance</option>
                                    <option value="Picture book">Picture book</option>
                                    <option value="Poetry">Poetry</option>
                                    <option value="Political thriller">Political thriller</option>
                                    <option value="Philosophy">Philosophy</option>
                                    <option value="Prayer">Prayer</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Review">Review</option>
                                    <option value="Religion, spirituality, and new age">Religion, spirituality, and new age</option>
                                    <option value="Satire">Satire</option>
                                    <option value="Science">Science</option>
                                    <option value="Self help">Self help</option>
                                    <option value="Sports and leisure">Sports and leisure</option>
                                    <option value="Science fiction">Science fiction</option>
                                    <option value="Short story">Short story</option>
                                    <option value="Suspense">Suspense</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Textbook">Textbook</option>
                                    <option value="True crime">True crime</option>
                                    <option value="Western">Western</option>
                                    <optionv value="Young adult">Young adult</optionv>
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