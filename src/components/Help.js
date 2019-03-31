import React, { Component } from 'react';

export default class Help extends Component {
    render() {
        return(
            <div className='form-container'>
            <div className='form'>
                <form className='help-form'>
                    <h4>Subject</h4>
                    <input type='text' name='subject' className='input'/>
                    <br></br>
                    <h4>Body</h4>
                    <textarea type='text' name='body' className='textarea'/>
                    <br></br>
                    <input type='submit' className='submit'/>
                </form>
            </div>
            </div>
        );
    }
}