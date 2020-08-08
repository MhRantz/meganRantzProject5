import React, { Component } from 'react';

class BestSeller extends Component {
    render() {
        return (
            <div className="bestSellerBook">
                <div>
                    <img src={this.props.bookImg} alt={`${this.props.title} cover art`} />
                    <button onClick={this.props.addToRead}>Stack</button>
                </div>
                <h6>{this.props.title}</h6>
                <span>{`by ${this.props.author}`}</span>
            </div>//end of bestSellerBook
        )
    }
}

export default BestSeller;