import { getBooks, postBook } from "./LibrairianService.js";

function attachFormListeners() {
  const formElement = document.getElementById("userForm");
  const titleInputElement = document.getElementById("Title");
  const authorInputElement = document.getElementById("Author");
  const companyInputElement = document.getElementById("PrintCompany");

  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInputElement.value.trim();
    const author = authorInputElement.value.trim();
    const company = companyInputElement.value.trim();

    try {
      const booksArray = await getBooks();
      const nextId = booksArray.length;

      await postBook( title, nextId, author, company);


      titleInputElement.value = "";
      authorInputElement.value = "";
      companyInputElement.value = "";

      await renderAllBooks();
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  });
}

async function renderAllBooks() {
  const bookListelement = document.getElementById("availablebooks");
  bookListelement.replaceChildren();

  const bookLabelElement = document.createElement("div");
  bookLabelElement.textContent = "Available Books:";
  bookListelement.appendChild(bookLabelElement);

  try {
    const books = await getBooks();
    forEachRenderBooks(books, bookListelement);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function forEachRenderBooks(books, bookListelement) {
  books.forEach((book) => {
    const bookCardElement = document.createElement("div");
    const linkElement = document.createElement("span");

    linkElement.textContent = `${book.title} - By: ${book.author}`;
    bookCardElement.appendChild(linkElement);
    bookListelement.appendChild(bookCardElement);
  });
}

attachFormListeners();
renderAllBooks();

