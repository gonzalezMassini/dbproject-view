import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import {createUser} from '../../api/index.js'
import { Dropdown } from 'semantic-ui-react'


const RegisterForm = () => {


  const [userInput, setUserInput] = useState({
    uemail: "",
    uname: "",
    upassword: "",
    urole: "",
  });

  


  




  const handleSubmit = async (e) => {
    e.preventDefault();
    let bodySend = {
      uemail: userInput.uemail,
      uname: userInput.uname,
      upassword: userInput.upassword,
      urole: userInput.urole,
    }
    if(bodySend.uemail && bodySend.uname && bodySend.upassword && bodySend.urole){
      const createUserResponse = await createUser(bodySend);
      console.log(createUserResponse)
      setUserInput({ uemail: "", uname: "", upassword: "", urole: "" });
    }
  };




	const roleOptions = [{
		key: 1,
		text: "Student",
		value: 'student'
	},
  {
    key: 2,
		text: "Professor",
		value: "professor"
	},
]

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
          <Dropdown
            placeholder='select role'
            fluid
            selection
            options={roleOptions}
            onChange={(e,{value})=> {setUserInput({...userInput, urole: value});}}
            />
          </div>
        <button className={styles.button}>submit</button>
      </form>
    </div>
      </div>
  );
};

export default RegisterForm;
