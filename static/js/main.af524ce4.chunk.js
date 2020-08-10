(this["webpackJsonpmegan-rantz-project-5"]=this["webpackJsonpmegan-rantz-project-5"]||[]).push([[0],{24:function(e,t,a){e.exports=a(50)},29:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(23),s=a.n(r),i=(a(29),a(1)),c=a(2),l=a(4),u=a(3),d=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement("nav",null,o.a.createElement("h1",null,"Tsundoku."),o.a.createElement("button",{id:"scrollHere",className:"is".concat(this.props.activeStatus),onClick:this.props.activeChange},o.a.createElement("span",null,this.props.stackSize),o.a.createElement("p",null,"in your stack"),o.a.createElement("h5",null,"Your Stack.")))}}]),a}(n.Component),m=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"headerContent"},o.a.createElement("h2",null,"Manage your reading stack all in one place"),o.a.createElement("button",{onClick:this.props.howTo},"Learn How.")),o.a.createElement("div",{className:"headerImg"},o.a.createElement("img",{src:"./tsunDoka.png",alt:"Line Drawing of a Japanese painting of a woman holding a book"})))}}]),a}(n.Component),h=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement("section",{className:"howTo"},o.a.createElement("h4",null,"How To Get Started with Tsundoku"),o.a.createElement("p",null,"Tsundoku means 'reading pile', and refers to the stack of books in your home that you have yet to read. With Tsundoku you can keep track of your reading stack easily."),o.a.createElement("ul",null,o.a.createElement("li",null,"Press Stack on a book you want to read below to add it to your reading stack"),o.a.createElement("li",null,"Bring up other books lists in The Lists Section"),o.a.createElement("li",null,"View books in your reading stack by pressing the number of books in your stack button"),o.a.createElement("li",null,"Mark off books as read and view a full list of books you've read")),o.a.createElement("button",{onClick:this.props.howTo},"Back."))}}]),a}(n.Component),p=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement("li",{tabIndex:"0",id:this.props.isbn,className:"bestSellerBook"},o.a.createElement("div",null,o.a.createElement("img",{src:this.props.bookImg,alt:"".concat(this.props.title," cover art")}),o.a.createElement("button",{className:"stackButton",onClick:this.props.addToRead},"Stack.")),o.a.createElement("section",null,o.a.createElement("p",null,this.props.descriptions),o.a.createElement("a",{href:this.props.productURL})),o.a.createElement("h6",null,this.props.title),o.a.createElement("span",null,"by ".concat(this.props.author)),o.a.createElement("button",{className:"getDetails",onClick:this.props.getDetails},"Details"))}}]),a}(n.Component),k=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:"bookDetail"},o.a.createElement("div",null,o.a.createElement("h4",null,this.props.title),o.a.createElement("span",null,this.props.author),o.a.createElement("button",{onClick:this.props.backToBestSeller},"Back.")),o.a.createElement("img",{src:"./tsunDoka2.png",alt:"Line Drawing of a Japanese painting of a woman holding a book"}))}}]),a}(n.Component),b=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{id:this.props.dbKey,className:"yourStackBook"},o.a.createElement("div",{className:"cover"},o.a.createElement("img",{src:this.props.bookImg,alt:"".concat(this.props.title," cover art")})),o.a.createElement("div",{className:"details"},o.a.createElement("h6",null,this.props.title),o.a.createElement("span",null,"by ".concat(this.props.author)),o.a.createElement("button",{onClick:this.props.readIt},"Read"),o.a.createElement("button",{onClick:this.props.unstack},"Remove")))}}]),a}(n.Component),f=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{id:this.props.dbKey,className:"yourStackBook"},o.a.createElement("div",{className:"cover"},o.a.createElement("img",{src:this.props.bookImg,alt:"".concat(this.props.title," cover art")})),o.a.createElement("div",{className:"details"},o.a.createElement("h6",null,this.props.title),o.a.createElement("span",null,"by ".concat(this.props.author)),o.a.createElement("span",null,"Finished")))}}]),a}(n.Component),E=a(8),v=a.n(E),g=a(9),y=a.n(g);a(47);y.a.initializeApp({apiKey:"AIzaSyARE04_FaCOjqkdOxfLefMbbgIAG2Jg-dI",authDomain:"tsundoku-stack.firebaseapp.com",databaseURL:"https://tsundoku-stack.firebaseio.com",projectId:"tsundoku-stack",storageBucket:"tsundoku-stack.appspot.com",messagingSenderId:"308210051228",appId:"1:308210051228:web:738aa55ef2dd85b5f56559"});var j=y.a,S=(a(49),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).secondCall=function(t){v()({url:"https://api.nytimes.com/svc/books/v3/lists/".concat(t,".json?api-key=h1My3UlUBaurlTOmJjJ7RJPQJSDlH0lI"),method:"GET",responseType:"json"}).then((function(t){e.setState({subBooksList:t.data.results.books})}))},e.addToRead=function(t,a,n,o){var r={isbn:t,title:a,author:n,url:o},s=j.database().ref("toRead"),i=e.state.toRead.find((function(e){return e.data.isbn===t}));i||(s.push(r),console.log(i))},e.unstack=function(e){j.database().ref("toRead").child(e).remove()},e.getDetails=function(t,a,n,o,r){var s=r;e.setState({getDetail:s}),e.setState({detailedBook:{title:t,author:a,url:n,details:o}})},e.backToBestSeller=function(){e.setState({getDetail:""})},e.readIt=function(t){var a=e.state.toRead,n=e.state.finishedBooks,o=j.database().ref("toRead"),r=j.database().ref("finishedBooks"),s=a.find((function(e){return e.data.isbn===t}));r.push(s.data),o.child(s.key).remove(),e.setState({finishedBooks:n})},e.activeChange=function(){var t=e.state.active;e.setState({active:!t})},e.howTo=function(){var t=e.state.how;e.setState({how:!t})},e.state={bestSellers:[],detailedBook:{},getDetail:"",subBooksList:[],toRead:[],finishedBooks:[],active:!1,how:!1},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;v()({url:"https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=h1My3UlUBaurlTOmJjJ7RJPQJSDlH0lI",method:"GET",responseType:"json"}).then((function(t){e.setState({bestSellers:t.data.results.books})})),j.database().ref("toRead").on("value",(function(t){var a=t.val(),n=[];for(var o in a)n.push({key:o,data:a[o]});e.setState({toRead:n})})),j.database().ref("finishedBooks").on("value",(function(t){var a=t.val(),n=[];for(var o in a)n.push({key:o,data:a[o]});e.setState({finishedBooks:n})})),this.secondCall("hardcover-nonfiction")}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"app"},o.a.createElement(d,{activeStatus:this.state.active,stackSize:"".concat(this.state.toRead.length,"."),activeChange:function(){return e.activeChange()}}),o.a.createElement("header",null,this.state.how?o.a.createElement(h,{howTo:function(){return e.howTo()}}):o.a.createElement(m,{howTo:function(){return e.howTo()}})),o.a.createElement("aside",{className:"is".concat(this.state.active)},o.a.createElement("ul",{className:"yourStackParent"},this.state.toRead.map((function(t){return o.a.createElement(b,{key:t.key,bookImg:t.data.url,title:t.data.title,author:t.data.author,unstack:function(){return e.unstack(t.key)},readIt:function(){return e.readIt(t.data.isbn)}})}))),o.a.createElement("ul",{className:"yourStackParent"},this.state.finishedBooks.map((function(e){return o.a.createElement(f,{key:e.key,bookImg:e.data.url,title:e.data.title,author:e.data.author})})))),o.a.createElement("main",{className:"is".concat(this.state.active)},o.a.createElement("h3",null,"Trending."),o.a.createElement("ul",{className:"bestSellers"},"bestseller"===this.state.getDetail?o.a.createElement(k,{title:this.state.getDetail.title,backToBestSeller:function(){return e.backToBestSeller()}}):this.state.bestSellers.map((function(t){return o.a.createElement(p,{key:t.primary_isbn13,bookImg:t.book_image,title:t.title,author:t.author,description:t.description,productURL:t.amazon_product_url,addToRead:function(){return e.addToRead(t.primary_isbn13,t.title,t.author,t.book_image)},getDetails:function(){return e.getDetails(t.title,t.author,t.book_image,t.description,"bestseller")}})}))),o.a.createElement("h3",null,"The Lists."),o.a.createElement("div",{className:"subBookListNames"},o.a.createElement("button",{onClick:function(){return e.secondCall("hardcover-nonfiction")}},"Non-Fiction"),o.a.createElement("button",{onClick:function(){return e.secondCall("young-adult")}},"Young Adult"),o.a.createElement("button",{onClick:function(){return e.secondCall("hardcover-graphic-books")}},"Graphic Novels"),o.a.createElement("button",{onClick:function(){return e.secondCall("food-and-fitness")}},"Food and Fitness"),o.a.createElement("button",{onClick:function(){return e.secondCall("travel")}},"Travel"),o.a.createElement("button",{onClick:function(){return e.secondCall("education")}},"Education"),o.a.createElement("button",{onClick:function(){return e.secondCall("science")}},"Science")),o.a.createElement("ul",{className:"bestSellers"},"theLists"===this.state.getDetail?o.a.createElement(k,{title:this.state.detailedBook.title,backToBestSeller:function(){return e.backToBestSeller()}}):this.state.subBooksList.map((function(t){return o.a.createElement(p,{key:t.primary_isbn13,bookImg:t.book_image,title:t.title,author:t.author,description:t.description,productURL:t.amazon_product_url,addToRead:function(){return e.addToRead(t.primary_isbn13,t.title,t.author,t.book_image)},getDetails:function(){return e.getDetails(t.title,t.author,t.book_image,t.description,"theLists")}})}))),o.a.createElement("p",{className:"final"},"Copyright 2020 Megan Rantz")),o.a.createElement("button",{className:"pageUp"},o.a.createElement("a",{href:"scrollHere"},"Top.")))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.af524ce4.chunk.js.map