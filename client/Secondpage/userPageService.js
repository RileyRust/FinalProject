const apiAddress = "http://localhost:5038";

export const getBooks = async () => {
  const response = await fetch(`${apiAddress}/books`, {
    method: "GET",
  });

  return response.json();
};

export const sendBookToApi = async (
  titleString,
  authorValue,
  descriptionValue,
  idName,
  coverImage
) => {
  const body = {
    author: String(authorValue),
    title: String(titleString),
    description: String(descriptionValue),
    id: idName,
    cover: String(coverImage),
  };

  await fetch(apiAddress + `/books`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const CheckedBy = async (bookId, checkedByValue) => {
  const body = {
      checkedBy: checkedByValue 
  };

  await fetch(`${apiAddress}/books/${bookId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
  });
};