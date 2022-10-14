//const { useState } = require("react")
import React, { useState, useEffect, useContext } from "react";
import './profile.css';
import styled from 'styled-components';
import IndivTag from "./IndivTag";
import { Medical, AnnualTraining, SpecialTraining, StaticTraining } from "./ProfileCards";
import { Link, useNavigate } from "react-router-dom";
//this is for test or dummy data
import { AppContext } from '../AppContext';
import { FaTruckLoading } from "react-icons/fa";

const rankHelper = (rank) => {
    // console.log("Rank: ", rank);
    switch (rank.toLowerCase()) {
        case "e1":
            return "PVT";
        case "e2":
            return "PV2";
        case "e3":
            return "PFC";
        case "e4":
            return "SPC";
        case "e5":
            return "SGT";
        case "e6":
            return "SSG";
        case "e7":
            return "SFC";
        case "e8":
            return "1SG";
        case "e9":
            return "CSM";
        case "o1":
            return "2LT";
        case "o2":
            return "1LT";
        case "o3":
            return "CPT";
        case "o4":
            return "MAJ";
        case "o5":
            return "LTC";
        case "o6":
            return "COL";
        default:
            return "";
    }
}

const userObject = {
    users_id: 1, username: "billy", password: "a;sdkfjn;alkshdfoiajsd;lfj", rank: "SPC", full_name: "Justin Hernandez", status: "TDY"
}

// userObject.users_id will equal 1
// console.log(userObject.users_id)
// = 1

const medicalBar = {
    name: "Medical Status"
}

const medicalTestArrayOfObjects = [
    { id: 1, pha_date: "2022-10-20" },
    { id: 2, dental_date: "2022-12-30" },
    { id: 3, hearing_date: "2023-10-21" },
    { id: 4, vision_date: "2022-10-21" },
    { id: 5, hiv_date: "2019-03-03" }
]


const annualRequirementsTestArrayOfObjects = [
    { id: 1, skill_name: "SHARP TRAINING", refresh_date: "2022-11-01", users_id: 1 },
    { id: 2, skill_name: "EO TRAINING", refresh_date: '2022-12-30', users_id: 1 },
    { id: 3, skill_name: "ONLINE TRAINING", refresh_date: '2022-10-05', users_id: 1 },
    { id: 4, skill_name: "TARP TRAINING", refresh_date: "2022-11-01", users_id: 1 },
]
/*table.increments('id');
table.string('skill_name');
table.string('skill_refresh_date');
table.integer('users_id');
 */

const specialSkillsTestArrayOfObjects = [
    { id: 1, skill_name: "Fuck All", refresh_date: "2022-06-06", users_id: 1 },
    { id: 2, skill_name: "Radio Operator", refresh_date: '2022-11-01', users_id: 1 },
    { id: 3, skill_name: "JTAC", refresh_date: '2023-03-21', users_id: 1 },
    { id: 1, skill_name: "Foreign Language", refresh_date: "2022-06-06", users_id: 1 },
    { id: 2, skill_name: "Radio Operator", refresh_date: '2022-11-01', users_id: 1 },
    { id: 3, skill_name: "JTAC", refresh_date: '2023-03-21', users_id: 1 },
    { id: 1, skill_name: "Foreign Language", refresh_date: "2022-06-06", users_id: 1 },
    { id: 2, skill_name: "Radio Operator", refresh_date: '2022-11-01', users_id: 1 },
    { id: 3, skill_name: "JTAC", refresh_date: '2023-03-21', users_id: 1 },
    { id: 1, skill_name: "Foreign Language", refresh_date: "2022-06-06", users_id: 1 },
    { id: 2, skill_name: "Radio Operator", refresh_date: '2022-11-01', users_id: 1 },
    { id: 3, skill_name: "JTAC", refresh_date: '2023-03-21', users_id: 1 },
    { id: 1, skill_name: "Foreign Language", refresh_date: "2022-06-06", users_id: 1 },
    { id: 2, skill_name: "Radio Operator", refresh_date: '2022-11-01', users_id: 1 },
    { id: 3, skill_name: "JTAC", refresh_date: '2023-03-21', users_id: 1 },
]


