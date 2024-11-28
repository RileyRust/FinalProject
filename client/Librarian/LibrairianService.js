const apiAddress = "http://localhost:5038";

export const sendBookToApi = async (
  titleString,
  authorValue,
  descriptionValue,
  coverImage
) => {
  const body = {
    author: String(authorValue),
    title: String(titleString),
    description: String(descriptionValue),
    cover: String(coverImage),
    //id: Number(idValue),
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
