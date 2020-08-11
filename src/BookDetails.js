import React, { Component } from 'react';
import tsunDoka2 from './assets/tsunDoka2.png';

class BookDetails extends Component {
    render() {
        return (
            <div className="bookDetailParent">
                <div className="bookDetailContents bestSellerBook">
                    <div>
                        <img src={this.props.url} alt={`${this.props.title} cover art`} />
                        <button className="stackButton" onClick={this.props.addToRead}>Stack.</button>
                    </div>
                    <div>
                        <h4>{this.props.title}</h4>
                        <span>{this.props.author}</span>
                        <p>{this.props.description}</p>
                        <button onClick={this.props.backToBestSeller}>Back.</button>
                    </div>
                    
                </div>
                <img className="tSun" src={tsunDoka2} alt="Line Drawing of a Japanese painting of a woman holding a book" /> 
            </div>
        )
    }
}

export default BookDetails;