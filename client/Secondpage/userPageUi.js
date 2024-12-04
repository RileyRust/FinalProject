import { getBooks, sendBookToApi, CheckedBy } from "./userPageService.js";

const username = localStorage.getItem("username");

async function renderAllBooks() {
  const bookListelement = document.getElementById("avaialableBooksElement");
  const allBooks = await getBooks();
  bookListelement.replaceChildren();
  const headerElement = document.createElement("h3");
  const headerDiv = document.createElement("div"); 
  headerDiv.appendChild(headerElement); 
  headerElement.textContent = "Available Books";
  bookListelement.appendChild(headerElement);
  const grandParentElement = document.createElement("div")
  grandParentElement.classList.add("grandparent")

  for (const book of allBooks) {
    if (book.checkedBy === null) {
      const ImageElement = document.createElement("img");
      ImageElement.src = book.cover;
      const ImageDiv = document.createElement("div");
      ImageDiv.appendChild(ImageElement);
      ImageDiv.classList.add("imageDiv");
      const checkButtonElement = document.createElement("button");
      checkButtonElement.textContent = "Check Out";
      checkButtonElement.classList.add("checkButton");

      const bookelement = document.createElement("form");
      bookelement.classList.add("cards");

      const titleElement = document.createElement("p");
      titleElement.textContent = "Title: " + book.title;
      titleElement.classList.add("title");

      const authorElement = document.createElement("p");
      authorElement.textContent = " Author: " + book.author;
      authorElement.classList.add("author");

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = "Description: " + book.description;
      descriptionElement.classList.add("description");

      const pairElement = document.createElement("div");
      pairElement.classList.add("parent");

      const cardElement = document.createElement("div");
      cardElement.classList.add("cardElement");

      bookelement.appendChild(titleElement);
      bookelement.appendChild(authorElement);
      bookelement.appendChild(descriptionElement);
      cardElement.appendChild(bookelement);

      pairElement.appendChild(ImageDiv);
      pairElement.appendChild(cardElement);
      grandParentElement.appendChild(pairElement);
      bookelement.appendChild(checkButtonElement);
      
      bookelement.addEventListener("submit", async (e) => {
        const username = localStorage.getItem("username");
        e.preventDefault();
        await CheckedBy(book.id, username);
        await renderAllBooks();
        await renderAllCheckBooks();
      });
    }
    bookListelement.appendChild(grandParentElement);
  }
}


async function renderAllCheckBooks() {
  const bookListelement = document.getElementById("checkOutElement");
  const allBooks = await getBooks();
  bookListelement.replaceChildren();
  const headerElement = document.createElement("h3");
  headerElement.textContent = "Checkout Books";
  bookListelement.appendChild(headerElement);
  for (const book of allBooks) {
    if (book.checkedBy === username) {
      const bookelement = document.createElement("div");
      bookelement.textContent =
        "Title: " +
        book.title +
        " Author: " +
        book.author +
        "Description: " +
        book.description;
      bookListelement.appendChild(bookelement);
    }
  }
}
renderAllCheckBooks();
renderAllBooks();
