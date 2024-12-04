const apiAddress = "http://localhost:5038";
const id = String(Date.now());
export const sendBookToApi = async (
  titleString,
  authorValue,
  descriptionValue,
  coverImage,
  id,
) => {
  const body = {
    author: String(authorValue),
    title: String(titleString),
    description: String(descriptionValue),
    cover: String(coverImage),
    id: String(id),
    checkedBy:null
  };

  await fetch(apiAddress + `/books`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getBooks = async () => {
  const response = await fetch(`${apiAddress}/books`, {
    method: "GET",
  });

  return response.json();
};
export const CheckedBy = async (bookId, checkedByValue,checkedTimeValue ) => {
  const body = {
      checkedBy: checkedByValue,
      checkedTime: checkedTimeValue
  };

  await fetch(`${apiAddress}/books/${bookId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
  });
};
