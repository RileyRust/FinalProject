import { getBooks, sendBookToApi } from "./LibrairianService.js";
function attachFormListeners() {
  const formElement = document.getElementById("userForm");
  const titleInputElement = document.getElementById("Title");
  const authorInputElement = document.getElementById("Author");
  const descriptionInputElement = document.getElementById("PrintCompany");
  const coverImageInputElement = document.getElementById("coverImage");

  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInputElement.value.trim();
    const author = authorInputElement.value.trim();
    const description = descriptionInputElement.value.trim();
    const coverImage = coverImageInputElement.value.trim(); 
   
    await sendBookToApi(title,author,description,coverImage);
    await renderAllBooks();
  });
}

async function renderAllBooks() {
  const bookListelement = document.getElementById("availablebooks");
  const allBooks = await getBooks(); 
  bookListelement.replaceChildren();
  for(const book of allBooks){
    if(book.id === null)
    {
       const bookelement = document.createElement("div");

      bookelement.textContent = "Title: "+ book.title + " Author: " + book.author + "Description: " + book.description;

      bookListelement.appendChild(bookelement);
    }

  }
  
}
async function renderAllCheckBooks() {
  const bookListelement = document.getElementById("Checkoutbooks");
  const allBooks = await getBooks(); 
  bookListelement.replaceChildren();
  for(const book of allBooks){
    if(book.id !== null)
    {
      const bookelement = document.createElement("div");
      bookelement.textContent = "Title: "+ book.title + "User who has it: " + book.id; 
      bookListelement.appendChild(bookelement); 

    }
  }
  
}
renderAllCheckBooks();
attachFormListeners();
renderAllBooks();
getBooks();
