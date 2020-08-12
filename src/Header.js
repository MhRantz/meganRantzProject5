import React, { Component } from 'react';
import tsunDoka from './assets/tsunDoka.png';

class Header extends Component {
    render() {
        return (
            <div className="mainHeader">
                <div className="headerContent">
                    <h2>Manage your reading stack all in one place</h2>
                    <button onClick={this.props.howTo}>Learn How.</button>
                </div>
                <div className="headerImg">
                    <img src={tsunDoka} alt="Line Drawing of a Japanese painting of a woman holding a book" />
                </div>
            </div>
        )
    }
}

export default Header;