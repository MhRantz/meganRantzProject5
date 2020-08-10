import React, { Component } from 'react';

class BookDetails extends Component {
    render() {
        return (
            <div className="bookDetail">
                <div>
                    <h4>{this.props.title}</h4>
                    <span>{this.props.author}</span>

                    <button onClick={this.props.backToBestSeller}>Back.</button>
                </div>
                <img src="./tsunDoka2.png" alt="Line Drawing of a Japanese painting of a woman holding a book" />
            </div>
        )
    }
}

export default BookDetails;