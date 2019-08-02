import React, { Component } from 'react';

export default class Help extends Component {
    state = {
        subject: "",
        body: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state))
    }
    render() {
        return(
            <div className='form-container'>
            <div className='form'>
                <form className='help-form'>
                    <h2>Report an Issue</h2>
                        <br></br>
                        <br></br>
                    <h4>Subject</h4>

                    <input type='text' 
                    name='subject' value={this.state.subject} 
                    onChange={this.changeHandler}
                    className='input'/>

                    <br></br>

                    <h4>Body</h4>

                    <textarea type='text' 
                    name='body' value={this.state.body} 
                    onChange={this.changeHandler}
                    className='textarea'/>

                    <br></br>

                   <button className='submit'>Submit</button>
                </form>
            </div>
            </div>
        );
    }
}