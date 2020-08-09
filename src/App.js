import React, { Component } from 'react';
import Nav from './Nav';
import Header from './Header';
import BestSeller from './BestSeller';
import YourStack from './YourStack';
import FinishedStack from './FinishedStack';
import axios from 'axios';
import firebase from './firebase';
import './App.scss';


class App extends Component {
  /////////////////////////////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  //THE STATE
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  /////////////////////////////////////////////////////////////////////
  constructor() {
    super();
    this.state = {
      bestSellers: [],
      subBooksList: [],
      toRead: [],
      finishedBooks: [],
      active: false
    }
  }
  /////////////////////////////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  //THE FUNCTIONS
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
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
    //Firebase Set up For Books That Have Finished Being Read
    const dbRefFinishedBooks = firebase.database().ref('finishedBooks');
    dbRefFinishedBooks.on('value', (snapshot) => {
      const data = snapshot.val();
      const updateFinishedBooks = [];
      for (let key in data) {
        updateFinishedBooks.push({ key: key, data: data[key] })
      }
      this.setState({
        finishedBooks: updateFinishedBooks
      })
    })

    this.secondCall("hardcover-nonfiction");
  }

  ///Second Api Call for the other lists from NY Times - button bank supplying keyword list name
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
    const copyToRead = this.state.toRead;
    //Looking to see if the Stacked book will be a duplicate in the array of books in stack, and only pushing if not found
    let findBook = copyToRead.find(book => book.data.isbn === isbn)
    if (!findBook) {
      dbRefToRead.push(book);
      console.log(findBook);
    }
  }

  ///When Remove is pressed on a stacked book remove it from the database list of stacked books
  unstack = (dbKey) => {
    const dbRefToRead = firebase.database().ref('toRead');
    dbRefToRead.child(dbKey).remove();
  }

  //
  readIt = (isbn) => {
    const copyToRead = this.state.toRead;
    const copyFinishedBooks = this.state.finishedBooks;
    const dbRefToRead = firebase.database().ref('toRead');
    const dbRefFinished = firebase.database().ref('finishedBooks');
    //finding the full book object in the current array, then pushing it to Finished Books, removing it from toRead on DB and pushing it to Finished
    let book = copyToRead.find(book => book.data.isbn === isbn)
    dbRefFinished.push(book.data);
    dbRefToRead.child(book.key).remove();
    this.setState(
      { finishedBooks: copyFinishedBooks }
    )
  }

  //changing the activation of the your stack window to control spacing on page
  activeChange = () => {
    const currentActive = this.state.active;
    this.setState(
      { active: !currentActive }
    )
  }
  /////////////////////////////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  //THE RENDER
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  /////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="app">

        <Nav
          activeStatus={this.state.active}
          stackSize={`${this.state.toRead.length}.`}
          activeChange={() => this.activeChange()}
        />

        <header>
          <Header />
        </header>

        <aside className={`is${this.state.active}`}>
          <ul className="yourStackParent">
            {/*Throw your saved books stack onto the page if Div is opened*/
              this.state.toRead.map((book) => {
                return <YourStack
                  key={book.key}
                  bookImg={book.data.url}
                  title={book.data.title}
                  author={book.data.author}
                  unstack={() => this.unstack(book.key)}
                  readIt={() => this.readIt(book.data.isbn)}
                /> //End of Your Stack JSX
              })
            }
          </ul>

          <ul className="yourStackParent">
            {/*Throw your already read/finished books stack onto the page if Div is opened and Finished button is pressed*/
              this.state.finishedBooks.map((book) => {
                return <FinishedStack
                  key={book.key}
                  bookImg={book.data.url}
                  title={book.data.title}
                  author={book.data.author}
                /> //End of Your Stack JSX
              })
            }
          </ul>
        </aside>

        <section className={`is${this.state.active}`}>
          <h3>Trending.</h3>
          <ul className="bestSellers">
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
          </ul>

          <h3>The Lists.</h3>

          <div className="subBookListNames">
            <button onClick={() => this.secondCall("hardcover-nonfiction")}>Non-Fiction</button>
            <button onClick={() => this.secondCall("young-adult")}>Young Adult</button>
            <button onClick={() => this.secondCall("hardcover-graphic-books")}>Graphic Novels</button>
            <button onClick={() => this.secondCall("food-and-fitness")}>Food and Fitness</button>
            <button onClick={() => this.secondCall("travel")}>Travel</button>
            <button onClick={() => this.secondCall("education")}>Education</button>
            <button onClick={() => this.secondCall("science")}>Science</button>
          </div>

          <ul className="bestSellers">
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
          </ul>
          <p className="final">Copyright 2020 Megan Rantz</p>
        </section>

        <button className="pageUp"><a href="scrollHere">Top.</a></button>

      </div>
    );
  }
}


export default App;


//Stretch 
//--be able to mark a book on the list as read, rate it
//--pretty with nice animations
//--return a longer description of the books
//-- and find a way to have the book take up more space in the grid dynamically to read the details