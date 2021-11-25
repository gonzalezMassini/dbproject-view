import React,{useState} from "react";
import { logIn } from "../../api/index.js";
import styles from './LoginForm.module.css'

const LoginForm=()=>{
    const [succesLog, setSuccesLog] = useState(false)
    const [wrongCredentials, setWrongCredentials] = useState(false)
    const [loginInput, setLoginInput] = useState({
        uemail: "",
        upassword: "",
      })
      let logInBodySend = {
        uemail: loginInput.uemail,
        upassword: loginInput.upassword
      }


      const handleLoginSubmit=async(e)=>{
        e.preventDefault();
        const result = await logIn(logInBodySend);
        let uid = result.uid
        if(typeof(uid)==='number'){
          sessionStorage.setItem('uid',uid)
          console.log(sessionStorage.getItem('uid'))
          setSuccesLog(true)
          window.location.reload(true)
        }else{
          console.log(uid)
          setWrongCredentials(true)
        }
          setLoginInput({uemail: "", upassword: "" });
    }
    const handleLogOut= async(e)=>{
        // e.preventDefault();
        sessionStorage.removeItem('uid')
      }

return(
    <div className={styles.container}>
        <a href='/'>Home</a>
            <form onSubmit={(e) => handleLoginSubmit(e)} className={styles.form}>
            Login
            <div>
            <span>Name:</span>
            <input
                className={styles.emailInput}
                placeholder='Email'
                onChange={(e) =>
                setLoginInput({ ...loginInput, uemail: e.target.value })
                }
                value={loginInput.uemail}
            />
            </div>
            <div>
            <span>Password:</span>
            <input
                value={loginInput.upassword}
                onChange={(e) =>
                setLoginInput({ ...loginInput, upassword: e.target.value })
                }
                placeholder='password'
            />
            </div>
            <button>Loing</button>
            {succesLog ? <p onClick={()=>setSuccesLog(false)} >succesfully logged in</p>:null}
            {wrongCredentials ? <p onClick={()=>setWrongCredentials(false)} >wrong credentials</p>:null}
        </form>
        <form onSubmit={(e)=>handleLogOut(e)}>
            <button>Logout</button>
        </form>
        </div>
    )
}

export default LoginForm