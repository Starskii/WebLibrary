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
    createBookHTML(book);
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
    addBookToLibrary(newBook);
    clearInputModal();
    onCancelButtonPressed();
}

function clearInputModal(){
    const title = document.getElementById("title-input");
    const author = document.getElementById("author-input");
    const pageCount = document.getElementById("pages-input");
    const hasRead = document.getElementById("read-input");

    title.value = "";
    author.value = "";
    pageCount.value = null;
    hasRead.checked = false;
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

function createSampleBooks(){
    sampleTitles = [
        "How I Met Your Mother",
        "I Will Walk 500 Miles",
        "Getting Yoked"
    ]
    sampleAuthors = [
        "Bernie Sanders",
        "Robert Plant",
        "Abroham Lincoln"
    ]
    samplePages = [
        248,
        355,
        859
    ]
    sampleRead = [
        true,
        false,
        true
    ]

    for(let i = 0; i < 3; i++){
        const book = new Book(
            sampleTitles[i], 
            sampleAuthors[i], 
            samplePages[i], 
            sampleRead[i]
        );
        addBookToLibrary(book);
    }
}

addBookBtn.addEventListener("click", onAddBookButtonPressed);
exitModalBtn.addEventListener("click", onCancelButtonPressed);
cancelModalBtn.addEventListener("click", onCancelButtonPressed);
saveModalBtn.addEventListener("click", onSaveButtonPressed);

createSampleBooks();