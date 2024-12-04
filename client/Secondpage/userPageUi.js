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
  const grandParentElement = document.createElement("div");
  grandParentElement.classList.add("grandparent");

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
        const bigdate = new Date();
        const date = bigdate.getDate();
        const month = bigdate.getMonth() + 1;
        e.preventDefault();
        await CheckedBy(
          book.id,
          username,
          `${month}/${date}`
        );
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
  const headerDiv = document.createElement("div");
  headerDiv.appendChild(headerElement);
  headerElement.textContent = "Checkout Books";
  bookListelement.appendChild(headerElement);
  bookListelement.appendChild(headerElement);
  const grandParentElement = document.createElement("div");
  grandParentElement.classList.add("grandparent");

  const checkedOutBooks = allBooks.filter((book) => book.checkedBy !== null);
  checkedOutBooks.sort((a, b) => {
    const dateA = parseCheckedTime(a.checkedTime);
    const dateB = parseCheckedTime(b.checkedTime);

    return dateA - dateB;
  });

  for (const book of checkedOutBooks) {
    const ImageElement = document.createElement("img");
    ImageElement.src = book.cover;
    const ImageDiv = document.createElement("div");
    ImageDiv.appendChild(ImageElement);
    ImageDiv.classList.add("imageDiv");

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

    const dateChecked = document.createElement("p");
    const datesplit = book.checkedTime.split("/");
    const d = new Date();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let year = d.getFullYear();
    dateChecked.textContent = `Due on ` + (Number(datesplit[1]) + 7);
    console.log(book.checkedTime);
    console.log(month);
    if (
      month > Number(datesplit[0]) ||
      (month === Number(datesplit[0]) && date >= Number(datesplit[1]) + 7)
    ) {
      dateChecked.classList.add("overdue");
    }

    bookelement.appendChild(dateChecked);
    bookelement.appendChild(titleElement);
    bookelement.appendChild(authorElement);
    bookelement.appendChild(descriptionElement);
    cardElement.appendChild(bookelement);

    pairElement.appendChild(ImageDiv);
    pairElement.appendChild(cardElement);
    grandParentElement.appendChild(pairElement);
  }
  bookListelement.appendChild(grandParentElement);
}

function parseCheckedTime(checkedTime) {
  const currentYear = new Date().getFullYear();
  const [day, month] = checkedTime.split("/").map(Number);

  return new Date(currentYear, month - 1, day);
}
renderAllCheckBooks();
renderAllBooks();
