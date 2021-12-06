import React, { useEffect, useState } from "react";
import styles from './RoomManagement.module.css'
import {createRoom, readRooms, updateRoom, createRoomOccupance} from '../../api'
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import { readRoomOccupance } from "../../api";
import {Calendar, momentLocalizer } from 'react-big-calendar';
import { Container, Dropdown } from "semantic-ui-react";
import { useNavigate } from "react-router";
// import { useNavigate } from "react-router-dom";


const RoomManagement =(props)=>{
    const [roomInfoInput, setRoomInfoInput] = useState({"rcapacity":"0", "rtype":"","rnumber":"","rbuilding":""})
    const [valueStart, onChangeStart] = useState(new Date());
	const [valueEnd, onChangeEnd] = useState()
    const [rooms, setRooms] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [editInput, setEditInput] = useState('0')
    const [scheduleRoom, setScheduleRoom] = useState(false)
    const localizer = momentLocalizer(moment)
    const [dates, setDates] = useState([]);
    const [showRoomSchedule, setShowRoomSchedule] = useState(true)




    const getRooms = async()=>{
        const roomsResponse = await readRooms()
        const roomsList = roomsResponse.rooms
        setRooms(roomsList)
    }
    const roleOptions = [{
		key: 1,
		text: "Classroom",
		value: 'classroom'
	},
  {
    key: 2,
		text: "Lab",
		value: "lab"
	},
    {
        key: 3,
            text: "Study space",
            value: "study space"
        },
]

    // const navigate = props.navigate()
    const navigate = useNavigate()
    const handleRoomCreateSubmit=async(e)=>{
        e.preventDefault()
        if(roomInfoInput.rcapacity && roomInfoInput.rtype && roomInfoInput.rnumber && roomInfoInput.rbuilding){
            let bodySend = {
                "rcapacity":parseInt(roomInfoInput.rcapacity),
                "rtype":roomInfoInput.rtype,
                "rnumber":roomInfoInput.rnumber,
                "rbuilding":roomInfoInput.rbuilding
            }
            await createRoom(bodySend)
            setRoomInfoInput({"rcapacity":"0", "rtype":"","rnumber":"","rbuilding":""})
            localStorage.setItem('activePane', 1)
            window.location.reload(true)
            navigate('/UserView')
            // props.history.push('/UserView')
        }
    }

    const getRoomOccupance =async(rid)=>{
        const response = await readRoomOccupance(sessionStorage.getItem('uid'),rid)
        const roomOccupances = response ? response : []
        const timeFrameList = []
        roomOccupances.forEach(element => {
            timeFrameList.push({'rotimeframe': {
                'startTime':element['rotimeframe'].replace(/[\[\]]/g,'').split(',')[0].slice(0,-6),
                'endTime': element['rotimeframe'].replace(/[\[\]]/g,'').split(',')[1].slice(0,-6),
            } })
        });
        const roomOccupanceIntoDates = []

        timeFrameList.forEach(timeFrame =>{
            roomOccupanceIntoDates.push({
                'title':"occupied",
                'allDay': false,
                'start': moment(timeFrame.rotimeframe.startTime).toDate(),
                'end': moment(timeFrame.rotimeframe.endTime).toDate(),
            })
        })
        setDates(roomOccupanceIntoDates)
    }


    useEffect(()=>{
        getRooms()
        
    },[])
    const handleEdit = async()=>{
        if(editInput){
            let bodySend = {
                "rcapacity": editInput
            }
            await updateRoom(localStorage.getItem('rid'), bodySend)
            localStorage.removeItem('rid')
            window.location.reload(true)
        }
        setIsEdit(false); 
    }

    const postRoomSchedule =async (rid)=>{
        if(valueStart && valueEnd){
            let date = "["+moment(valueStart).format('MM-DD-YYYY HH:mm')+", "+moment(valueEnd).format('MM-DD-YYYY HH:mm')+"]"
            let bodySend = {
                "uid":parseInt(sessionStorage.getItem('uid')),
                "rotimeframe": date
            }
            await createRoomOccupance(rid,bodySend)
        }
    }
    const eventPropGetter=() => {
            const backgroundColor = 'red';
            return { style: { backgroundColor } }
    }
    

    return(
        <>
            <div className={styles.container}>
                <form onSubmit={(e) => handleRoomCreateSubmit(e)} className={styles.form}>
                <div className={styles.login}>Create Room</div>
                <div className={styles.input}>
                    <span>Room Number:</span>
                    <input className={styles.paddingInput}
                        placeholder='room number'
                        onChange={(e) =>
                        setRoomInfoInput({ ...roomInfoInput, rnumber: e.target.value })
                        }
                        value={roomInfoInput.rnumber}
                        />
                </div>
                <div className={styles.input}>
                    <span>Room Building:</span>
                    <input className={styles.paddingInput}
                        value={roomInfoInput.rbuilding}
                        onChange={(e) =>{
                            setRoomInfoInput({ ...roomInfoInput, rbuilding: e.target.value })}
                        }
                        placeholder='room building'
                        />
                </div>
                <div className={styles.input}>
                    <span>Room Capacity:</span>
                    <input min='0' className={styles.paddingInput} type='number'
                        value={roomInfoInput.rcapacity}
                        onChange={(e) =>{
                            if(e.target.value.length!==0){
                                setRoomInfoInput({ ...roomInfoInput, rcapacity: e.target.value })
                            }
                        }
                        }
                        placeholder='room capacity'
                    />
                </div>
                <div className={styles.t}>
                    <span>Room Type:</span>
                        <Dropdown
                            placeholder='select role'
                            fluid
                            selection
                            options={roleOptions}
                            onChange={(e,{value})=> {setRoomInfoInput({...roomInfoInput, rtype: value});}}
                            />
                </div>
                <button className={styles.button}>Create Room</button>
                </form>
            {showRoomSchedule ? <>{rooms.map(room =>{
                    return(
                        <div key={room.rid}>{
                            isEdit && room.rid === parseInt(localStorage.getItem('rid')) ?
                            (<div className={styles.edit}>
                                <label>room capacity:</label>
                                <input min='0' className={styles.paddingInput} type='number'
                        value={editInput}
                        onChange={(e) =>{
                            if(e.target.value.length!==0){
                                setEditInput( e.target.value )
                            }
                        }
                        }
                        placeholder='room capacity'
                        />
                            <button onClick={()=> handleEdit()}>edit</button>
                            <button onClick={()=> setIsEdit(false)}>cancel</button>
                            </div>)
                            :
                            scheduleRoom && parseInt(localStorage.getItem('rid'))===room.rid?
                            
                            (<div className={styles.scheduleRoom}>
                                <p>start time</p>
                                <DateTimePicker
                                    onChange={onChangeStart}
                                    value={valueStart}
                                    dayPlaceholder='dd'
                                    hourPlaceholder='hh'
                                    yearPlaceholder='yyyy'
                                    monthPlaceholder='mm'
                                    minutePlaceholder='mm'
                                    returnValue='start'
                                    maxDate={valueEnd}
                                />
                                <p>end time</p>
                                <DateTimePicker
                                    onChange={onChangeEnd}
                                    value={valueEnd}
                                    dayPlaceholder='dd'
                                    hourPlaceholder='hh'
                                    yearPlaceholder='yyyy'
                                    monthPlaceholder='mm'
                                    minutePlaceholder='mm'
                                    returnValue='end'
                                    minDate={valueStart}
                                />
                                <button onClick={()=>{setScheduleRoom(false); postRoomSchedule(localStorage.getItem('rid')); localStorage.removeItem('rid', room.rid); }}>make room unavailable</button>
                                <button onClick={()=>{setScheduleRoom(false); localStorage.removeItem('rid', room.rid); }}>cancel</button>
                            </div>)
                            :
                            (<div className={styles.room}>
                                <p>room number: {room.rnumber}</p>
                                <p>room building: {room.rbuilding}</p>
                                <p>room capacity: {room.rcapacity}</p>
                                <p>room type: {room.rtype}</p>
                                <button onClick={()=> {setIsEdit(true); localStorage.setItem('rid',room.rid)}}>edit room</button>
                                <button onClick={(e)=>{e.preventDefault(); localStorage.setItem('rid', room.rid); setScheduleRoom(true)}}>make room unavailable</button>
                                <button onClick={()=>{getRoomOccupance(room.rid); setShowRoomSchedule(false)}}>room schedule</button>
                            </div>)
                            
                        }
                        </div>
                        )
                    })}</>:
                    <Container style={{ height: 800 }}>
                    <button onClick={()=>{setShowRoomSchedule(true)}}>back to rooms</button>
                        <Calendar
                            selectable
                            localizer={localizer}
                            startAccessor="start"
                            events={dates}
                            endAccessor="end"
                            views={["month", "day"]}
                            defaultDate={Date.now()}
                            eventPropGetter={eventPropGetter}
                        >
                    </Calendar>
                    </Container>}
            </div>
        </>
    )
}


export default RoomManagement