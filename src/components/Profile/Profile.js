import React, { useEffect, useState } from "react";
import { readUser } from "../../api";
import styles from './Profile.module.css'

const Profile =()=>{
    console.log(sessionStorage.getItem('uid'))

    const [user, setUser] = useState({})

    const getUser =async()=>{
        const readUserResponse = await readUser(sessionStorage.getItem('uid'))
        console.log(readUserResponse)
        setUser(readUserResponse)
    }


    useEffect(()=>{
        getUser()
        
    },[])
    return(
        <div className={styles.container}>
            profile
            <div>
                <p>id: {user.uid}</p>
                <p>name: {user.uname}</p>
                <p>role: {user.urole}</p>
            </div>

        </div>
    )
}

export default Profile