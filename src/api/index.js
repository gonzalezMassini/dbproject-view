import axios from "axios"
// axios.defaults.withCredentials = true

// fetch(url, {
//     method: 'POST',
//     body: JSON.stringify('arbitrary_string'),
//     credentials: 'same-origin',   // this line has been added
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => response.json())
//   .then((data) => {
//     console.log(data);
//   })

// const localhost = 'http://127.0.0.1:5000/gelatok'
const localhost = false
const url = localhost ? 'http://127.0.0.1:5000/gelatok': 'https://bdproject-restapi.herokuapp.com/gelatok'

// create user occupance
export const createUserOccupance = async(uid, bodySend)=>{
    const createOccupanceResponse = await axios.post(url+`/user/${uid}/create_user_occupance`,
    bodySend,
    {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"  }})
    const data = createOccupanceResponse.data
    return data
}


// read meeting timeframes for given user
export const readMeetingTimeFrames = async(uid)=>{
    try {
        const meetingsTimeFramesResponse = await axios.get(url+`/user/${uid}/read_meeting_occupance`,
        {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"  }})
        const data = meetingsTimeFramesResponse.data
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

// read user occupance given user id
export const readUserOccupance=async(uid)=>{
    try {
        const userOccuapnceResponse = await axios.get(url+`/user/${uid}/read_user_occupance`, 
        {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"  }},
        )
        const data = userOccuapnceResponse.data
        return data
    } catch (error) {
        console.log(error)
    }
}

// find available room at a given timeframe
export const findAvailableRoom = async (timeframe)=>{
    try {
        const availableRoomResponse = await axios.get(
            url+`/find_available_room/${timeframe}`,
            {headers:{ "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"  } })

        const data = availableRoomResponse.data
        return data

    } catch (error) {
        console.log(error)
    }
}


export const defaultGet = async ()=>{
    try {
        const defaultResponse = await axios.get("http://127.0.0.1:5000/gelatok/",{headers:{"Set-Cookies":"SameSite=None;Secure"}, withCredentials: true })
        const data = defaultResponse.data
        return data

    } catch (error) {
        console.log(error)
    }
}



export const logOut = async ()=>{
    try {
        const logOutResponse = await axios.get("http://127.0.0.1:5000/gelatok/logout",
        {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"},withCredentials: true},
        )
        const data = logOutResponse.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const logIn=async(logInBodySend)=>{
    try {
        const logInResponse = await axios.post(url+"/login",
        logInBodySend,
        {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"}},
          )
        const data = logInResponse.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const readUser=async(uid)=>{
    try {
        const usersResponse = await axios.get(url+`/read_user/${uid}`, 
        {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"  }},
        )
        const data = usersResponse.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const readUsers= async()=>{
    try {
        const usersResponse = await axios.get(url + "/read_users",
        {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"  }},
        )
        const data = usersResponse.data
        // console.log(data)
        return data
    } catch (error) {
     console.log(error)   
    }
}



export const createMeeting = async (bodySend) => {
    const createMeetingResponse = await axios.post(url+"/create_meeting",
            bodySend,
            {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"  }},
          )
    const data =  createMeetingResponse.data
    return data
  };


export const createUser = async (bodySend) => {
    const createUserResponse = await axios.post(url+"/create_user",
            bodySend,
            {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin":true}},
          )
    const data = createUserResponse.data
    return data
  };


export const readRooms = async()=>{
    try {
        const roomsResponse = await axios.get(url + "/read_rooms",           
            {headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true"  }})
        const data = roomsResponse.data
        return data
    } catch (error) {
        console.log(error)
    }
}


// isabel
export const readMostBookedRoom = async(uid)=>{
    const mostBookedRoomsResponse = await axios.get(url + `/user/${uid}/most_booked_rooms`)
    const data = mostBookedRoomsResponse.data
    return data 
}

// user most booked with user given
export const readUserMostBookedWith = async(uid)=>{
    const userMostBookedWithResponse = await axios.get(url + `/user/${uid}/most_booked_with`)
    const data = userMostBookedWithResponse.data
    return data 
}



// Ralph
export const busiestHours = async () =>{
    try {
      const response = await axios.get(url + "/busiest_hours")
    // const response = await axios.get('http://127.0.0.1:5000/gelatok/busiest_hours')
      const data = response.data 
      return data 
    } catch (error) {
      console.log(error)
    }
}
  
  
  
export const mostBookedUsers = async () =>{
    try{
        const response = await axios.get(url + "/most_booked_users")
        const data = response.data
        return data 
    } catch (error){
        console.log(error)
    }  
}
  
  

  export const mostBookedRooms = async () =>{
    try{
        const response = await axios.get(url + "/most_booked_rooms")
        const data = response.data
        return data 
    } catch (error){
        console.log(error)
    }
}
