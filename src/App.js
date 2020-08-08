import React, { Component } from 'react';
import BestSeller from './BestSeller';
import axios from 'axios';
import firebase from './firebase';
import './App.scss';

/////////////////////////////////////////////////////////////////////
//~~~~~~~~~~~~~~~~~~~~~THE STATE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/////////////////////////////////////////////////////////////////////
class App extends Component {
  constructor() {
    super();
    this.state = {
      bestSellers: [],
      toRead: []
    }
  }
  /////////////////////////////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~THE FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  /////////////////////////////////////////////////////////////////////
  // Call API for NY times best sells and exchange data with firebase lists
  componentDidMount() {
    axios({
      url: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=h1My3UlUBaurlTOmJjJ7RJPQJSDlH0lI`,
      method: `GET`,
      responseType: `json`,
    })
      .then((response) => {
        this.setState({
          bestSellers: response.data.results.books
        })
        console.log(this.state.bestSellers);
      });
    //FIREBASE SET UP
    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const updateToRead = [];
      for (let bookObj in data) {
        updateToRead.push(data[bookObj])
      }
      this.setState({
        toRead: updateToRead
      })
    })
  }

  addToRead = (title, author, url) => {
    const book = {
      title: title,
      author: author,
      url: url
    }
    console.log(book);
  }

  /////////////////////////////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~THE RENDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  /////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="app">
        <h1>Tsundoku.</h1>

        <section >
          <h2>Best Sellers</h2>
          {/*New Times Best Sellers Results from API call, mapping to show each book on grid*/}
          <div className="bestSellers">
            {
              this.state.bestSellers.map((book, index) => {
                return <BestSeller
                  key={index}
                  bookImg={book.book_image}
                  title={book.title}
                  author={book.author}
                  addToRead={() => this.addToRead(book.title, book.author, book.book_image)}
                />
              })
            }
          </div>
        </section>
      </div>
    );
  }
}


export default App;

//MVP have a short list of books to select from to choose a reading list

///--have button to add to reading list watch for button press 
// and push the book to the to-read-array and .map it into a different component
///--inside the list have the option to remove a book from the to-read-array 

//Stretch 
//--Find ways to add more books
//--be able to mark a book on the list as read, rate it
//--pretty with nice animations
//--firebase keep the to-read-list and those that have been read and their reviews
//--return a longer description of the books
//-- and find a way to have the book take up more space in the grid dynamically to read the details