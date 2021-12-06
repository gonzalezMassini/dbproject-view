import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Tab} from "semantic-ui-react";
import Schedule from "./Schedule";
import Meetings from './Meetings/Meetings';
import RoomManagement from './RoomManagement/RoomManagement';
import UserStatistics from './UserStatistics';


function UserView(props){

    const renderUserStatistics=()=>{
        return(
            <UserStatistics/>
        )
    }
    const panes = [
        {
            menuItem: 'Schedule', render: () => <Schedule/>
        },
        {
            menuItem: 'Room Management', render: () => <RoomManagement/>
        },
        {
            menuItem: 'Create Meeting', render: ()=> <Meetings/>
        },
        {
            menuItem: 'User Statistics', render: () => renderUserStatistics()
        },
    ]
    panes.forEach(pane => {
        if(sessionStorage.getItem('urole')!=='super admin' && pane.menuItem === 'Room Management'){
            panes.splice(panes.indexOf(pane),1)
        }
    })


    const handleActivePane=()=>{
        const activePane = localStorage.getItem('activePane')
        localStorage.removeItem('activePane')
        return activePane
    }

    return(
        <>
            <Tab panes={panes} defaultActiveIndex={localStorage.getItem('activePane') ? handleActivePane():0}/>
        </>
    )
    

}
export default UserView;
