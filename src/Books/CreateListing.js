import React, {Component}  from 'react';

class CreateListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Fiction: true,
            nonFiction: false,
            educational: false,
            bookName: '',
            bookCondition: 'Poor',
            price: 0,
            bookDescription: 'Item Description here',
        };

      this.handleInputChange = this.handleInputChange.bind(this);
    }
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
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

    submitHanler = (event) => {
        event.preventDefault();
        console.log(this.state);
        //alert("Book to Sumbit:" + this.state.bookToAdd.name + '\n' + this.state.bookToAdd.category)
    }

    render () {
        return (
            <form onSubmit={this.submitHanler}>
                <b><p>Book name:</p></b>
                <input type='text' name='bookName' onChange={this.changeHandler} ></input>

                <b><p>Price (£): </p></b>
                <input type='number' name='price' onChange={this.changeHandler} ></input>

                <b><p>Cetegory</p></b>
                <label>
                    Fiction:
                    <input
                        name="Fiction"
                        type="checkbox"
                        checked={this.state.Fiction}
                        onChange={this.handleInputChange} />
                </label>

                <label>
                    Non-Fiction:
                    <input
                        name="nonFiction"
                        type="checkbox"
                        checked={this.state.nonFiction}
                        onChange={this.handleInputChange} />
                </label>

                <label>
                    Educational:
                    <input
                        name="educational"
                        type="checkbox"
                        checked={this.state.educational}
                        onChange={this.handleInputChange} />
                </label>

                <br></br>

                <b><p>Condition: </p></b>
                <label>
                    <input type="radio" value="Poor" checked={this.state.bookCondition === 'Poor'} onChange={this.handleCondtionChange} />
                    Poor
                </label>

                <label>
                    <input type="radio" value="Good" checked={this.state.bookCondition === 'Good'} onChange={this.handleCondtionChange} />
                    Good
                </label>

                <label>
                    <input type="radio" value="Very Good" checked={this.state.bookCondition === 'Very Good'} onChange={this.handleCondtionChange} />
                    Very Good
                </label>

                <label>
                    <input type="radio" value="New" checked={this.state.bookCondition === 'New'} onChange={this.handleCondtionChange} />
                    New
                </label>
                
                {/* Need to add the image upload fun */}
                <b><p>Image Upload: </p></b>
                <br></br>

                <b><p>Item Description</p></b>
                <textarea value={this.state.bookDescription} onChange={this.changeHandler} name='bookDescription' />

                <br></br><br></br>
                <input type='submit'/>

                <label htmlFor="nonFiction"></label>

            </form>
        )
    }
}

export default CreateListing;