const staticSkillsTestArrayOfObjects = [
    { id: 1, name: "Airborne School", skill_date: "2016-07-01" },
    { id: 2, name: "Ranger School", skill_date: "2018-09-01" },
    { id: 3, name: "SEC+ Certification", skill_date: "2022-05-01" },
    { id: 4, name: "Air Assault School", skill_date: "2016-07-01" },
    { id: 5, name: "Ranger School", skill_date: "2018-09-01" },
    { id: 6, name: "C+ Certification", skill_date: "2022-05-01" },
    { id: 7, name: "Sniper School", skill_date: "2016-07-01" },
    { id: 8, name: "Sapper School", skill_date: "2018-09-01" },
    { id: 9, name: "NDC Certification", skill_date: "2022-05-01" },
    { id: 10, name: "Touchstone", skill_date: "2016-07-01" },
    { id: 11, name: "Brighton", skill_date: "2018-09-01" },
    { id: 12, name: "Pencil Sharpening 101", skill_date: "2022-05-01" },
    { id: 13, name: "Scuba", skill_date: "2016-07-01" },
    { id: 14, name: "Common Fac Instructor", skill_date: "2018-09-01" },
    { id: 15, name: "IOCAP", skill_date: "2022-05-01" },
    { id: 16, name: "Gryiffin Group", skill_date: "2016-07-01" },
    { id: 17, name: "Spartan Marksman Course", skill_date: "2018-09-01" },
    { id: 18, name: "Vanguard Tactical School", skill_date: "2022-05-01" },
    { id: 19, name: "Galvanize SDI Bootcamp", skill_date: "2016-07-01" },
    { id: 20, name: "Powerpoint 101", skill_date: "2018-09-01" },

]

const userInfo = [
    { id: 1, name: "Joe Smith", rank: "SPC", dob: "2000-01-01", basd: "2020-07-01", unit_id: "B Co, 8th BN, 4th ID", dodid: 123456789, mos: "11C" },
]

