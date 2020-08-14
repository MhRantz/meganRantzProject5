import React, { Component } from 'react';
import Nav from './Nav';
import Header from './Header';
import HowTo from './HowTo';
import BestSeller from './BestSeller';
import BookDetails from './BookDetails';
import YourStack from './YourStack';
import FinishedStack from './FinishedStack';
import listNames from './extra.js';
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
      detailedBook: {},
      getDetail: '',
      subBooksList: [],
      toRead: [],
      finishedBooks: [],
      active: false,
      how: false,
      whichStack: true
    }
  }
  /////////////////////////////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  //THE FUNCTIONS
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  /////////////////////////////////////////////////////////////////////

  componentDidMount() {
    // Call API for NY times best seller books and exchange data with firebase lists
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

    //Firebase Set up For Books in FinishedBooks
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

    //Firebase Set up For Books in Your Stack
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
    //Calling the second API call to fill the second grid when component mounts with default selection
    this.secondCall("hardcover-nonfiction");
  }///////////END OF COMPONENT DID MOUNT

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
    const copyFinishedBooks = this.state.finishedBooks;

    //Looking to see if the Stacked book will be a duplicate in the array of books in stack, and only pushing if not found
    let findBook = copyToRead.find(book => book.data.isbn === isbn)
    if (!findBook) {
      let findBookHere = copyFinishedBooks.find(book => book.data.isbn === isbn)
      if (!findBookHere) {
        dbRefToRead.push(book);
      }
    }
  }

  ///When Remove is pressed on a stacked book remove it from the database list of stacked books
  unstack = (dbKey) => {
    const dbRefToRead = firebase.database().ref('toRead');
    dbRefToRead.child(dbKey).remove();
  }

  //Showing the details page with the book description for a selected book, 
  //setting the state with the details of the selected book since the event isn't on the whole object
  getDetails = (title, author, url, description, area) => {
    this.setState(
      { getDetail: area }
    )
    this.setState(
      {
        detailedBook: {
          title: title,
          author: author,
          url: url,
          description: description
        }
      }
    )
    //Scroll to the top of the correct details location
    if (area === 'bestseller') {
      const topElement = document.getElementById('bestSellers');
      topElement.scrollIntoView({ behavior: "smooth" });
    } else {
      const bottomElement = document.getElementById('theLists');
      bottomElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  //Get back from details to main book lists
  backToBestSeller = () => {
    this.setState(
      { getDetail: '' }
    )
  }

  //On click of "Read" change status of the book from in stack to the finished books list
  readIt = (isbn) => {
    const copyToRead = this.state.toRead;
    const copyFinishedBooks = [...this.state.finishedBooks];
    const dbRefToRead = firebase.database().ref('toRead');
    const dbRefFinished = firebase.database().ref('finishedBooks');
    //finding the full book object in the current array, then pushing it to Finished Books, removing it from toRead on DB and pushing it to Finished
    let book = copyToRead.find(book => book.data.isbn === isbn)
    dbRefFinished.push(book.data);
    dbRefToRead.child(book.key).remove();

    copyFinishedBooks.push(book);

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

  //Toggle from main header to the how to menu and back 
  howTo = () => {
    const copyHow = this.state.how
    this.setState(
      { how: !copyHow }
    )
  }

  //Scroll to top function so that the page doesn't reset
  scrollFun = (here) => {
    const stack = document.getElementById('scrollHere');
    stack.scrollIntoView({ behavior: "smooth" });
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

        <header>{//based on click of the learn more button/ back render main header or the how to window
          this.state.how
            ? <HowTo howTo={() => this.howTo()} />
            : <Header howTo={() => this.howTo()} />
        }</header>


        <aside className={`is${this.state.active}`}>
          <div className="whichStack" >
            <button onClick={() => this.setState({ whichStack: true })}>Stack</button>
            <button onClick={() => this.setState({ whichStack: false })}>Finished</button>
          </div>
          {///based on button selection of either your book stack or your finished books map the corresponding list to the page
            !this.state.whichStack
              ? <ul className="yourStackParent">
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
              : this.state.toRead.length > 0
                //if your stack has at least one book, display the books 
                ? <ul className="yourStackParent">
                  <p>So far you've finished <span>{this.state.finishedBooks.length}</span> books</p>
                  {//mapping to read stack onto the page 
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
                  }</ul>//v display that stack is empty if length of array is 0 
                : <div className="stackEmpty"><p>Your list is empty. Stack some books to read.</p>
                  <p>So far you've finished <span>{this.state.finishedBooks.length}</span> books</p></div>

          }



        </aside>

        <main className={`is${this.state.active}`}>
          <h3 id="bestSellers">Trending.</h3>
          <ul className="bestSellers">
            {/*New Times Best Sellers Results from API call, mapping to show each book on grid*/
              this.state.getDetail === 'bestseller'
                ? <BookDetails
                  url={this.state.detailedBook.url}
                  title={this.state.detailedBook.title}
                  author={this.state.detailedBook.author}
                  description={this.state.detailedBook.description}
                  backToBestSeller={() => this.backToBestSeller()}
                />
                : this.state.bestSellers.map((book) => {
                  return <BestSeller
                    key={book.primary_isbn13}
                    bookImg={book.book_image}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    productURL={book.amazon_product_url}
                    addToRead={() => this.addToRead(book.primary_isbn13, book.title, book.author, book.book_image)}
                    getDetails={() => this.getDetails(book.title, book.author, book.book_image, book.description, 'bestseller')}
                  /> //End of New York Times Best Sellers JSX
                })
            }
          </ul>

          <h3>The Lists.</h3>

          <div className="subBookListNames">
            {
              listNames.map((list, index) => {
                return <button onClick={() => this.secondCall(list.query)} key={index}>{list.name}</button>
              })
            }
          </div>

          <ul id="theLists" className="bestSellers">
            {
              this.state.getDetail === 'theLists'
                ? <BookDetails
                  url={this.state.detailedBook.url}
                  title={this.state.detailedBook.title}
                  author={this.state.detailedBook.author}
                  description={this.state.detailedBook.description}
                  backToBestSeller={() => this.backToBestSeller()}
                />
                : this.state.subBooksList.map((book) => {
                  return <BestSeller
                    key={book.primary_isbn13}
                    bookImg={book.book_image}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    productURL={book.amazon_product_url}
                    addToRead={() => this.addToRead(book.primary_isbn13, book.title, book.author, book.book_image)}
                    getDetails={() => this.getDetails(book.title, book.author, book.book_image, book.description, 'theLists')}
                  /> //End of New York Times Best Sellers JSX
                })
            }
          </ul>

          <p className="final">Copyright 2020 Megan Rantz</p>
        </main>

        <button className="pageUp" onClick={this.scrollFun}><a>Top.</a></button>

      </div>
    );
  }
}


export default App;