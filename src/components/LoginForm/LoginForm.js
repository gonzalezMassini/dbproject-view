import React,{useState} from "react";
import { logIn } from "../../api/index.js";
import styles from './LoginForm.module.css'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const LoginForm=(props)=>{
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


    // let history = useHistory();
    let navigate = useNavigate();

      const handleLoginSubmit=async(e)=>{
        e.preventDefault();
        const result = await logIn(logInBodySend);
        let uid = result.uid
        let role = result.urole
        if(typeof(uid)==='number'){
          sessionStorage.setItem('uid',uid)
          sessionStorage.setItem('urole',role)
          console.log(sessionStorage.getItem('uid'))
          setSuccesLog(true)
          // window.location.reload(true)
          navigate('/UserView')
          window.location.reload(true)
          // history.push("/UserView");
          // props.history.push('/UserView')
          // return <Redirect to='/UserView' />
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
  <div className={styles.card}>
    
    <div className={styles.container}>
            <form onSubmit={(e) => handleLoginSubmit(e)} className={styles.form}>
            <div className={styles.login}>Login</div>
            <div className={styles.nameInput}>
            <span>Email:</span>
            <input className={styles.paddingInput}
                placeholder='email'
                onChange={(e) =>
                  setLoginInput({ ...loginInput, uemail: e.target.value })
                }
                value={loginInput.uemail}
                />
            </div>
            <div className={styles.passwordInput}>
            <span>Password:</span>
            <input className={styles.paddingInput}
                value={loginInput.upassword}
                onChange={(e) =>
                  setLoginInput({ ...loginInput, upassword: e.target.value })
                }
                placeholder='password'
                />
            </div>
            <button className={styles.button}>Loing</button>
            {succesLog ? <p onClick={()=>setSuccesLog(false)} >succesfully logged in</p>:null}
            {wrongCredentials ? <p onClick={()=>setWrongCredentials(false)} >wrong credentials</p>:null}
        </form>
        </div>
      </div>
    )
}


export default LoginForm