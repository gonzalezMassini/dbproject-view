import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import HomePage from "./components/HomePage.js";
import BookMeeting from "./components/BookMeeting.js";
import 'semantic-ui-css/semantic.min.css'
import UserView from "./components/UserView.js";
import Dashboard from "./components/Dashboard.js";
import Test from "./components/Test/Test.js"
import Default from "./components/Default/Default.js"
import RegisterForm from './components/RegisterForm/RegisterForm.js'
import NotLogged from './components/NotLogged/NotLogged.js'
import LandingPage from './components/LandingPage/LandingPage'
import Profile from './components/Profile/Profile';


const App =()=>{
    const handleLogOut= async(e)=>{
        // e.preventDefault();
        sessionStorage.removeItem('uid')
        // const result = await logOut()
        // console.log(result)
      }
    return(
        <BrowserRouter>
        {/* {sessionStorage.getItem('name')? <p>Welcome, {sessionStorage.getItem('name')}</p>:<a href='/Register'>Login</a>} */}
        {sessionStorage.getItem('uid')? <p>Welcome, {sessionStorage.getItem('uid')}</p>:null}
         <Default/>
        {/* <form onSubmit={(e)=>handleLogOut(e)}>
            <button>Logout</button>
        </form>
      <a href='/'>  <button>Login</button></a> */}
            <Routes>
                {/* <Route exact path="/" element={<Default/>}/> */}
                {/* <Route exact path="/" element={ <RegisterForm/>}/> */}
                <Route exact path="/" element={ <LandingPage/>}/>

                <Route exact path="/Home" element={sessionStorage.getItem('uid')?<HomePage/>:<NotLogged/>} />
                <Route exact path="/UserView" element={sessionStorage.getItem('uid')?<UserView/>:<NotLogged/>} />
                <Route exact path="/Dashboard" element={sessionStorage.getItem('uid') ? <Dashboard/>:<NotLogged/>} />
                <Route exact path="/Test" element={sessionStorage.getItem('uid')?<Test/>:<NotLogged/>} />
                <Route exact path="/Profile" element={sessionStorage.getItem('uid')?<Profile/>:<NotLogged/>}/>
                {/* <Route exact path="/Register" element={<RegisterForm/>}/> */}
            </Routes>
            {/* <button onClick={()=> setIsLogin(false)} >Logout</button>
            <button onClick={()=> setIsLogin(true)} >Login</button> */}
        </BrowserRouter>
    )
}


ReactDOM.render(

    <App />,
    // <BrowserRouter>
    //     <Routes>
    //         <Route exact path="/" element={<Default/>}/>
    //         <Route exact path="/Home" element={<HomePage/>} />
    //         <Route exact path="/UserView" element={<UserView/>} />
    //         <Route exact path="/Dashboard" element={<Dashboard/>} />
    //         <Route exact path="/Test" element={<Test/>} />
    //         <Route exact path="/Register" element={<RegisterForm/>}/>
    //     </Routes>
    //     <button onClick={()=> isLogin=false} >Logout</button>
    //     <button onClick={()=> isLogin=true} >Login</button>
    // </BrowserRouter>,
    document.getElementById('root')
);