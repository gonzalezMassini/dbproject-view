import React, {Component, useEffect, useState} from 'react';
import {Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {Button, Container, Modal, Card, Table, Icon, Label, Menu } from "semantic-ui-react";

import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, Cell} from "recharts";
import {readMostBookedRoom, readUserMostBookedWith, mostBookedRooms, mostBookedUsers, busiestHours,} from '../api/index.js'
// import Card from '../components/Card/Card.js'


function BookMeeting(){
    // const [data, setData] = useState([{"name": 1, "Counts": 5},
    //                                             {"name": 2, "Counts": 4},
    //                                             {"name": 3, "Counts": 3},
    //                                             {"name": 4, "Counts": 2},
    //                                             {"name": 5, "Counts": 1}]);

    const barColors = ["#1f77b4", "#ff7f0e"]

    const [thisUserMostUsedRoom,setThisUserMostUsedRoom] = useState({})
    // const getMostBookedRoom=async()=>{
    //     const mostBookedRoomResponse = await readMostBookedRoom(sessionStorage.getItem('uid'))
    //     const mostBookedRoom = mostBookedRoomResponse['most used room']
    //     setThisUserMostUsedRoom(mostBookedRoom)
    // }

    const [thisUserMostBookedWith,setThisUserMostBookedWith] = useState({})
    // const getMostBookedWith=async()=>{
    //     const mostBookedWithResponse = await readUserMostBookedWith(sessionStorage.getItem('uid'))
    //     const mostBookedWith = mostBookedWithResponse['most_booked_with'][0]
    //     setThisUserMostBookedWith(mostBookedWith)
    // }

    const [busiestHour, setBusiestHour] = useState([])
    const getBusiestHours =  async() => {
        const busiestHoursResponse = await busiestHours()
        console.log(busiestHoursResponse.busiest_hours)
        const busiestHoursList = busiestHoursResponse.busiest_hours
        setBusiestHour(busiestHoursList)
        // const busyTemp = busiestHoursResponse["busiest hour"]
        // console.log(busyTemp)
        // setBusiestHour(busyTemp)
    }

    const [mBookedR, setMostBookedRooms] = useState([])
    const getMostBookedRooms =  async() => {
        const mostBookedRoomsResponse = await mostBookedRooms()
        const mbrTemp = mostBookedRoomsResponse["most used rooms"]
        console.log(mbrTemp)
        setMostBookedRooms(mbrTemp)
    }


    const [mBookedU, setMostBookedUsers] = useState([])
    const getMostBookedUsers =  async() => {
        const mostBookedUsersResponse = await mostBookedUsers()
        const mbuTemp = mostBookedUsersResponse["most booked users"]
        console.log(mbuTemp)
        setMostBookedUsers(mbuTemp)
    }


    useEffect(()=>{
        // getMostBookedRoom()
        // getMostBookedWith()
        getBusiestHours()
        getMostBookedRooms()
        getMostBookedUsers()
    },[])

    // const data = [
    //     {name: `Most booked user: ${thisUserMostBookedWith.uname}`, Counts: thisUserMostBookedWith['times booked']},
    //     {name: `most booked room: ${thisUserMostUsedRoom.rnumber}`, Counts: thisUserMostUsedRoom['times used']}]
    
    const data = []

    return (
    <Container style={{ height: 800 }}>
        {/* <div>{busiestHour[0].count}</div> */}
        <h1>Global Statistics</h1>
        <h1>Top 10 most booked users</h1>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Rank</Table.HeaderCell>
                    <Table.HeaderCell>User Name</Table.HeaderCell>
                    <Table.HeaderCell>Times Booked</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    mBookedU.map((user, index)=>{
                        return(
                        <Table.Row key={index}>
                            <Table.Cell>{index+1}</Table.Cell>
                            <Table.Cell>{user.uname}</Table.Cell>
                            <Table.Cell>{user.user_appointments}</Table.Cell>
                        </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
        <h1>Top 10 most used rooms</h1>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Rank</Table.HeaderCell>
                    <Table.HeaderCell>Room</Table.HeaderCell>
                    <Table.HeaderCell>Times Used</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    mBookedR.map((room, index)=>{
                        return(
                        <Table.Row key={index}>
                            <Table.Cell>{index+1}</Table.Cell>
                            <Table.Cell>{room.rnumber}</Table.Cell>
                            <Table.Cell>{room.room_appointments}</Table.Cell>
                        </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
        <h1>Top 5 busiest hours</h1>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Rank</Table.HeaderCell>
                    <Table.HeaderCell>Hour</Table.HeaderCell>
                    <Table.HeaderCell>Times Used</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    busiestHour.map((hour, index)=>{
                        return(
                        <Table.Row key={index}>
                            <Table.Cell>{index+1}</Table.Cell>
                            <Table.Cell>{hour.hour.slice(0, -3)}</Table.Cell>
                            <Table.Cell>{hour.count}</Table.Cell>
                        </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    </Container>
)

}
export default BookMeeting;
