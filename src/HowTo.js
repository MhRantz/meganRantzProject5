import React, { Component } from 'react';

class HowTo extends Component {
    render() {
        return (
            <section className="howTo">
                <h4>How To Get Started with Tsundoku</h4>
                <p>Tsundoku means 'reading pile', and refers to the stack of books in your home that you have yet to read. With Tsundoku you can keep track of your reading stack easily.</p>
                <ul>
                    <li>Press Stack on a book you want to read below to add it to your reading stack</li>
                    <li>Bring up other books lists in The Lists Section</li>
                    <li>View books in your reading stack by pressing the number of books in your stack button</li>
                    <li>Mark off books as read and view a full list of books you've read</li>
                </ul>
                <button onClick={this.props.howTo}>Back.</button>
            </section>
        )
    }
}

export default HowTo;