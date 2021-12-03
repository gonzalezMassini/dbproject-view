import React, {Component, useEffect, useState} from 'react';
import {Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {Button, Card, Container, Modal} from "semantic-ui-react";
import {readUserOccupance, readMeetingTimeFrames, createUserOccupance} from '../api/index.js'
import CreateMeeting from '../components/CreateMeeting/CreateMeeting.js' 


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
    const [meetingTimeFrames, setMeetingTimeFrames] = useState([])
    const [dates, setDates] = useState([]);
    const [open, setOpen] = useState(false);
    const localizer = momentLocalizer(moment)
    const [showMeetingForm, setShowMeetingForm] = useState(false)


    const getUserOccupance=async()=>{
        const meetingsTimeResponse = await readMeetingTimeFrames(sessionStorage.getItem('uid'))
        // setMeetingTimeFrames(meetingsTimeResponse.meetings)
        // const meetTimes = meetingsTimeResponse.meetings.map(time =>{
        //     return(
        //         time.uotimeframe
        //     )
        // })
        // console.log(meetTimes)
        // setMeetingTimeFrames(meetTimes)
        const userOccupanceResponse = await readUserOccupance(sessionStorage.getItem('uid'))
        // console.log(userOccupanceResponse)
        const userOccupanceList = userOccupanceResponse
        const timeFrameList = []

        // console.log(meetingTimeFrames)
        let mtimeframeListObj = meetingsTimeResponse ? meetingsTimeResponse.meetings:[]
        let mtimeframe = mtimeframeListObj.map(obj => {return obj.uotimeframe})
        // console.log(mtimeframeListObj)
        // console.log(mtimeframe)
        // let notMeetingOccupance = []
        // userOccupanceList.forEach(timeFrame =>{
        //     if(!meetingTimeFrames.includes(timeFrame.uotimeframe)){
        //         notMeetingOccupance.push({"uotimeframe": timeFrame.uotimeframe})
        //     }
        // })
        // console.log(userOccupanceList)

        // notMeetingOccupance.forEach(element => {
        //     timeFrameList.push({'uotimeframe': {
        //         'startTime':element['uotimeframe'].replace(/[\[\]]/g,'').split(',')[0].slice(0,-6),
        //         'endTime': element['uotimeframe'].replace(/[\[\]]/g,'').split(',')[1].slice(0,-6)
        //     } })
        // });

        userOccupanceList.forEach(element => {
            // console.log(element.title)
            timeFrameList.push({'uotimeframe': {
                'colorCode': mtimeframe.includes(element.uotimeframe) ? 'blue':'red',
                'startTime':element['uotimeframe'].replace(/[\[\]]/g,'').split(',')[0].slice(0,-6),
                'endTime': element['uotimeframe'].replace(/[\[\]]/g,'').split(',')[1].slice(0,-6),
                'occupanceType': mtimeframe.includes(element.uotimeframe) ? mtimeframeListObj[mtimeframe.indexOf(element.uotimeframe)].title 
                :
                element.title ? element.title : 'unavailable'
            } })
        });
        // console.log(timeFrameList)

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

        // console.log(userOccupanceIntoDates)
        // console.log(userOccupanceList)
        // console.log(userOccupanceIntoDates)
        // userOccupanceList.forEach(timeFrame =>{
        //     console.log(timeFrame)
        // })
        setDates(userOccupanceIntoDates)
    }

    const getMeetingsTimeFrame=async()=>{
        // const meetingsTimeResponse = await readMeetingTimeFrames(sessionStorage.getItem('uid'))
        // console.log(meetingsTimeResponse.meetings)
        // setMeetingTimeFrames(meetingsTimeResponse.meetings)
        // getUserOccupance()
    }

    const newUserOccupance=async(time, title)=>{
        let bodySend={"uotimeframe":time,title }
        await createUserOccupance(sessionStorage.getItem('uid'),bodySend)
    }

    useEffect(()=>{
        // getMeetingsTimeFrame()
        getUserOccupance()

    },[])

    const handleSelect = ({ start, end }) => {
        // setShowMeetingForm(true)
        // return(
        //     <CreateMeeting/>
        //     )
        const title = window.prompt('New Event name')
        if (title){
            let time = "["+moment(start).format('MM-DD-YYYY HH:mm')+", "+moment(end).format('MM-DD-YYYY HH:mm')+"]"
            // console.log(time)
            newUserOccupance(time, title)
        }
    }

   const eventPropGetter=(event) => {
    //    console.log(event)
    //    console.log(dates)
    //    const backgroundColor = meetingTimeFrames.includes("["+moment(event.start)+", "+moment(event.end).format+"]") 
    //                             ?
    //                             'blue':'red'
        const backgroundColor = event.colorCode;
        return { style: { backgroundColor } }
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
    >

    </Calendar>
    </Container>


}
export default Schedule;
