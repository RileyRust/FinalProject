import { getBooks} from "./userPageService.js";

function attachFormListeners() {
}
 const username = localStorage.getItem("username");; 

async function renderAllBooks() {
  const bookListelement = document.getElementById("avaialableBooksElement");
  const allBooks = await getBooks(); 
  bookListelement.replaceChildren();
  const headerElement = document.createElement('h3')
  headerElement.textContent = "Available Books"; 
  bookListelement.appendChild(headerElement); 
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
  const bookListelement = document.getElementById("checkOutElement");
  const allBooks = await getBooks(); 
  bookListelement.replaceChildren();
  const headerElement = document.createElement('h3')
  headerElement.textContent = "Checkout Books"; 
  bookListelement.appendChild(headerElement); 
  for(const book of allBooks){
    if(book.id === `${username}`)
      {
      const bookelement = document.createElement("div");
      bookelement.textContent = "Title: "+ book.title + " Author: " + book.author + "Description: " + book.description; 
      bookListelement.appendChild(bookelement); 

    }
  }
  
}
renderAllCheckBooks();
attachFormListeners();
renderAllBooks();
getBooks();
