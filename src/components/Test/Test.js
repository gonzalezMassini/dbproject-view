import React, { useEffect, useState } from "react";
import {readUsers, readRooms, mostBookedRooms, mostBookedUsers, busiestHours, readMostBookedRoom, readUserMostBookedWith} from '../../api/index.js'
import Card from '../Card/Card.js'
import styles from '../Test/Test.module.css'
import NotLogged from "../NotLogged/NotLogged.js";

const Test=()=>{
    const [users, setUsers] = useState([])
    const [rooms, setRooms] = useState([])

    const [busiestHour, setBusiestHour] = useState("")

    const [mBookedR, setMostBookedRooms] = useState([])

    const [mBookedU, setMostBookedUsers] = useState([])

   

    const getBusiestHours =  async() => {

        const busiestHoursResponse = await busiestHours()

        const busyTemp = busiestHoursResponse["busiest hour"]

        console.log(busyTemp)

        setBusiestHour(busyTemp)

    }

    const getMostBookedRooms =  async() => {

        const mostBookedRoomsResponse = await mostBookedRooms()

        const mbrTemp = mostBookedRoomsResponse["most used rooms"]

        console.log(mbrTemp)

        setMostBookedRooms(mbrTemp)

    }

    const getMostBookedUsers =  async() => {

        const mostBookedUsersResponse = await mostBookedUsers()

        const mbuTemp = mostBookedUsersResponse["most booked users"]

        console.log(mbuTemp)

        setMostBookedUsers(mbuTemp)

    }

        





    const getUsers = async()=>{
        const usersResponse = await readUsers()
        const usersList = usersResponse.users
        setUsers(usersList)
        console.log(usersResponse)
    }

    const getRooms = async()=>{
        const roomsResponse = await readRooms()
        console.log(roomsResponse)
        const roomsList = roomsResponse.rooms
        setRooms(roomsList)
    }
    const [mostBookedRoom, setMostBookedRoom] = useState({})

    const getMostBookedRoom=async()=>{
        const response = await readMostBookedRoom(1)
        const mostBookedRoom = response["most used room"]
        setMostBookedRoom(mostBookedRoom)
        console.log(mostBookedRoom)
    }
    const [userMostBookedWith, setUserMostBookedWith] = useState({})
    const getUserMostBookedWith=async()=>{
        const response = await readUserMostBookedWith(2)
        const userMostBookedWithList = response["most_booked_with"]
        console.log(response)
        console.log(userMostBookedWithList[0])
        setUserMostBookedWith(userMostBookedWithList[0])
    }
    useEffect(()=>{
        getUsers()
        getRooms()
        getBusiestHours()

        getMostBookedRooms()
        getMostBookedRoom()

        getMostBookedUsers()
        getUserMostBookedWith()
    },[])
    return(
        <div className={styles.container}>
        <a href='/'>Home</a>
          {sessionStorage.getItem('uid') ? rooms.map((room)=>{
                    return(
                        <div key={(room.rid)*33} >
                            <Card 
                                uid={room.rid}
                                uname={room.rnumber}
                                urole={room.rbuilding}
                            />
                        </div>
                    )
                }):<NotLogged/>}  

        </div>
    )
}

export default Test