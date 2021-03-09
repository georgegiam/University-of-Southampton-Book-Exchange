import React, {Component}  from 'react';

class CreateListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Fiction: false,
            bookName: '',
            bookCondition: 'Poor',
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
                <p>Book name:</p>
                <input type='text' name='bookName' onChange={this.changeHandler} ></input>

                <p>Category:</p>
                <label>
                    Fiction:
                    <input
                        name="Fiction"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>

                <br></br>

                <p>Condition:</p>
                <label>
                    <input type="radio" value="Very Good" checked={this.state.bookCondition === 'Very Good'} onChange={this.handleCondtionChange} />
                    Option 3
                </label>

                <label>
                    <input type="radio" value="Good" checked={this.state.bookCondition === 'Good'} onChange={this.handleCondtionChange} />
                    Option 2
                </label>

                <br></br>
                <input type='submit'/>

                <label htmlFor="nonFiction"></label>

            </form>
        )
    }
}

export default CreateListing;