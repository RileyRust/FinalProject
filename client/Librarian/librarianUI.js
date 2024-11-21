import { getBooks, sendBookToApi } from "./LibrairianService.js";

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
   
    await sendBookToApi(title,author,company);
    await renderAllBooks();
  });
}

async function renderAllBooks() {
  const bookListelement = document.getElementById("availablebooks");
  const allBooks = await getBooks(); 
  bookListelement.replaceChildren();
  for(const book of allBooks){
    const bookelement = document.createElement("div");
    bookelement.textContent =  book.title + book.author +book.printCompany;
    bookListelement.appendChild(bookelement); 
  }
  
}

attachFormListeners();
renderAllBooks();
getBooks();
