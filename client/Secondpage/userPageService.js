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

export const CheckedBy = async (
  bookId,
   checkedByValue,
   checkedTimeValue
  ) => {
  const body = {
      checkedBy: checkedByValue,
      checkedTime: checkedTimeValue

  };

  await fetch(`${apiAddress}/books/${bookId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
          "Content-Type": "application/json",
      },
  });
};