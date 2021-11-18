const url = 'https://bdproject-restapi.herokuapp.com/gelatok'

export const readUsers= async()=>{
    try {
        const response = await fetch(url+"/read_users")
        const data = await response.json()
        return data
    } catch (error) {
     console.log(error)   
    }
}

export const createUser = async (bodySend) => {
    const response = await fetch(url+"/create_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodySend
    });
    console.log(await response.json());
  };