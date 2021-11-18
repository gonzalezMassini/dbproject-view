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

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/Home" element={<HomePage/>} />
            <Route exact path="/UserView" element={<UserView/>} />
            <Route exact path="/Dashboard" element={<Dashboard/>} />
            <Route exact path="/Test" element={<Test/>} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
