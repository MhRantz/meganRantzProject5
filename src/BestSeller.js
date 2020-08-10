import React, { Component } from 'react';

class BestSeller extends Component {
    render() {
        return (
            <li tabIndex="0" id={this.props.isbn} className="bestSellerBook">
                <div>
                    <img src={this.props.bookImg} alt={`${this.props.title} cover art`} />
                    <button className="stackButton" onClick={this.props.addToRead}>Stack.</button>
                </div>
                <section>
                    <p>{this.props.descriptions}</p>
                    <a href={this.props.productURL}></a>
                </section>
                <h6>{this.props.title}</h6>
                <span>{`by ${this.props.author}`}</span>
                <button className="getDetails" onClick={this.props.getDetails}>Details</button>
            </li>//end of bestSellerBook
        )
    }
}

export default BestSeller;