import React from "react";
import styles from '../Default/Default.module.css'

const Default=()=>{
    return(
        <div className={styles.container}>
            <a href='/Home'>Home</a>
            <a href='/UserView'>UserView</a>
            <a href='/Dashboard'>Dashboard</a>
            <a href='/Test'>Test</a>
        </div>
    )
}

export default Default