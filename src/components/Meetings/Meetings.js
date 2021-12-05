import React, { useEffect, useState } from "react";
import CreateMeeting from "../CreateMeeting/CreateMeeting";
import { readMeetingsByUser, readRooms, updateMeeting } from "../../api";
import styles from './Meetings.module.css'
import moment from "moment";
import { Dropdown } from "semantic-ui-react";


const Meetings =()=>{

    const [meetingsByUser, setMeetingsByUser] = useState([])
    const [rooms, setRooms] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [editInput, setEditInput] = useState('')
    const [attendeesList, setAttendees] = useState([])
    // let attendeesOptions = attendeesList.map((attendee)=>({
    //     key : attendee.uid*attendee.mid,
    //     text : attendee.uname,
    //     value : attendee.uid
    // }))
    const [options, setOptions] = useState([])


    const getMeetingsByUser=async()=>{
        const uid = parseInt(sessionStorage.getItem('uid'))
        const meetingsByUserResponse = await readMeetingsByUser(uid)
        console.log(meetingsByUserResponse.attendees)

        // setAttendees(meetingsByUser.attendees)
        let attendeesOptions = meetingsByUserResponse.attendees.map((attendee)=>({
            key : attendee.uid*attendee.mid,
            text : attendee.uname,
            value : attendee.mid
        }))
        setOptions(attendeesOptions)
        const meetsByUser = meetingsByUserResponse.createdMeetings
        // console.log(meetsByUser)


        const roomsResponse = await readRooms()
        // console.log(roomsResponse)
        const roomsList = roomsResponse.rooms


        setRooms(roomsList)


        meetsByUser.sort(function(a,b){
            return (
                new Date(a.mtimeframe.replace(/[\[\]]/g,'').split(',')[0].slice(0,-6)) 
                - 
                new Date(b.mtimeframe.replace(/[\[\]]/g,'').split(',')[0].slice(0,-6))) 
            }
        )


        setMeetingsByUser(meetsByUser)

    }

    const getRooms = async()=>{
        // const roomsResponse = await readRooms()
        // console.log(roomsResponse)
        // const roomsList = roomsResponse.rooms
        // setRooms(roomsList)
    }

    useEffect(()=>{
        getMeetingsByUser()
        // getRooms()
    },[])

    const handleEdit = async()=>{
        if(editInput){
            let bodySend = {
                "mtype": editInput
            }
            // console.log(bodySend)
            await updateMeeting(localStorage.getItem('mid'), bodySend)
            localStorage.removeItem('mid')
            window.location.reload(true)
        }
        setIsEdit(false); 
    }

    return(
        <div className={styles.container}>
            <CreateMeeting/>
            <div className={styles.meetings}>
                {meetingsByUser.map(meet =>{
                    return(
                        <div key={meet.mid}>{
                            isEdit && meet.mid === parseInt(localStorage.getItem('mid')) ?
                            (<div className={styles.edit}>
                                <label>meeting description:</label>
                                <input onChange={(e)=> setEditInput(e.target.value)}/>
                                <button onClick={()=> handleEdit()}>edit</button>
                            </div>)
                            :
                            (<div className={styles.meet}>
                                <p>meeting description: {meet.mtype}</p>
                                <p>Start time: {meet.mtimeframe.replace(/[\[\]]/g,'').split(',')[0].slice(0,-6)}</p>
                                <p>End time: {meet.mtimeframe.replace(/[\[\]]/g,'').split(',')[1].slice(0,-6)}</p>
                                <p>Room number: {rooms.filter(room => room.rid === meet.rid)[0].rnumber}</p>
                                <Dropdown
                                    placeholder='attendees'
                                    fluid
                                    multiple
                                    selection
                                    options={options.filter(attendee => attendee.value === meet.mid)}
                                />
                                <button onClick={()=> {setIsEdit(true); localStorage.setItem('mid',meet.mid)}}>edit meeting</button>
                            </div>)
                        }
                            
                        </div>
                        )
                    })}
            </div>
        </div>
    )
}


export default Meetings