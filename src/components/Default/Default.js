import React from "react";
import styles from '../Default/Default.module.css'



const Default=()=>{
    const handleLogOut= async(e)=>{
        sessionStorage.removeItem('uid')
    }
    return(
        <div className={styles.container}>
            <a href='/' className={styles.headerlinks}>Home</a>
            <a href='/UserView' className={styles.headerlinks}>UserView</a>
            <a href='/Dashboard' className={styles.headerlinks}>Dashboard</a>
            {/* <a href='/Test' className={styles.headerlinks}>Test</a> */}
            <a href='/Profile' className={styles.headerlinks}>Profile</a>
            <form onSubmit={(e)=>handleLogOut(e)}>
                <button className={styles.button}>Logout</button>
            </form>
            <a href='/'><button className={styles.button}>Login</button></a>
        </div>
    )
}

export default Default