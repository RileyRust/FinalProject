import { getBooks, sendBookToApi, CheckedBy } from "./LibrairianService.js";
function attachFormListeners() {
  const formElement = document.getElementById("userForm");
  const titleInputElement = document.getElementById("Title");
  const authorInputElement = document.getElementById("Author");
  const descriptionInputElement = document.getElementById("PrintCompany");
  const coverImageInputElement = document.getElementById("coverImage");
  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = Date.now();
    const number = String(id);
    const title = titleInputElement.value.trim();
    const author = authorInputElement.value.trim();
    const description = descriptionInputElement.value.trim();
    const coverImage = coverImageInputElement.value.trim();
    document.getElementById("userForm").reset()
    await sendBookToApi(title, author, description, coverImage, number);
    await renderAllBooks();
  });
}

async function renderAllBooks() {
  const bookListelement = document.getElementById("availablebooks");
  const allBooks = await getBooks();
  bookListelement.replaceChildren();
  for (const book of allBooks) {
    if (book.checkedBy === null) {
      const bookelement = document.createElement("div");
      bookelement.classList.add("cards")
      const title = document.createElement("p")
      title.textContent = "Title: " + book.title; 
      const author = document.createElement("p")
      author.textContent = " Author: " + book.author
      const description = document.createElement("p")
      description.textContent = "Description: " +book.description;
      bookelement.appendChild(title)
      bookelement.appendChild(author)
      bookelement.appendChild(description)

      bookListelement.appendChild(bookelement);
    }
  }
}
async function renderAllCheckBooks() {
  const bookListelement = document.getElementById("Checkoutbooks");
  const allBooks = await getBooks();
  bookListelement.replaceChildren();

  const checkedOutBooks = allBooks.filter((book) => book.checkedBy !== null);
  checkedOutBooks.sort((a, b) => {
    const dateA = parseCheckedTime(a.checkedTime);
    const dateB = parseCheckedTime(b.checkedTime);

    return dateA - dateB;
  });

  bookListelement.replaceChildren();
  for (const book of checkedOutBooks) {
    const booktitle = document.createElement("p");
    booktitle.textContent = book.title;
    const checkedtime = document.createElement("p");
    checkedtime.textContent = "Checked by " + book.checkedBy + " on " + book.checkedTime;
    const userchecked = document.createElement("P");
    userchecked.textContent = book.checkedBy;

    const checkinButton = document.createElement("button");
    checkinButton.textContent = "Check in ";
    const bookelement = document.createElement("form");
    bookelement.classList.add("formElement");

    const dateChecked = document.createElement("p");
    const datesplit = book.checkedTime.split("/");
    const d = new Date();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let year = d.getFullYear(); 
    dateChecked.textContent = `Due on ` + (Number(datesplit[1]) + 7);
    if (
      month > Number(datesplit[0]) ||
      (month === Number(datesplit[0]) && date >= Number(datesplit[1]) + 7) ||
      year > Number(datesplit[2])
    ) {
      dateChecked.classList.add("overdue");
    }
    bookelement.appendChild(dateChecked)
    bookelement.appendChild(booktitle);
    bookelement.appendChild(userchecked);
    bookelement.appendChild(checkedtime);
    bookelement.appendChild(checkinButton);
    bookListelement.appendChild(bookelement);

    bookelement.addEventListener("submit", async (e) => {
      e.preventDefault();

      await CheckedBy(book.id, null, null);
      await renderAllBooks();
      await renderAllCheckBooks();
    });
  }
}
function parseCheckedTime(checkedTime) {
  const currentYear = new Date().getFullYear();
  const [day, month, year] = checkedTime.split("/").map(Number);

  return new Date(currentYear, month - 1, day);
}
renderAllCheckBooks();
attachFormListeners();
renderAllBooks();
