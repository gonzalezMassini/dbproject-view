import React, { useEffect, useState } from "react";
import styles from "../CreateMeeting/CreateMeeting.module.css"
import {createMeeting, readUsers, findAvailableRoom} from "../../api/index.js"
import { Dropdown } from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import { useNavigate } from 'react-router-dom'


const CreateMeeting = () =>{

	const [valueStart, onChangeStart] = useState();
	const [valueEnd, onChangeEnd] = useState()

	const [meetingInfo, setMeetingInfo] = useState({
													"mtype":"",
													"rid":0,
													"attendees": [],
												})

	const [users, setUsers] = useState([])

	const [attendees, setAttendees] = useState([])

	const [availableRooms, setAvailableRooms] = useState([])

	const userOptions = users.map((user) => {
		// console.log(user)
		return ({key: user.uid,text: user.urole,value: user.uid})
	})

	const roomOptions = availableRooms.map((room)=>({
		key: room.rid,
		text: room.rnumber,
		value: room.rid
	}))
	  

	const getUsers = async ()=>{
		const getUsersResponse = await readUsers()
		const usersList = getUsersResponse.users
		setUsers(usersList)
	}

	let bodySend = {
		"mtype":meetingInfo.mtype,
		"mtimeframe":"["+moment(valueStart).format('MM-DD-YYYY HH:mm')+", "+moment(valueEnd).format('MM-DD-YYYY HH:mm')+"]",
		"rid":meetingInfo.rid,
		"attendees": attendees.map(uid => {return {"uid": uid}}),
		"uid":parseInt(sessionStorage.getItem('uid'))
	}
	let navigate = useNavigate();
	const handleSubmit=async(e)=>{
		e.preventDefault()
		// console.log(bodySend)
		if((valueStart && valueEnd)&&(valueStart<valueEnd)){
			await createMeeting(bodySend)
			navigate('/UserView')
          	window.location.reload(true)
		}else{
			console.log('incorrect date')
		}
	}

	const getRoomAtTimeframe=async()=>{
		let date = "["+moment(valueStart).format('MM-DD-YYYY HH:mm')+", "+moment(valueEnd).format('MM-DD-YYYY HH:mm')+"]"
		// console.log(date)
		const roomsResponse = await findAvailableRoom(date)
		const roomsList = roomsResponse ? roomsResponse["available rooms"]:[]
		setAvailableRooms(roomsList)

	}
	
	useEffect(()=>{
		getUsers()
		// console.log(valueStart<valueEnd)
		if((valueStart && valueEnd)&&(valueStart<valueEnd)){
			getRoomAtTimeframe()
		}else{
			setAvailableRooms([])
		}
	},[valueStart, valueEnd])

    return(
	<div className={styles.container} >
		<form onSubmit={(e)=>{handleSubmit(e)}}>
		<button>submit</button>
			<div>
				<label>type of meeting:</label>
				<input value={meetingInfo.mtype} onChange={(e)=> setMeetingInfo({...meetingInfo, mtype: e.target.value})} />
			</div>
			<div>
				<p>meeting schedule:</p>
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
			</div>
			<div>
				<label>room:</label>
				{/* <input value={meetingInfo.rid} onChange={(e)=> setMeetingInfo({...meetingInfo, rid: e.target.value})}/> */}
				<Dropdown
					placeholder='Select room'
					fluid
					// multiple
					selection
					options={roomOptions}
					onChange={(e,{value})=> {setMeetingInfo({...meetingInfo, rid: value});}}
				/>
			</div>
			<div>
				<label>attendees:</label>
				<Dropdown
					placeholder='Select attendees'
					fluid
					multiple
					selection
					options={userOptions.filter(user => user.value !== parseInt(sessionStorage.getItem('uid')))}
					onChange={(e,{value})=> {setAttendees(value);}}
				/>
			</div>
			
		</form>
	</div>
    )
}

export default CreateMeeting;
