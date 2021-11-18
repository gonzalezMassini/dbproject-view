import React, { useEffect, useState } from "react";
import {readUsers} from '../../api/index.js'
import Card from '../Card/Card.js'
import styles from '../Test/Test.module.css'

const Test=()=>{
    const [users, setUsers] = useState([])
    const getUsers=async()=>{
        const usersResponse = await readUsers()
        const usersList = await usersResponse.users
        console.log(usersList)
        setUsers(usersList)
    }
    useEffect(()=>{
        getUsers()
    },[])
    return(
        <div className={styles.container}>
            {users.map((user)=>{
                return(
                    <div key={user.uid} >
                        <Card 
                            uid={user.uid}
                            uname={user.uname}
                            urole={user.urole}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Test