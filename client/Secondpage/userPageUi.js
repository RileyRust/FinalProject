import { getBooks,  sendBookToApi  } from "./userPageService.js";

const username = localStorage.getItem("username");

async function renderAllBooks() {
  const bookListelement = document.getElementById("avaialableBooksElement");
  const allBooks = await getBooks();
  bookListelement.replaceChildren();
  const headerElement = document.createElement("h3");
  headerElement.textContent = "Available Books";
  bookListelement.appendChild(headerElement);

  for (const book of allBooks) {
    if (book.id === null) {
      const checkButtonElement = document.createElement("button");
      checkButtonElement.textContent = "Check Out";
      checkButtonElement.classList.add("checkButton");
      const bookelement = document.createElement("div");
      bookelement.classList.add("cards")
      const titleElement = document.createElement("p")
      titleElement.textContent = "Title: " + book.title;
      titleElement.classList.add("title")
      const authorElement = document.createElement("p")
      authorElement.textContent =" Author: " +book.author; 
      authorElement.classList.add("author")
      const descriptionElement = document.createElement("p")
      descriptionElement.textContent = "Description: " +book.description; 
      descriptionElement.classList.add("description");
      
      bookelement.appendChild(titleElement);
      bookelement.appendChild(authorElement);
      bookelement.appendChild(descriptionElement);

      bookListelement.appendChild(bookelement);
      bookelement.appendChild(checkButtonElement); 
    }
  }
}
async function addCheckListeners(
  bookelement,
  author,
  description,
  id,
  title,
) {
  const button = document.getElementById("checkButton")
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    id.textContent = username; 
    title.textContent = book.title; 
    author.textContent = book.author; 
    description.textContent = book.description;
    await sendBookToApi(id,title,author,description);
    await renderAllBooks();
  });
}
async function renderAllCheckBooks() {
  const bookListelement = document.getElementById("checkOutElement");
  const allBooks = await getBooks();
  bookListelement.replaceChildren();
  const headerElement = document.createElement("h3");
  headerElement.textContent = "Checkout Books";
  bookListelement.appendChild(headerElement);
  for (const book of allBooks) {
    if (book.id === `${username}`) {
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
getBooks();
addCheckListeners();
