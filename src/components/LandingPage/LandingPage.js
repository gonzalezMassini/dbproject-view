import React from "react";
import LoginForm from '../LoginForm/LoginForm.js'
import RegisterForm from "../RegisterForm/RegisterForm";
import styles from './LandingPage.module.css'


const LandingPage =()=>{
    return(
        <div className={styles.body}>
            <RegisterForm/>
            <div className={styles.vl}></div>
            <LoginForm/>
        </div>
    )
}


export default LandingPage