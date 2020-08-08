import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return (
            <nav>
                <h1>Tsundoku.</h1>
                <button className={`is${this.props.activeStatus}`} onClick={this.props.activeChange}><span>{this.props.stackSize}</span> in your stack</button>
            </nav>
        )
    }
}

export default Nav;