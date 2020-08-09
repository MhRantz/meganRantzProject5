import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return (
            <nav>
                <h1>Tsundoku.</h1>
                <button id="scrollHere" className={`is${this.props.activeStatus}`} onClick={this.props.activeChange}>
                    <span>{this.props.stackSize}</span>
                    <p>in your stack</p>
                    <h5>Your Stack</h5>
                </button>
            </nav>
        )
    }
}

export default Nav;