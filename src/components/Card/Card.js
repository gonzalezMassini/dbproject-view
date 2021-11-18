import React from "react";
import styles from '../Card/Card.module.css'


const Card=(props)=>{
    const {uid, uname, urole} = props
    return(
        <div className={styles.container}>
            <p>id: {uid}</p>
            <p>name: {uname}</p>
            <p>role: {urole}</p>
        </div>
    )
}

export default Card