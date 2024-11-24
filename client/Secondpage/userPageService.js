const apiAddress = "http://localhost:5038";

export const getBooks = async () => {
  const response = await fetch(`${apiAddress}/books`, {
    method: "GET",
  });

  return response.json();
};
