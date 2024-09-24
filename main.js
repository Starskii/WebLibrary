const myLibrary = [];

const addBookBtn = document.getElementById("add-book");
const exitModalBtn = document.getElementById("exit-button");
const cancelModalBtn = document.getElementById("cancel-button");
const saveModalBtn = document.getElementById("save-button");
const contentContainer = document.querySelector(".content-container");

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

function onSaveButtonPressed(e){
    const title = document.getElementById("title-input");
    const author = document.getElementById("author-input");
    const pageCount = document.getElementById("pages-input");
    const hasRead = document.getElementById("read-input");

    const newBook = new Book(title.value, author.value, pageCount.value, hasRead.checked);
    createBookHTML(newBook);
}

function createBookHTML(book){
    const bookCard = document.createElement('div');
    bookCard.className = "book-card";

    const bookTitle = document.createElement('div');
    bookTitle.className = "book-title";
    bookTitle.innerText = book.title;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement('div');
    bookAuthor.className = "book-author";
    bookAuthor.innerText = book.author;
    bookCard.appendChild(bookAuthor);

    const bookPages = document.createElement('div');
    bookPages.className = "book-page-count";
    bookPages.innerText = book.pages;
    bookCard.appendChild(bookPages);

    const bookHasRead = document.createElement('div');
    bookHasRead.className = "book-has-read";
    bookHasRead.innerText = book.hasRead;
    bookCard.appendChild(bookHasRead);

    contentContainer.appendChild(bookCard);
}

addBookBtn.addEventListener("click", onAddBookButtonPressed);
exitModalBtn.addEventListener("click", onCancelButtonPressed);
cancelModalBtn.addEventListener("click", onCancelButtonPressed);
saveModalBtn.addEventListener("click", onSaveButtonPressed);

const myBook = new Book("a", "a", 100, false);
addBookToLibrary(myBook);
console.log(myLibrary);