import React, { Component } from 'react';

export default class Help extends Component {
    render() {
        return(
            <div className='form-container'>
            <div className='form'>
                <form className='help-form'>
                    <h2>Report an Issue
                        <br></br>
                        <br></br>
                    </h2>
                    <h4>Subject</h4>
                    <input type='text' name='subject' className='input'/>
                    <br></br>
                    <h4>Body</h4>
                    <textarea type='text' name='body' className='textarea'/>
                    <br></br>
                   <button className='submit'>Submit</button>
                </form>
            </div>
            </div>
        );
    }
}