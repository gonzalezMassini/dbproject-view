import React, {Component, useState} from 'react';
import {Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {Button, Card, Container, Modal} from "semantic-ui-react";
import {createUserOccupance} from '../api/index.js'


function BookMeeting(){
    const [dates, setDates] = useState([]);
    const [open, setOpen] = useState(false);
    const localizer = momentLocalizer(moment)


    const newUserOccupance=async(time)=>{
        let bodySend={"uotimeframe":time}
        await createUserOccupance(sessionStorage.getItem('uid'),bodySend)
    }

    const handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title){
            let time = "["+moment(start).format('MM-DD-YYYY HH:mm')+", "+moment(end).format('MM-DD-YYYY HH:mm')+"]"
            newUserOccupance(time)
        }
    }

    return <Container style={{ height: 800 }}><Calendar
        selectable
        localizer={localizer}
        startAccessor="start"
        events={dates}
        endAccessor="end"
        views={["month", "day"]}
        defaultDate={Date.now()}
        onSelectSlot={handleSelect}
    >

    </Calendar>
    </Container>


}
export default BookMeeting;
