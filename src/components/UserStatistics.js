import React, {useState, useEffect} from 'react'
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, Cell} from "recharts";
import {readMostBookedRoom, readUserMostBookedWith} from '../api/index.js'
import { Container} from "semantic-ui-react";




const UserStatistics = () => {
 const barColors = ["#1f77b4", "#ff7f0e"]

    const [thisUserMostUsedRoom,setThisUserMostUsedRoom] = useState({"rnumber":'',"times used":0})
    const getMostBookedRoom=async()=>{
        const mostBookedRoomResponse = await readMostBookedRoom(sessionStorage.getItem('uid'))
        const mostBookedRoom = mostBookedRoomResponse['most used room']
        if(mostBookedRoom){
            setThisUserMostUsedRoom(mostBookedRoom)
        }
    }

    const [thisUserMostBookedWith,setThisUserMostBookedWith] = useState({"uname":"","times booked":0})
    const getMostBookedWith=async()=>{
        const mostBookedWithResponse = await readUserMostBookedWith(sessionStorage.getItem('uid'))
        const mostBookedWith = mostBookedWithResponse['most_booked_with'][0]
        if(mostBookedWith){
            setThisUserMostBookedWith(mostBookedWith)
        } 
    }
    const data = [
        {name: `Most booked user: ${thisUserMostBookedWith.uname}`, Counts: thisUserMostBookedWith['times booked']},
        {name: `Most booked room: ${thisUserMostUsedRoom.rnumber}`, Counts: thisUserMostUsedRoom['times used']}]

      useEffect(()=>{
         getMostBookedRoom()
         getMostBookedWith()
     },[])

 return (
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

export default UserStatistics
