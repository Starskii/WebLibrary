const myLibrary = [];

const modal = document.querySelector(".book-input-modal");

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

function onAddBookButtonPressed(e){
     modal.classList.remove("hidden");
}

function onCancelButtonPressed(e){
    modal.classList.add("hidden"); 
}

const addBookBtn = document.getElementById("add-book");
const exitModalBtn = document.getElementById("exit-button");
const cancelModalBtn = document.getElementById("cancel-button");
addBookBtn.addEventListener("click", onAddBookButtonPressed);
exitModalBtn.addEventListener("click", onCancelButtonPressed);
cancelModalBtn.addEventListener("click", onCancelButtonPressed);

const myBook = new Book("a", "a", 100, false);
addBookToLibrary(myBook);
console.log(myLibrary);