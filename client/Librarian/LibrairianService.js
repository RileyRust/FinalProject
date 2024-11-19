export async function getBookbyID(id) {
  const response = await fetch(`http://localhost:5038/books/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch book with ID ${id}: ${response.statusText}`);
  }
  return await response.json();
}

export async function getBooks() {
  const response = await fetch(`http://localhost:5038/books`);
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`);
  }
  return await response.json();
}

export async function postBook(titleString, idValue, authorValue, descriptionValue) {
  const response = await fetch("http://localhost:5038/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      author: String(authorValue),
      title: String(titleString),
      description: String(descriptionValue),
      id: Number(idValue),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to post book: ${response.statusText}`);
  }
}
