export async function postBook(
    titleString,
    idValue,
    authorValue,
    descriptonValue,
  ) {
    const books = await fetch("url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: String(authorValue),
        title: String(titleString),
        desciption: String(descriptonValue),
        id: String(idValue),
      }),
    });
  }