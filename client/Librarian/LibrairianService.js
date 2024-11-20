const apiAdress = "http://localhost:5038/books";



export const sendbooktoapi = async(titleString, idValue, authorValue, descriptionValue) => {
  
  const body ={
    uthor: String(authorValue),
      title: String(titleString),
      description: String(descriptionValue),
      id: Number(idValue),

 }
 
 await fetch(
  apiAdress,
   {
   method: "POST",
   body: JSON.stringify(body),
   headers: {
     "Content-Type": "application/json"
    },
  });
  
}


export const getBooks = async() => {
  const response = await fetch(`${apiAdress}/books`,{
    method: "GET",
  })

  return response.json();
}
