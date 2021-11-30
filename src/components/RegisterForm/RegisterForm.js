import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import {createUser, logIn, logOut, defaultGet} from '../../api/index.js'

const RegisterForm = () => {

  const [succesLog, setSuccesLog] = useState(false)
  const [wrongCredentials, setWrongCredentials] = useState(false)

  const [userInput, setUserInput] = useState({
    uemail: "",
    uname: "",
    upassword: "",
    urole: "",
  });

  const [loginInput, setLoginInput] = useState({
    uemail: "",
    upassword: "",
  })


  let bodySend = {
    uemail: userInput.uemail,
    uname: userInput.uname,
    upassword: userInput.upassword,
    urole: userInput.urole,
  }


  let logInBodySend = {
      uemail: loginInput.uemail,
      upassword: loginInput.upassword
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(bodySend.uemail && bodySend.uname && bodySend.upassword && bodySend.urole){
      const createUserResponse = await createUser(bodySend);
      console.log(createUserResponse)
      setUserInput({ uemail: "", uname: "", upassword: "", urole: "" });
    }
  };
  const handleLoginSubmit=async(e)=>{
    e.preventDefault();
    // sessionStorage.setItem('name', userInput.uname)
    const result = await logIn(logInBodySend);
    // console.log(result)
    let uid = result.uid
    if(typeof(uid)==='number'){
      let name = loginInput.uemail
      sessionStorage.setItem('name',name)
      setSuccesLog(true)
      window.location.reload(true)
    }else{
      console.log(uid)
      setWrongCredentials(true)
    }

    // console.log('here');
    // console.log(result.uid)
    // console.log(result)
    setLoginInput({uemail: "", upassword: "" });
}

  
  const handleLogOut= async(e)=>{
    // e.preventDefault();
    sessionStorage.removeItem('name')
    // const result = await logOut()
    // console.log(result)
  }

  const handleDefault=async(e)=>{
    // const result = await defaultGet()
    // console.log(result)
    let uid = sessionStorage.getItem('uid')
    if(uid){
      console.log(uid)
    }else{
      console.log('must log in')
    }
  }



  return (
    <div className={styles.card}>

    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form} action=''>
      <div className={styles.register}>Register</div>
        <div className={styles.emialInput}>
          <span>Email:</span>
          <input
            className={styles.paddingInput}
            placeholder='email'
            onChange={(e) =>
              setUserInput({ ...userInput, uemail: e.target.value })
            }
            value={userInput.uemail}
            />
        </div>

        <div className={styles.nameInput}>
          <span>Name:</span>
          <input
          className={styles.paddingInput}
            placeholder='name'
            onChange={(e) =>
              setUserInput({ ...userInput, uname: e.target.value })
            }
            value={userInput.uname}
            />
        </div>

        <div className={styles.passwordInput}>
          <span>Password:</span>
          <input
            className={styles.paddingInput}
            value={userInput.upassword}
            onChange={(e) =>
              setUserInput({ ...userInput, upassword: e.target.value })
            }
            placeholder='password'
            />
        </div>

        <div className={styles.roleInput}>
          <span>Role:</span>
          <input className={styles.paddingInput}
            value={userInput.urole}
            onChange={(e) =>
              setUserInput({ ...userInput, urole: e.target.value })
            }
            placeholder='role'
            />
        </div>
        <button className={styles.button}>submit</button>
      </form>
      {/* <form onSubmit={(e) => handleLoginSubmit(e)} className={styles.form}>
        Login
        <div>
        <span>Name:</span>
        <input
        className={styles.emialInput}
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
      </form> */}
    </div>
      </div>
  );
};

export default RegisterForm;
