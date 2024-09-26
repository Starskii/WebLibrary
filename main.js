const myLibrary = [];

const addBookBtn = document.getElementById("add-book");
const exitModalBtn = document.getElementById("exit-button");
const cancelModalBtn = document.getElementById("cancel-button");
const saveModalBtn = document.getElementById("save-button");
const contentContainer = document.querySelector(".content-container");
const modalInputs = document.querySelectorAll(
  "#title-input, " + "#author-input, " + "#pages-input, " + "#read-input"
);

let editFlag = false;
let editIndex = null;

const modal = document.querySelector(".book-input-modal");

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }

  info() {
    return `The ${this.title} by ${this.author}, ${this.pages} pages, ${
      this.hasRead ? "has been read." : "has not been read yet."
    }`;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateLibraryUI();
}

function removeBookFromLibrary(e) {
  const index = Number.parseInt(e.target.dataset.bookIndex);
  myLibrary.splice(index, 1);
  updateLibraryUI();
}

function updateBookFromLibrary(book) {
  myLibrary[editIndex] = book;
  updateLibraryUI();
}

function createBookHTML(book, index) {
  const formattedTitle = `"${book.title}"`;
  const formattedAuthor = `By ${book.author}`;
  const formattedPageCount = `Totalling ${book.pages} pages`;
  const formattedHasRead = `${book.hasRead ? "Read" : "Unread"}`;

  const bookCard = document.createElement("div");
  bookCard.className = "book-card";

  const bookTitle = document.createElement("div");
  bookTitle.className = "book-title";
  bookTitle.innerText = formattedTitle;
  bookCard.appendChild(bookTitle);

  const bookAuthor = document.createElement("div");
  bookAuthor.className = "book-author";
  bookAuthor.innerText = formattedAuthor;
  bookCard.appendChild(bookAuthor);

  const bookPages = document.createElement("div");
  bookPages.className = "book-page-count";
  bookPages.innerText = formattedPageCount;
  bookCard.appendChild(bookPages);

  const bookHasRead = document.createElement("div");
  bookHasRead.className = "book-has-read";
  bookHasRead.innerText = formattedHasRead;
  bookCard.appendChild(bookHasRead);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const editButton = document.createElement("button");
  editButton.innerHTML = "EDIT";
  editButton.setAttribute("data-book-index", index);
  editButton.addEventListener("click", onEditButtonPressed);
  buttonContainer.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "DELETE";
  deleteButton.setAttribute("data-book-index", index);
  deleteButton.addEventListener("click", removeBookFromLibrary);
  buttonContainer.appendChild(deleteButton);

  bookCard.appendChild(buttonContainer);
  return bookCard;
}

function updateLibraryUI() {
  const bookContentFragment = document.createDocumentFragment();
  myLibrary.forEach((book, index) => {
    bookContentFragment.appendChild(createBookHTML(book, index));
  });

  contentContainer.innerHTML = "";
  contentContainer.appendChild(bookContentFragment);
}

function onAddBookButtonPressed() {
  modal.classList.remove("hidden");
}

function onCancelButtonPressed() {
  modal.classList.add("hidden");
  clearInputModal();
  resetEditVariables();
}

function onEditButtonPressed(e) {
  editFlag = true;
  editIndex = Number.parseInt(e.target.dataset.bookIndex);
  modalInputs[0].value = myLibrary[editIndex].title;
  modalInputs[1].value = myLibrary[editIndex].author;
  modalInputs[2].value = myLibrary[editIndex].pages;
  modalInputs[3].checked = myLibrary[editIndex].hasRead;

  modal.classList.remove("hidden");
}

function resetEditVariables() {
  editFlag = false;
  editIndex = null;
}

function onSaveButtonPressed() {
  const title = modalInputs[0];
  const author = modalInputs[1];
  const pageCount = modalInputs[2];
  const hasRead = modalInputs[3];

  const newBook = new Book(
    title.value,
    author.value,
    pageCount.value,
    hasRead.checked
  );
  editFlag ? updateBookFromLibrary(newBook) : addBookToLibrary(newBook);
  clearInputModal();
  onCancelButtonPressed();
}

function clearInputModal() {
  modalInputs.forEach((input) => {
    input.type === "checkbox" ? (input.checked = false) : (input.value = "");
  });
}

function createSampleBooks() {
  const sampleTitles = [
    "How I Met Your Mother",
    "I Will Walk 500 Miles",
    "Getting Yoked",
  ];
  const sampleAuthors = ["Bernie Sanders", "Robert Plant", "Abroham Lincoln"];
  const samplePages = [248, 355, 859];
  const sampleRead = [true, false, true];

  for (let i = 0; i < 3; i++) {
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
