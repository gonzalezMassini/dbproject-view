import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import {createUser} from '../../api/index.js'

const RegisterForm = () => {
  const [userInput, setUserInput] = useState({
    uemail: "",
    uname: "",
    upassword: "",
    urole: "",
  });

  let bodySend = JSON.stringify({
    uemail: userInput.uemail,
    uname: userInput.uname,
    upassword: userInput.upassword,
    urole: userInput.urole,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(bodySend);
    console.log(userInput);
    setUserInput({ uemail: "", uname: "", upassword: "", urole: "" });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form} action=''>
        <div>
          <span>Email:</span>
          <input
            className={styles.emialInput}
            placeholder='email'
            onChange={(e) =>
              setUserInput({ ...userInput, uemail: e.target.value })
            }
            value={userInput.uemail}
          />
        </div>

        <div>
          <span>Name:</span>
          <input
            placeholder='name'
            onChange={(e) =>
              setUserInput({ ...userInput, uname: e.target.value })
            }
            value={userInput.uname}
          />
        </div>

        <div>
          <span>Password:</span>
          <input
            value={userInput.upassword}
            onChange={(e) =>
              setUserInput({ ...userInput, upassword: e.target.value })
            }
            placeholder='password'
          />
        </div>

        <div>
          <span>Role:</span>
          <input
            value={userInput.urole}
            onChange={(e) =>
              setUserInput({ ...userInput, urole: e.target.value })
            }
            placeholder='role'
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
