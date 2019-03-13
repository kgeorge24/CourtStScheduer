import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

class Nav extends Component {

    clickHandler = () => {
        localStorage.clear()
        this.props.history.push('/')
    }
    
    render() {
        return(
            <div className="nav-primary">                
                <button className="logout-button" onClick={this.clickHandler}>Logout</button>
            </div>
        );
    }
}

export default withRouter(Nav)