import React, {Component, useEffect, useState} from 'react';
import {Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {Button, Card, Container, Modal} from "semantic-ui-react";
import {readUserOccupance} from '../api/index.js'


// Event {
//     title: string,
//         start: Date,
//         end: Date,
//         allDay?: boolean
//     resource?: any,
// }


function Schedule(){
    // const [dates, setDates] = useState([{
    //     'title': 'Selection',
    //     'allDay': false,
    //     'start': new Date(moment.now()),
    //     'end': new Date(moment.now())
    // }]);
    const [dates, setDates] = useState([]);
    const [open, setOpen] = useState(false);
    const localizer = momentLocalizer(moment)


    const getUserOccupance=async()=>{
        const userOccupanceResponse = await readUserOccupance(sessionStorage.getItem('uid'))
        const userOccupanceList = userOccupanceResponse
        const timeFrameList = []

        userOccupanceList.forEach(element => {
            timeFrameList.push({'uotimeframe': {
                'startTime':element['uotimeframe'].replace(/[\[\]]/g,'').split(',')[0].slice(0,-6),
                'endTime': element['uotimeframe'].replace(/[\[\]]/g,'').split(',')[1].slice(0,-6)
            } })

        });

        const userOccupanceIntoDates = []

        timeFrameList.forEach(timeFrame =>{
            userOccupanceIntoDates.push({
                'title': 'Selection',
                'allDay': false,
                'start': timeFrame.uotimeframe.startTime,
                'end': timeFrame.uotimeframe.endTime
            })
        })

        setDates(userOccupanceIntoDates)
    }

    useEffect(()=>{
        getUserOccupance()
    },[])


    return <Container style={{ height: 800 }}><Calendar
        localizer={localizer}
        startAccessor="start"
        events={dates}
        endAccessor="end"
        views={["month", "day"]}
        defaultDate={Date.now()}
    >

    </Calendar>
    </Container>


}
export default Schedule;
