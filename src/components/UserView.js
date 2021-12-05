import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Tab} from "semantic-ui-react";
import Schedule from "./Schedule";
import Meetings from './Meetings/Meetings';
import RoomManagement from './RoomManagement/RoomManagement';
import UserStatistics from '../UserStatistics';


function UserView(){

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


    return(
        <>
            <Tab panes={panes}/>
        </>
    )

}
export default UserView;
