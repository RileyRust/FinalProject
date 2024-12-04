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
    const number = String(id)
    const title = titleInputElement.value.trim();
    const author = authorInputElement.value.trim();
    const description = descriptionInputElement.value.trim();
    const coverImage = coverImageInputElement.value.trim(); 

    await sendBookToApi(title,author,description,coverImage,number);
    await renderAllBooks();
  });
}

async function renderAllBooks() {
  const bookListelement = document.getElementById("availablebooks");
  const allBooks = await getBooks(); 
  bookListelement.replaceChildren();
  for(const book of allBooks){
    if(book.checkedBy === null)
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
    if(book.checkedBy !== null)
    {
      const author = document.createElement("p"); 
      author.textContent = book.author; 
      const checkinButton = document.createElement("button"); 
      checkinButton.textContent="Check in "
      const bookelement = document.createElement("form");
      bookelement.classList.add("formElement")
      bookelement.appendChild(author);
      bookelement.appendChild(checkinButton); 
      bookListelement.appendChild(bookelement); 

      bookelement.addEventListener("submit", async (e) => {
  
        e.preventDefault();
        
        await CheckedBy(book.id, null);
        await renderAllBooks();
        await renderAllCheckBooks();
      });

    }
  }
  
}
renderAllCheckBooks();
attachFormListeners();
renderAllBooks();

