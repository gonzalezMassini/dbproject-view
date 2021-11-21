import React from "react";
import LoginForm from '../LoginForm/LoginForm.js'
import RegisterForm from "../RegisterForm/RegisterForm";


const LandingPage =()=>{
    return(
        <div>
            <RegisterForm/>
            <LoginForm/>
        </div>
    )
}


export default LandingPage