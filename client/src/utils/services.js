export const baseUrl = "http://localhost:1100/api"

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        "Access-Control-Allow-Origin"  :  " http://localhost:1100"
      },
      body: body
  });

  try {
      const data = await response.json();

      if (!response.ok) {
          let message;

          if (data?.message) {
              message = data.message;
          } else {
              message = data;
          }

          return { error: true, message };
      }

      return data;
  } catch (error) {
      return { error: true, message: error.message };
  }
};

export const getRequest = async(url)=>{
    const response = await fetch(url)

    const data = await response.json()
   

    if(!response.ok){
        let message = "An error occured.."
        // console.log(message);
        return message;

    }
    // console.log(data);
    return data;
    
}