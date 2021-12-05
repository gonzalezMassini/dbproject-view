import React, { useEffect, useState } from "react";
import { readUser } from "../../api";
import styles from './Profile.module.css'
import { updateUser } from "../../api";

const Profile =()=>{

    const [user, setUser] = useState({})
    
    const [editUserInput, setEditUserInput] = useState({"uemail":"", "upassword":"", "uname":""})
    const [isEdit, setIsEdit] = useState(false)

    const getUser =async()=>{
        const readUserResponse = await readUser(sessionStorage.getItem('uid'))
        console.log(readUserResponse)
        setUser(readUserResponse)
    }


    const handleEditSubmit=async(e)=>{
        e.preventDefault()
        if(editUserInput.uemail || editUserInput.uname || editUserInput.upassword){
            let bodySend={
                "uemail":editUserInput.uemail ? editUserInput.uemail:user.uemail,
                "upassword":editUserInput.upassword ? editUserInput.upassword:user.upassword,
                "uname":editUserInput.uname ? editUserInput.uname : user.uname
            }
            await updateUser(sessionStorage.getItem('uid'), bodySend)
            window.location.reload(true)
        }
        setIsEdit(prev => !prev)
    }

    useEffect(()=>{
        getUser()
        
    },[])
    return(
        <div className={styles.container}>
            profile
            {!isEdit ?<div>
                <p>id: {user.uid}</p>
                <p>name: {user.uname}</p>
                <p>email: {user.uemail}</p>
                <p>role: {user.urole}</p>
            </div>
            :
            <form onSubmit={handleEditSubmit}>
                <div className={styles.register}>Edit Profile</div>
                <div className={styles.emialInput}>
                    <span>Email:</span>
                    <input
                        className={styles.paddingInput}
                        placeholder='email'
                        onChange={(e) =>
                        setEditUserInput({ ...editUserInput, uemail: e.target.value })
                        }
                        value={editUserInput.uemail}
                        />
                </div>

                <div className={styles.nameInput}>
                    <span>Name:</span>
                    <input
                    className={styles.paddingInput}
                        placeholder='name'
                        onChange={(e) =>
                        setEditUserInput({ ...editUserInput, uname: e.target.value })
                        }
                        value={editUserInput.uname}
                        />
                </div>

                <div className={styles.passwordInput}>
                    <span>Password:</span>
                    <input
                        className={styles.paddingInput}
                        value={editUserInput.upassword}
                        onChange={(e) =>
                        setEditUserInput({ ...editUserInput, upassword: e.target.value })
                        }
                        placeholder='password'
                        />
                </div>
                <button className={styles.button}>submit</button>
                <button onClick={()=>setIsEdit(prev => !prev)}>cancel</button>
            </form>
            }
            {!isEdit ? <button onClick={(e)=> {e.preventDefault(); setIsEdit(prev => !prev)}}>edit profile</button>:null}       
        </div>
    )
}

export default Profile