function Profile() {

    let { 
        loggedUser, 
        setLoggedUser, 
        allUsers, 
        setAllUsers, 
        loggedUserOrg, 
        setLoggedUserOrg, 
        loggedUserToggle, 
        setLoggedUserToggle, 
        loggedUserSummary, 
        setLoggedUserSummary, 
        loggedUserPromiseChainComplete, 
        setLoggedUserPromiseChainComplete,
        updateFieldsToggle,
        setUpdateFieldsToggle,
        noUser,
        setNoUser,
        hidePersonalInfo,
        setHidePersonalInfo,
        fieldChanged,
        setFieldChanged,
        fieldFetchesComplete,
        setFieldFetchesComplete,
        loggedUserServiceMembers,
        setLoggedUserServiceMembers,
        serviceMember,
        setServiceMember,
        formattedItemsCollection,
        setFormattedItemsCollection,
        allPostPromisesComplete, 
        setAllPostPromisesComplete,
        serviceMemberSummary,
        setServiceMemberSummary

        } 

    = useContext(AppContext);

    // used for returning to home page if user is not logged in
    let navigate = useNavigate();

    // grab all users
    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(response => response.json())
            .then(data => setAllUsers(data))
    }, [])

    // Temporary use effect to set hardcoded LoggedInUser until we have logging in functionality
    // useEffect(() => {
    //     fetch('http://localhost:3001/users')
    //         .then(response => response.json())
    //         .then(data => setLoggedUser([{ id: 1}]))
    //         .then(data => {
    //             console.log(loggedUser);
    //             console.log("Hello!")

    //         })
    //         .then(data => {
    //             setLoggedUserToggle(loggedUserToggle += 1)
    //             console.log(loggedUserToggle);
    //         })
    //         .catch(err => {
    //             console.error("err: ", err)
    //         })
    // }, [])

    /*
        grab logged user org
    */
    useEffect(() => {
        console.log("this is the user" , loggedUser);
        fetch(`http://localhost:3001/organization/1`)
            .then(response => response.json())
            .then(data => setLoggedUserOrg(data[0].organization_name))
            .then(data => {
                console.log(loggedUserOrg)
                console.log(typeof loggedUserOrg)
                console.log("logged user org")
            })
            .catch(err => {
                console.error("err: ", err)
            })

    }, [loggedUserToggle])

    // grab all logged user information

    useEffect(() => {
        try {
            console.log(loggedUser[0]);
            let userId = loggedUser[0].id;
            let medicalPromise = (
                fetch(`http://localhost:3001/medical/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("medical promise")
                        return data;
                    })
            )
            let annualTrainingPromise = (
                fetch(`http://localhost:3001/annual_training/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("annual training promise")
                        return data;
                    })
            )

            let evaluationsPromise = (

                fetch(`http://localhost:3001/evaluations/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("evaluations promise")
                        return data;
                    })

            )

            let specialSkillsPromise = (
                fetch(`http://localhost:3001/special_skills/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("special skills promise")
                        return data;
                    })

            )

            let staticSkillsPromise = (

                fetch(`http://localhost:3001/static_skills/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("static skills promise")
                        return data;
                    })

            )
            // iterate through each promise and return the element (recursive), to prevent nested for loops below
            // in Promise.all

            let loggedUserArray = [];

            const promiseAllHelper = (promise, promiseLength) => {
                console.log("promiseAllhelper promise: ", promise);
                console.log("promiseAllhelper promiseLength: ", promiseLength);
                if (promiseLength == 0) {

                } else {

                    console.log("pushing promise[promiseLength - 1]: ", promise[promiseLength - 1]);
                    loggedUserArray.push(promise[promiseLength - 1])
                    promiseLength -= 1;
                    promiseAllHelper(promise, promiseLength)
                }


            }

        
            
            Promise.all([medicalPromise, annualTrainingPromise, specialSkillsPromise, staticSkillsPromise])
                .then((info) => {

                    console.log("all promises complete");
                    // add SM status from loggedUser
                    console.log(loggedUser[0].status)
                    loggedUserArray.push({ current_status: loggedUser[0].current_status });
                    for (let promise of info) {
                        console.log("promise: ", promise)
                        promiseAllHelper(promise, promise.length)
                    }
                    console.log("loggedUserArray: ", loggedUserArray);
                    setLoggedUserSummary(loggedUserArray);

                    /*

                        setTimeout(() => Promise.all(subordinatePromises)
                        .then((info) => {

                            setLoggedUserServiceMemberPromiseChainComplete(true);
                            console.log("all subordinate promises are complete");

                        }), 3000)

                    */
                })
                .then((info) => {

                    const timer = setTimeout(() => {
                        setLoggedUserPromiseChainComplete(true);
                        console.log("loggedUserPromiseChain complete");
                    }, 500)
                    return () => clearTimeout(timer);
                    
                })
                console.log("loggedUserToggle: ", loggedUserToggle)

        } catch (error) {

            loggedUser[0] === undefined ? setNoUser(true) : console.log(error)

        }

        

    }, [loggedUserToggle, fieldChanged, updateFieldsToggle, allPostPromisesComplete])

    // grab all service member user information

    useEffect(() => {
        try {
            console.log("servicemember inside profile: ", serviceMember);
            let userId = serviceMember.id;
            let medicalPromise = (
                fetch(`http://localhost:3001/medical/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("medical promise")
                        return data;
                    })
            )
            let annualTrainingPromise = (
                fetch(`http://localhost:3001/annual_training/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("annual training promise")
                        return data;
                    })
            )

            let evaluationsPromise = (

                fetch(`http://localhost:3001/evaluations/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("evaluations promise")
                        return data;
                    })

            )

            let specialSkillsPromise = (
                fetch(`http://localhost:3001/special_skills/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("special skills promise")
                        return data;
                    })

            )

            let staticSkillsPromise = (

                fetch(`http://localhost:3001/static_skills/${userId}`)
                    .then(response => response.json())
                    .then(data => {

                        // setLoggedUserSummary([...loggedUserSummary, ...data])
                        console.log("static skills promise")
                        return data;
                    })

            )
            // iterate through each promise and return the element (recursive), to prevent nested for loops below
            // in Promise.all

            let loggedUserArray = [];

            const promiseAllHelper = (promise, promiseLength) => {
                console.log("promiseAllhelper promise: ", promise);
                console.log("promiseAllhelper promiseLength: ", promiseLength);
                if (promiseLength == 0) {

                } else {

                    console.log("pushing promise[promiseLength - 1]: ", promise[promiseLength - 1]);
                    loggedUserArray.push(promise[promiseLength - 1])
                    promiseLength -= 1;
                    promiseAllHelper(promise, promiseLength)
                }


            }

        
            
            Promise.all([medicalPromise, annualTrainingPromise, specialSkillsPromise, staticSkillsPromise])
                .then((info) => {

                    console.log("all promises complete");
                    // add SM status from loggedUser
                    //
                    console.log("serviceMember inside useEffect pull: ", serviceMember);
                    loggedUserArray.push({ current_status: serviceMember.current_status });
                    for (let promise of info) {
                        console.log("promise: ", promise)
                        promiseAllHelper(promise, promise.length)
                    }
                    console.log("loggedUserArray: ", loggedUserArray);
                    setServiceMemberSummary(loggedUserArray);

                    /*

                        setTimeout(() => Promise.all(subordinatePromises)
                        .then((info) => {

                            setLoggedUserServiceMemberPromiseChainComplete(true);
                            console.log("all subordinate promises are complete");

                        }), 3000)

                    */
                })
                .then((info) => {

                    const timer = setTimeout(() => {
                        setLoggedUserPromiseChainComplete(true);
                        console.log("loggedUserPromiseChain complete");
                    }, 500)
                    return () => clearTimeout(timer);
                    
                })
                console.log("loggedUserToggle: ", loggedUserToggle)

        } catch (error) {

            console.log(error);

        }

        

    }, [serviceMember, loggedUserToggle, fieldChanged, updateFieldsToggle, allPostPromisesComplete])

    // used for all post requests made for adding trainings (AddItem component)
    useEffect(() => {

        try {

            let userId = loggedUser[0].id;
            let allPostPromises = [];


            const recursiveCreateFetchesFunction = (array, arrayLength, arrayType) => {

                if (arrayLength == 0) {

                } else {
                    let promise = (
                        fetch(`http://localhost:3001/${arrayType}/${userId}`, {
                            method: 'POST',
                            body: JSON.stringify(array[arrayLength - 1]),
                            headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                        })
                        .then(response => response.json())
                        .then(data => console.log("Success: ", data))
                        .catch(err => console.log("err: ", err))
                    )
    
                    allPostPromises.push(promise);
    
                    arrayLength -= 1;
                    
                    recursiveCreateFetchesFunction(array, arrayLength, arrayType)
                }

                

            }

            const fetchPostHelper = (array) => {

                if (array[0].training_name) {
                    let arrayType = "annual_training";
                    recursiveCreateFetchesFunction(array, array.length, arrayType);
                } else if (array[0].skill_refresh_date) {
                    let arrayType = "special_skills";
                    recursiveCreateFetchesFunction(array, array.length, arrayType);
                } else if (array[0].skill_date) {
                    let arrayType = "static_skills";
                    recursiveCreateFetchesFunction(array, array.length, arrayType);
                }

            }

            for (let formattedItemArray of formattedItemsCollection) {

                fetchPostHelper(formattedItemArray);

            }

            //formattedItemsCollection

            Promise.all(allPostPromises)
            .then(info => {
                console.log("All post promises complete")
            })
            .then(info => {
                
                setAllPostPromisesComplete(allPostPromisesComplete += 1);

            })
            .then(info => {
                // formatted items collection reset
                setFormattedItemsCollection([]);

            })

        } catch (error) {
            loggedUser[0] === undefined ? setNoUser(true) : console.log(error)
        }

    }, [fieldChanged])

    // if page is rerendered and user has been reset, return home to login.
    if (noUser) {
        console.log(noUser);
        navigate(`/`);
    }

    // const [apptDate, setApptDate] = useState("");
    // if loggedUser[0].supervisor_id is null then navigate to /dashboard
   // if (loggedUser[0].supervisor_id === null) {
   //     navigate(`/dashboard`);
   // } else
    if (loggedUser !== []) {

        if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined && loggedUser[0] !== undefined) {
            return (
                <>
                    {userInfo.map((val, key) => {
                        return (
                            <section key={key} id="wrapper" className="pb-8 m-12">
                                {loggedUser[0].username !== serviceMember.username ? 
                                    <section id='welcome_box' className="w-1/5 mx-auto p-4 min-w-fit max-w-fit bg-slate-100 opacity-90 rounded-md shadow-xl shadow-black">
                                    <div style={{color: '#1c464c', fontWeight: 'bold', fontSize: '30px'}}> You're Viewing: {serviceMember === undefined ? "Loading..." : serviceMember.name }</div>
                                    {console.log("thise is the service member:", serviceMember)}
                                    </section> :                              
                                <section id='welcome_box' className="w-1/5 mx-auto p-4 min-w-fit max-w-fit bg-slate-100 opacity-90 rounded-md shadow-xl shadow-black">
                                    <tr key={key}>
                                        <div>{loggedUserOrg}</div>
                                        <div>Welcome, {rankHelper(loggedUser[0].rank)} {loggedUser[0].name}</div>
                                        <div style={{ fontStyle: 'italic' }}>"Stay <strong className="text-[#A3BD8A]">GREEN</strong> to stay in the fight!"</div>
                                        <section className={hidePersonalInfo % 2 === 0 ? "hidden" : ""}>
                                            <div>DOB: {loggedUser[0].DOB} </div>
                                            <div>BASD: {loggedUser[0].BASD} </div>
                                            <div>MOS: {loggedUser[0].MOS} </div>
                                            <div>DODID: {loggedUser[0].DoDID} </div>
                                        </section>
                                    </tr>
                                    <button onClick={ () => setHidePersonalInfo(hidePersonalInfo += 1) } className="block w-7/12 py-1 rounded-lg mx-auto mt-2 text-black bg-transparent border border-black border-double hover:bg-slate-400 transition transition-200">{hidePersonalInfo % 2 === 0 ? "Show Personal Info" : "Hide Personal Info"}</button>

                                    <button onClick={ () => { setUpdateFieldsToggle(updateFieldsToggle += 1);  updateFieldsToggle % 2 === 0 ? setFieldChanged(fieldChanged += 1) : console.log("updateField wasn't triggered"); console.log("fieldChanged: ", fieldChanged); setUpdateFieldsToggle(updateFieldsToggle += 1); setUpdateFieldsToggle(updateFieldsToggle += 1);  } } className={updateFieldsToggle % 2 === 0 ? "block w-7/12 py-1 rounded-lg mx-auto mt-2 text-black bg-transparent border border-black border-double hover:bg-slate-400 transition transition-200" : "block w-7/12 py-1 rounded-lg mx-auto mt-2 text-black bg-green-400 border border-black border-double hover:bg-black transition transition-200 text-white"}>{updateFieldsToggle % 2 === 0 ? "Update Profile" : "Submit Changes"}</button>
                                </section>
                    }



                                {/* <IndivTag elements={ testObject } component="medical"/> */}
                                {/* Logged in Soldier below */}
                                <hr className="w-10/12 mx-auto border-t-2 mt-12" />
        
                                {/* Subordinates below */}
                                
                                <Medical elements={medicalTestArrayOfObjects} />
                                <AnnualTraining/>
                                <SpecialTraining/>
                                <StaticTraining/>
                            </section>
                        )
                    })}
                    
                </>
            )
        } else {
            return (
                <section id="wrapper" className="pb-8 m-12">
                    <section id='welcome_box' className="w-1/5 mx-auto p-4 min-w-fit max-w-fit bg-slate-100 opacity-90 rounded-md shadow-xl shadow-black">
                        <div>Loading...</div>
                    </section>
                </section>
            )
        }
    } else {
        return (
            <section id="wrapper" className="pb-8 m-12">
                <section id='welcome_box' className="w-1/5 mx-auto p-4 min-w-fit max-w-fit bg-slate-100 opacity-90 rounded-md shadow-xl shadow-black">
                    <div>Loading...</div>
                </section>
            </section>
        )
    }
    
}
/*
                <section>

                    <Medical elements={medicalTestArrayOfObjects} />
                    <AnnualTraining elements={annualRequirementsTestArrayOfObjects} />
                    <SpecialTraining elements={specialSkillsTestArrayOfObjects} />
                    <StaticTraining elements={staticSkillsTestArrayOfObjects} />

                </section>
*/

export default Profile;