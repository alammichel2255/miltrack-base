import React, { useEffect, useState} from 'react';
import { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppContext } from "./AppContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './components/dashboard';
import Profile from "./components/profile";
import Navbar from "./components/Navbar";
import IndivTag from "./components/IndivTag";
import SubTag from "./components/SubTag";
import styled from 'styled-components';

import config from './config'

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;



function App() {
  // const [ loggedUser, setLoggedUser ] = useState([{"id":1,"username":null,"name":"Loading...","password":"1234","rank":"E4", "mos": "Loading...", "current_status": "PDY", "supervisor_id" : null,"organization_id":1}]);
  const [ loggedUser, setLoggedUser ] = useState([]);
  const [ allUsers, setAllUsers ] = useState([]);
  const [ loggedUserOrg, setLoggedUserOrg ] = useState([]);
  const [ loggedUserToggle, setLoggedUserToggle ] = useState(0);
  const [ loggedUserSummary, setLoggedUserSummary ] = useState([]);
  const [ loggedUserServiceMembers, setLoggedUserServiceMembers ] = useState([]);
  const [ loggedUserServiceMemberSummaries, setLoggedUserServiceMemberSummaries ] = useState([]);
  const [ loggedUserServiceMemberPromiseChainComplete, setLoggedUserServiceMemberPromiseChainComplete ] = useState(false);
  const [ loggedUserPromiseChainComplete, setLoggedUserPromiseChainComplete ] = useState(false);
  const [ updateFieldsToggle, setUpdateFieldsToggle ] = useState(0);
  const [loggedUser2, setLoggedUser2] = useState();
  const [ orgData, setOrgData ] = useState([]);
  const [ noUser, setNoUser ] = useState(false);
  const [ hidePersonalInfo, setHidePersonalInfo ] = useState(0);
  const [ fieldChanged, setFieldChanged ] = useState(0);
  const [ newFieldChanges, setNewFieldChanges ] = useState([]);
  const [ fieldFetchesComplete, setFieldFetchesComplete ] = useState(0);

  const [ serviceMember, setServiceMember ] = useState([]);
  const [ formattedItemsCollection, setFormattedItemsCollection ] = useState([]);
  const [ allPostPromisesComplete, setAllPostPromisesComplete ] = useState(0);
  const [ itemToBeDeleted, setItemToBeDeleted ] = useState({});
  const [ serviceMemberSummary, setServiceMemberSummary ] = useState([]);

  useEffect(() => {
    fetch('https://miltrack-db.herokuapp.com/users')
    .then(response => response.json())
    .then(data => setAllUsers(data))
  }, [])

  // Temporary use effect to set hardcoded LoggedInUser until we have logging in functionality

  useEffect(() => {
    fetch('https://miltrack-db.herokuapp.com/users')
    /*.then(response => response.json())
    .then(data => setLoggedUser([{"id":1,"username":null,"name":"Russell Annis","password":"1234","rank":"E4", "mos": "17C", "current_status": "PDY", "supervisor_id" : null,"organization_id":1}]))
    .then(data => {
        console.log(loggedUser)
        console.log("Hello!")
    
    })*/
    .then(data => {
      setLoggedUserToggle(loggedUserToggle + 1)
    })
  }, [])

  // useEffect(() => {
  //   fetch('https://miltrack-db.herokuapp.com/users')
  //   // .then(response => response.json())
  //   // .then(data => setLoggedUser([{"username":null,"name":"Russell Annis","password":"1234","rank":"E4", "mos": "17C", "current_status": "PDY", "supervisor_id" : null,"organization_id":1}]))
  //   // .then(data => {
  //   //     console.log(loggedUser)
  //   //     console.log("Hello!")

    
  //   // })
  //   .then(data => {
  //     setLoggedUserToggle(loggedUserToggle + 1)
  //   })
  // }, [])


  // set loggedUser's subordinates if he/she has any

  useEffect(() => {
    fetch(`https://miltrack-db.herokuapp.com/organization/`)
    .then(response => response.json())
    .then(data => setOrgData(data))
  }, [])


  const getterSetters = {
    allUsers, 
    setAllUsers,
    loggedUser,
    setLoggedUser,
    loggedUserOrg,
    setLoggedUserOrg,
    loggedUserToggle,
    setLoggedUserToggle,
    loggedUserSummary,
    setLoggedUserSummary,
    loggedUserServiceMembers,
    setLoggedUserServiceMembers,
    loggedUserServiceMemberSummaries, 
    setLoggedUserServiceMemberSummaries,
    loggedUserServiceMemberPromiseChainComplete, 
    setLoggedUserServiceMemberPromiseChainComplete,
    loggedUserPromiseChainComplete,
    setLoggedUserPromiseChainComplete,
    updateFieldsToggle,
    setUpdateFieldsToggle,
    noUser,
    setNoUser,
    loggedUser2,
    setLoggedUser2,
    orgData,
    setOrgData,
    hidePersonalInfo,
    setHidePersonalInfo,
    fieldChanged,
    setFieldChanged,
    newFieldChanges,
    setNewFieldChanges,
    fieldFetchesComplete,
    setFieldFetchesComplete,
    serviceMember,
    setServiceMember,
    formattedItemsCollection,
    setFormattedItemsCollection,
    allPostPromisesComplete, 
    setAllPostPromisesComplete,
    itemToBeDeleted, 
    setItemToBeDeleted,
    serviceMemberSummary,
    setServiceMemberSummary

  }

  // const testObject = {
  //   id: 1, pha_date: new new Date('2021-03-21').toString().toString(), dental_date: new Date('2021-03-21').toString(), hearing_date: new Date('2021-03-21').toString() 
  // }

  // const userObject = {
  //   id: 10, username: "billy", password: "a;sdkfjn;alkshdfoiajsd;lfj", rank: "SSG", full_name: "Justin Hernandez", status: "TDY"
  // }

  // const testArrayOfObjects = [
  //   { id: 2, pha_date: new Date('2021-03-21').toString(), dental_date: new Date('2021-03-21').toString(), hearing_date: new Date('2021-03-21').toString(), vaccination_date: new Date('2021-03-21').toString() },
  //   { id: 3, training_name: new Date('2021-03-21').toString(), training_date: Date('2019-02-01') },
  // ]

  return (
    <AppContext.Provider value={ getterSetters }>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={loggedUser === [] ? <>Loading...</> : <Dashboard/>} />
            <Route path="/:userid" element={<Profile />} />
          </Routes>
      </Router>
    </AppContext.Provider>    
  )
};

export default App;
