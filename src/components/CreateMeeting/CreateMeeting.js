import React, { useEffect, useState } from "react";
import styles from "../CreateMeeting/CreateMeeting.module.css"
import {createMeeting, readUsers, findAvailableRoom,readUserOccupance,userOccupances} from "../../api/index.js"
import { Dropdown } from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import { useNavigate } from 'react-router-dom'
import {Calendar, momentLocalizer } from 'react-big-calendar';
import { Container } from "semantic-ui-react";



const CreateMeeting = () =>{

	const [valueStart, onChangeStart] = useState(new Date());
	const [valueEnd, onChangeEnd] = useState()
	const [dates, setDates] = useState([]);
    const localizer = momentLocalizer(moment)

	const [meetingInfo, setMeetingInfo] = useState({
													"mtype":"",
													"rid":0,
													"attendees": [],
												})

	const [users, setUsers] = useState([])

	const [attendees, setAttendees] = useState([])

	const [availableRooms, setAvailableRooms] = useState([])

	const userOptions = users.map((user) => {
		return ({key: user.uid,text: user.uname,value: user.uid})
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
		const roomsResponse = await findAvailableRoom(date)
		const roomsList = roomsResponse ? roomsResponse["available rooms"]:[]
		setAvailableRooms(roomsList)

	}


	const [allDates, setAllDates]=useState([])
	const getUserOccupances=async()=>{
		const response = await userOccupances()
		// console.log(response);
		const occupances = response.occupances ? response.occupances:[] 
		const intoDates = occupances.map(element=>{
			return(
				{
					'title':element.uname,
					'uid':element.uid,
					'start':moment(element.uotimeframe.replace(/[\[\]]/g,'').split(',')[0].slice(0,-6)).toDate(),
					'end': moment(element.uotimeframe.replace(/[\[\]]/g,'').split(',')[1].slice(0,-6)).toDate()
				}
			)
		})
		// console.log(intoDates)
		setAllDates(intoDates)
	}

	useEffect(()=>{
		let tempDates = allDates.filter(date => attendees.includes(date.uid))
		console.log(tempDates)
		setDates(tempDates)
	},[attendees])


	useEffect(()=>{
		getUserOccupances()
		getUsers()
		if((valueStart && valueEnd)&&(valueStart<valueEnd)){
			getRoomAtTimeframe()
		}else{
			setAvailableRooms([])
		}
	},[valueStart, valueEnd])

	const handleSelect = ({ start, end }) => {        
		const title = window.prompt('New Event name')
		if (title){
						let time = "["+moment(start).format('MM-DD-YYYY HH:mm')+", "+moment(end).format('MM-DD-YYYY HH:mm')+"]"
		}
}

	// const [userOccupances, setUserOccupances] = useState([])
	// let userOccupancesList = []
	const getUserOccupance=async(id)=>{
		const response = await readUserOccupance(id) 
		let userOccupancesList = response.map(obj => obj.uotimeframe)
		console.log(userOccupancesList)
		
		
		let occupancesIntoDates = userOccupancesList.map(element =>{
			return(
				{
					'startTime':element.replace(/[\[\]]/g,'').split(',')[0].slice(0,-6),
					'endTime': element.replace(/[\[\]]/g,'').split(',')[1].slice(0,-6)
				}
			)
		})
		// console.log(occupancesIntoDates)
		// let tempOcc2Str = localStorage.getItem('userOccupances') ? localStorage.getItem('userOccupances')+JSON.stringify(occupancesIntoDates):JSON.stringify(occupancesIntoDates)

		// localStorage.setItem('userOccupances', tempOcc2Str)

		// console.log(localStorage.getItem('userOccupances'),localStorage.getItem('userOccupances').length )
		// console.log(occupancesIntoDates)
		// setDates(occupancesIntoDates)

	}

    return(
					<div className={styles.wrapper}>

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
				<Dropdown
					placeholder='Select room'
					fluid
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
			{/* {console.log(attendees)} */}
		</form>
	</div>
	<Container style={{ height: 400, width:600 }}>
					<h1>Time occupied for attendees</h1>
		<Calendar
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
			</div>
    )
}

export default CreateMeeting;
