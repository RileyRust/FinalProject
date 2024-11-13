document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const librarianLink = document.getElementById("librarian");
  const userLink = document.getElementById("Secondpage");
  librarianLink.style.display = "none";
  userLink.style.display = "none";
  userForm.addEventListener("input", (event) => {
    event.preventDefault();
    const username = document.getElementById("Username").value.trim();

    if (username === "librarian") {
      librarianLink.style.display = "block";
      userLink.style.display = "block";
    } else if (username === "Librarian") {
      librarianLink.style.display = "block";
      userLink.style.display = "block";
    } else if (username === "") {
      librarianLink.style.display = "none";
      userLink.style.display = "none";
    } else {
      librarianLink.style.display = "none";
      userLink.style.display = "block";
    }
    localStorage.setItem("username", username);
    console.log(localStorage)
    
  });

  userForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const username = document.getElementById("Username").value.trim();

    localStorage.setItem("username", username);
    console.log(localStorage)
  });


});
