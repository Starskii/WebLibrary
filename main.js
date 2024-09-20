const myLibrary = [];

function Book(title, author, pages, hasRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function(){
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead ? "has been read." : "has not been read yet."}`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const myBook = new Book("a", "a", 100, false);
addBookToLibrary(myBook);
console.log(myLibrary);