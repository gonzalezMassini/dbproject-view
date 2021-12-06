import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, BrowserRouter, Routes, useNavigate} from 'react-router-dom';
import HomePage from "./components/HomePage.js";
import 'semantic-ui-css/semantic.min.css'
import UserView from "./components/UserView.js";
import Dashboard from "./components/Dashboard.js";
import Default from "./components/Default/Default.js"
import NotLogged from './components/NotLogged/NotLogged.js'
import LandingPage from './components/LandingPage/LandingPage'
import Profile from './components/Profile/Profile';


const App =()=>{
    
    return(
        <BrowserRouter>
        {/* {sessionStorage.getItem('uid')? <p>Welcome, {sessionStorage.getItem('uid')}</p>:null} */}
         <Default/>
            <Routes>
                <Route exact path="/" element={ <LandingPage/>}/>

                <Route exact path="/Home" element={sessionStorage.getItem('uid')?<HomePage/>:<NotLogged/>} />
                <Route exact path="/UserView" element={sessionStorage.getItem('uid')?<UserView/>:<NotLogged/>} />
                <Route exact path="/Dashboard" element={sessionStorage.getItem('uid') ? <Dashboard/>:<NotLogged/>} />
                <Route exact path="/Profile" element={sessionStorage.getItem('uid')?<Profile/>:<NotLogged/>}/>
            </Routes>
        </BrowserRouter>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);