import React, {useEffect, useState} from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Table } from "semantic-ui-react";
import { mostBookedRooms, mostBookedUsers, busiestHours,} from '../api/index.js'


function BookMeeting(){

    const [busiestHour, setBusiestHour] = useState([])
    const getBusiestHours =  async() => {
        const busiestHoursResponse = await busiestHours()
        console.log(busiestHoursResponse.busiest_hours)
        const busiestHoursList = busiestHoursResponse.busiest_hours
        setBusiestHour(busiestHoursList)
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
        getBusiestHours()
        getMostBookedRooms()
        getMostBookedUsers()
    },[])

    

    return (
    <Container style={{ height: 800 }}>
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
