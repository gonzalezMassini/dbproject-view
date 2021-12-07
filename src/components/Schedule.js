import React, { useEffect, useState} from 'react';
import {Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {Container, Modal, Button} from "semantic-ui-react";
import {readUserOccupance, readMeetingTimeFrames, createUserOccupance, deleteOccupance} from '../api/index.js'
import { useNavigate } from 'react-router-dom'
import styles from './Schedule.module.css'
import {BsTrashFill} from 'react-icons/bs'



function Schedule(){
    const [dates, setDates] = useState([]);
    const localizer = momentLocalizer(moment)
    const [open, setOpen] = useState(false);



    const getUserOccupance=async()=>{
        const meetingsTimeResponse = await readMeetingTimeFrames(sessionStorage.getItem('uid'))
        
        const userOccupanceResponse = await readUserOccupance(sessionStorage.getItem('uid'))
        const userOccupanceList = userOccupanceResponse
        // console.log(userOccupanceList)
        const timeFrameList = []

        let mtimeframeListObj = meetingsTimeResponse ? meetingsTimeResponse.meetings:[]
        let mtimeframe = mtimeframeListObj.map(obj => {return obj.uotimeframe})
        

        userOccupanceList.forEach(element => {
            timeFrameList.push({'uotimeframe': {
                'colorCode': mtimeframe.includes(element.uotimeframe) ? 'blue':'red',
                'startTime':element['uotimeframe'].replace(/[\[\]]/g,'').split(',')[0].slice(0,-6),
                'endTime': element['uotimeframe'].replace(/[\[\]]/g,'').split(',')[1].slice(0,-6),
                'occupanceType': mtimeframe.includes(element.uotimeframe) ? mtimeframeListObj[mtimeframe.indexOf(element.uotimeframe)].title 
                :
                element.title ? element.title : 'unavailable'
            } })
        });

        const userOccupanceIntoDates = []

        timeFrameList.forEach(timeFrame =>{
            userOccupanceIntoDates.push({
                'title': timeFrame.uotimeframe.occupanceType,
                'allDay': false,
                'start': moment(timeFrame.uotimeframe.startTime).toDate(),
                'end': moment(timeFrame.uotimeframe.endTime).toDate(),
                'colorCode': timeFrame.uotimeframe.colorCode
            })
        })

        setDates(userOccupanceIntoDates)
    }

    
    let navigate = useNavigate();
    const newUserOccupance=async(time, title)=>{
        let bodySend={"uotimeframe":time,title }
        await createUserOccupance(sessionStorage.getItem('uid'),bodySend)
        navigate('/UserView')
        window.location.reload(true)
    }

    useEffect(()=>{
        getUserOccupance()

    },[])

    const handleSelect = ({ start, end }) => {        
        const title = window.prompt('New Event name')
        if (title){
            let time = "["+moment(start).format('MM-DD-YYYY HH:mm')+", "+moment(end).format('MM-DD-YYYY HH:mm')+"]"
            newUserOccupance(time, title)
        }
    }

    const eventPropGetter=(event) => {
        const backgroundColor = event.colorCode;
        return { style: { backgroundColor } }
    }

    

    const [timeframe, setTimeframe] = useState('')
    const handleSelectEvent=event=>{
        setOpen(true)
        console.log(event)
        setTimeframe("["+moment(event.start).format('MM-DD-YYYY HH:mm')+", "+moment(event.end).format('MM-DD-YYYY HH:mm')+"]")
    }

    
    const handleDeleteEvent=async()=>{
        const uid = parseInt(sessionStorage.getItem('uid'))
        await deleteOccupance(uid, timeframe)
        window.location.reload(true)
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
        eventPropGetter={eventPropGetter}
        onSelectEvent={event => event.colorCode === 'red' ? handleSelectEvent(event):null}
    >
    </Calendar>
    <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>Delete event</Modal.Header>
                <Modal.Content>
                    <Modal.Description className={styles.desc}>
                        Click trash can to delete event 
                        <span onClick={()=>handleDeleteEvent()} className={styles.icon}><BsTrashFill/></span>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                </Modal.Actions>
            </Modal>
    </Container>
}
export default Schedule;
