import React, { Component } from 'react';
import Nav from './Nav';
import Header from './Header';
import BestSeller from './BestSeller';
import YourStack from './YourStack';
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
      subBooksList: [],
      toRead: [],
      active: false
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
      });
    //Firebase Set up For Books Still To Be Read
    const dbRefToRead = firebase.database().ref('toRead');
    dbRefToRead.on('value', (snapshot) => {
      const data = snapshot.val();
      const updateToRead = [];
      for (let key in data) {
        updateToRead.push({ key: key, data: data[key] })
      }
      this.setState({
        toRead: updateToRead
      })
    })
    this.secondCall("hardcover-nonfiction");
  }

  secondCall = (keyword) => {
    axios({
      url: `https://api.nytimes.com/svc/books/v3/lists/${keyword}.json?api-key=h1My3UlUBaurlTOmJjJ7RJPQJSDlH0lI`,
      method: `GET`,
      responseType: `json`,
    })
      .then((response) => {
        this.setState({
          subBooksList: response.data.results.books
        })
      });
  }

  ///When Stack is pressed on book, add it to the database list of your stacked books to read
  addToRead = (isbn, title, author, url) => {
    const book = {
      isbn: isbn,
      title: title,
      author: author,
      url: url
    }
    const dbRefToRead = firebase.database().ref('toRead');
    dbRefToRead.push(book);
  }

  ///When Remove is pressed on a stacked book remove it from the database list of stacked books
  unstack = (dbKey) => {
    const dbRefToRead = firebase.database().ref('toRead');
    dbRefToRead.child(dbKey).remove();
  }

  //changing the activation of the your stack window to control spacing on page
  activeChange = () => {
    const currentActive = this.state.active;
    this.setState(
      { active: !currentActive }
    )
  }
  /////////////////////////////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~THE RENDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  /////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="app">
        <Nav
          activeStatus={this.state.active}
          stackSize={this.state.toRead.length}
          activeChange={() => this.activeChange()}
        />
        <header>
          <Header />
        </header>
        <aside className={`is${this.state.active}`}>
          <div className="yourStackParent">

            {/*Throw your saved books stack onto the page if Div is opened*/
              this.state.toRead.map((book) => {
                return <YourStack
                  key={book.key}
                  bookImg={book.data.url}
                  title={book.data.title}
                  author={book.data.author}
                  unstack={() => this.unstack(book.key)}
                /> //End of Your Stack JSX
              })
            }
          </div>
        </aside>
        <section className={`is${this.state.active}`}>
          <h3>Trending.</h3>
          <div className="bestSellers">
            {/*New Times Best Sellers Results from API call, mapping to show each book on grid*/
              this.state.bestSellers.map((book) => {
                return <BestSeller
                  key={book.primary_isbn13}
                  bookImg={book.book_image}
                  title={book.title}
                  author={book.author}
                  addToRead={() => this.addToRead(book.primary_isbn13, book.title, book.author, book.book_image)}
                /> //End of New York Times Best Sellers JSX
              })
            }
          </div>
          <h3>The Lists.</h3>
          <div className="subBookListNames">
            <button onClick={() => this.secondCall("hardcover-nonfiction")}>Non-Fiction</button>
            <button onClick={() => this.secondCall("young-adult")}>Young Adult</button>
            <button onClick={() => this.secondCall("education")}>Education</button>
            <button onClick={() => this.secondCall("food-and-fitness")}>Food and Fitness</button>
            <button onClick={() => this.secondCall("science")}>Science</button>
          </div>
          <div className="bestSellers">
            {
              this.state.subBooksList.map((book) => {
                return <BestSeller
                  key={book.primary_isbn13}
                  bookImg={book.book_image}
                  title={book.title}
                  author={book.author}
                  addToRead={() => this.addToRead(book.primary_isbn13, book.title, book.author, book.book_image)}
                /> //End of New York Times Best Sellers JSX
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

// and push the book to the to-read-array and .map it into a different component
///--inside the list have the option to remove a book from the to-read-array 

//Stretch 
//--Find ways to add more books
//--be able to mark a book on the list as read, rate it
//--pretty with nice animations
//--firebase keep the to-read-list and those that have been read and their reviews
//--return a longer description of the books
//-- and find a way to have the book take up more space in the grid dynamically to read the details