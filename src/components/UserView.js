import React, {Component, useState, useEffect} from 'react';
import {Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import BookMeeting from "./BookMeeting";
import Schedule from "./Schedule";
import {readMostBookedRoom, readUserMostBookedWith} from '../api/index.js'
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, Cell} from "recharts";



function UserView(){
    const [isAuth, setIsAuth] = useState(false)
    const barColors = ["#1f77b4", "#ff7f0e"]

    const [thisUserMostUsedRoom,setThisUserMostUsedRoom] = useState({})
    const getMostBookedRoom=async()=>{
        const mostBookedRoomResponse = await readMostBookedRoom(sessionStorage.getItem('uid'))
        const mostBookedRoom = mostBookedRoomResponse['most used room']
        setThisUserMostUsedRoom(mostBookedRoom)
    }

    const [thisUserMostBookedWith,setThisUserMostBookedWith] = useState({})
    const getMostBookedWith=async()=>{
        const mostBookedWithResponse = await readUserMostBookedWith(sessionStorage.getItem('uid'))
        const mostBookedWith = mostBookedWithResponse['most_booked_with'][0]
        setThisUserMostBookedWith(mostBookedWith)
    }
    const data = [
        {name: `Most booked user: ${thisUserMostBookedWith.uname}`, Counts: thisUserMostBookedWith['times booked']},
        {name: `Most booked room: ${thisUserMostUsedRoom.rnumber}`, Counts: thisUserMostUsedRoom['times used']}]

    const renderUserStatistics=()=>{
        return(
            <Container style={{ height: 800 }}>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend payload={
                        data.map(
                            (item, index) => ({
                                id: item.name,
                                type: "square",
                                value: `${item.name}`,
                                color: barColors[index % barColors.length]
                            })
                        )
                    }/>
                    <Bar dataKey="Counts" >
                        {
                            data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                                )
                            )
                        }
                    </Bar>
                </BarChart>
            </Container>
        )
    }
    const panes = [
        {
            menuItem: 'Booking', render: () => <BookMeeting/>
        },
        {
            menuItem: 'Schedule', render: () => <Schedule/>
        },
        {
            menuItem: 'Room Management', render: () => <Tab.Pane active={isAuth}><BookMeeting/></Tab.Pane>
        },
        {
            menuItem: 'User Statistics', render: () => renderUserStatistics()
        }
    ]
    // const newDate=()=>{

    //     var fourDaysForward = new moment().add(4, 'day').add(3,'h');  
    //     console.log(new Date(fourDaysForward))  
    // }
    useEffect(()=>{
        getMostBookedRoom()
        getMostBookedWith()
    },[])

    return(
        <>
        {/* <button onClick={()=> newDate()}>ghello</button> */}
        {/* <form>
            <input/>
        </form> */}
            <Tab panes={panes}/>
        </>
    )

}
export default UserView;
