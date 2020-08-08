import React, { Component } from 'react';

class YourStack extends Component {
    render() {
        return (
            <div id={this.props.dbKey} className="yourStackBook">
                <div className="cover">
                    <img src={this.props.bookImg} alt={`${this.props.title} cover art`} />
                </div>
                <div className="details">
                    <h6>{this.props.title}</h6>
                    <span>{`by ${this.props.author}`}</span>
                    <button onClick={this.props.unstack}>Remove</button>
                </div>
            </div>
        )
    }
}

export default YourStack;