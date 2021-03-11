import React, {Component}  from 'react';

import * as Firebase from '../FirebaseUtility/addBookToDatabase'; 

class CreateListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookCategory: [],
            bookName: '',
            bookCondition: 'Poor',
            price: 0,
            bookDescription: 'Item Description here',
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
        //alert(event.target.value
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
        //alert("Book to Sumbit:" + this.state.bookToAdd.name + '\n' + this.state.bookToAdd.category)
    }

    render () {
        return (
            <form onSubmit={this.submitHandler}>
                
                <div className="form-group row">
                    <div className="col-sm-4 offset-sm-4 text-center">
                        <b><label >Book Title:</label></b>
                        <input type="text" className="form-control" id="bookName" name="bookName" aria-describedby="bookHelp" placeholder="Enter book name" onChange={this.changeHandler} size="20"/>
                        <small id="bookHelp" className="form-text text-muted">Please list the full title</small>
                    </div>
                </div>
                    
                <div className="form-group row">
                    <div className="col-sm-4 offset-sm-4 text-center">
                        <label >Price:</label>
                        <input type="number" className="form-control" id="price" name="price" aria-describedby="priceHelp" placeholder="Enter book price" onChange={this.changeHandler}/>
                        <small id="emailHelp" className="form-text text-muted">Using £</small>
                    </div>
                </div>

                <b><label >Category:</label></b>
                <br></br>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="Fiction" name="Fiction" onChange={this.handleInputChange}/>
                    <label className="form-check-label" >Fiction</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="nonFiction" name="nonFiction" onChange={this.handleInputChange}/>
                    <label className="form-check-label" >Non-Fiction</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="educational" name="educational" onChange={this.handleInputChange}/>
                    <label className="form-check-label" >Educational</label>
                </div>

                <br></br>

                <b><label >Condition:</label></b>
                <br></br>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="Used" checked={this.state.bookCondition === 'Used'} onChange={this.handleCondtionChange}/>
                    <label className="form-check-label" >Used</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="Good" checked={this.state.bookCondition === 'Good'} onChange={this.handleCondtionChange}/>
                    <label className="form-check-label" >Good</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="Very Good" checked={this.state.bookCondition === 'Very Good'} onChange={this.handleCondtionChange}/>
                    <label className="form-check-label" >Very Good</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="New" checked={this.state.bookCondition === 'New'} onChange={this.handleCondtionChange}/>
                    <label className="form-check-label" >New</label>
                </div>

                <br></br>
                
                <div className="col-sm-4 offset-sm-4 text-center">
                    <b><label htmlFor="exampleFormControlTextarea1">Item Description: </label></b>
                    <textarea className="form-control" rows="3" value={this.state.bookDescription} onChange={this.changeHandler} name='bookDescription'></textarea>
                </div>

                <br></br>

                {/* Need to add the image upload fun */}
                <div className="form-check form-check-inline">
                    <input type="file" className="form-control-file" onChange={this.imageHandler}/>
                </div>

                <br></br><br></br>
                <input type='submit' className="btn btn-primary"/>

            </form>

        )
    }
}

export default CreateListing;