import React, { Component } from 'react';

export default class Help extends Component {
    render() {
        return(
            <div className='help-form'>
                <form>
                    <input type='text' name='subject'/>
                    <br></br>
                    <textarea></textarea>
                </form>
            </div>
        );
    }
}