import React, { useState, useContext, useEffect } from 'react';

import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GrIcons from 'react-icons/gr';
import { CiCircleRemove } from "react-icons/fa";
import { AppContext } from '../AppContext';
import { AddItem } from './AddItem';
//import Profile, { staticSkillsTestArrayOfObjects as staticSkills, specialSkillsTestArrayOfObjects as specialSkills, userObject } from './profile';
//imported for use of dummy data



export const Medical = (props) => {

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
        loggedUserServiceMembers,
        setLoggedUserServiceMembers,
        loggedUserServiceMemberSummaries,
        setLoggedUserServiceMemberSummaries,
        loggedUserServiceMemberPromiseChainComplete,
        setLoggedUserServiceMemberPromiseChainComplete,
        updateFieldsToggle,
        setUpdateFieldsToggle,
        fieldChanged,
        setFieldChanged,
        newFieldChanges,
        setNewFieldChanges,
        fieldFetchesComplete, 
        setFieldFetchesComplete,
        itemToBeDeleted, 
        setItemToBeDeleted,
        serviceMember,
        serviceMemberSummary,
        setServiceMemberSummary
    }
        = useContext(AppContext);

    const colorHelper = (amber, red) => {

        if (red) {
            return 'bg-red-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';

        } else if (amber) {
            return 'bg-amber-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';

        } else {
            return 'bg-green-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';
        }
    }

    const currentLabelHelper = (currentLabel) => {

        if (currentLabel == "Annual Training") {
            return "Annual"
        } else {
            return currentLabel;
        }

    }

    const currentLabelHelper2 = (currentLabel) => {

        if (currentLabel === "Annual Training") {
            return "Training"
        } else {
            return;
        }

    }

    const dateHelper = (uiDate) => {

        const monthHelper = (month) => {

            switch (month.toLowerCase()) {

                case 'jan':
                    return '01';
                    break;
                
                case 'feb':
                    return '02';
                    break;

                case 'mar':
                    return '03';
                    break;
                    
                case 'apr':
                    return '04';
                    break;
                
                case 'may':
                    return '05';
                    break;
        
                case 'jun':
                    return '06';
                    break;
                
                case 'jul':
                    return '07';
                    break;

                case 'aug':
                    return '08';
                    break;
        
                case 'sep':
                    return '09';
                    break;

                case 'oct':
                    return '10';
                    break;

                case 'nov':
                    return '11';
                    break;

                case 'dec':
                    return '12';
                    break;
                default:
                    break;

            }

        }

        let dateArray = uiDate.split(" ");

        console.log("dateArray: ", dateArray);
        
        let correctedDateFormat = `${dateArray[3]}-${monthHelper(dateArray[1])}-${dateArray[2]}`;

        console.log("correctedDateFormat: ", correctedDateFormat);
        return correctedDateFormat;

    }

    const updateFieldHelper = (object, newDate) => {

        let objectKeyName = Object.keys(object)[0];
        let objectKeyNameValue = Object.values(object)[0];

        let objectKeyDateName = `${objectKeyNameValue.toLowerCase()}_date`;
        let objectToPush = {[objectKeyDateName]: newDate };
        

        let newFieldChangesCopy = newFieldChanges.slice();

        let alreadyExists = false;

        for (let object of newFieldChangesCopy) {
            if ( Object.keys(objectToPush)[0] == Object.keys(object)[0] ) {
                alreadyExists = true;
            
            }
        }
        

        if (alreadyExists) {
            for (let object of newFieldChangesCopy) {
                if (Object.keys(objectToPush)[0] == Object.keys(object)[0]) {
                    object[objectKeyDateName] = newDate;
                }
            }
        } else {
            newFieldChangesCopy.push(objectToPush);
        }
        

        setNewFieldChanges(newFieldChangesCopy);

        // setTimeout(() => console.log("new FIeld changes: ", newFieldChanges), 5000);

    }

    // used and ran when changes are submitted via the update profile button
    useEffect(() => {

        console.log("newFieldChanges: ", newFieldChanges);

        let userId = loggedUser[0].id;

        const fetchFieldHelper = (field) => {

            /*
            const response = await fetch('https://httpbin.org/post', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            */

            let patchBody = {
                method: 'PATCH',
                body: JSON.stringify(field),
                headers: {"Access-Control-Allow-Origin": "*"}
            }

            
            
            if (field.pha_date || field.dental_date || field.hearing_date || field.vision_date || field.hiv_date) {
                
                    console.log("field: ", field);
                    fetch(`http://localhost:3001/medical/${userId}`, {
                        method: 'PATCH',
                        body: JSON.stringify(field),
                        headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                    })
                    .then(response => response.json())
                    .then(data => console.log("Success: ", data))
                    .catch(err => console.log("err: ", err))

            }

              // } else if () {
                    
                // } else if () {
                    
                // } else if () {
                    
                // } else if () {
                    
                // } else if () {
                    
                // }

        }

        let newFieldChangesPromisesArray = [];

        newFieldChanges.forEach((fieldObject, index) => {
            
            newFieldChangesPromisesArray.push(new Promise(() => fetchFieldHelper(fieldObject)));

        })

        console.log("newFieldChangesPromisesArray: ", newFieldChangesPromisesArray)

        Promise.all(newFieldChangesPromisesArray)
        .then(info => {
            console.log("All fields updated!")
            setNewFieldChanges([]);
        })
        .then(info => {
            setLoggedUserToggle(loggedUserToggle += 1);
        })
        .then(info => {
            console.log("loggedUserToggle in ProfileCards: ", loggedUserToggle);
        })
        


    }, [fieldChanged])

    return (
        <ul key="0" className="w-10/12 h-8/12 width: 'vw' list-none flex flex-row flex-wrap gap-8 border border-2 border-gray border-double mx-auto my-8 p-4 bg-[#A3BD8A] rounded-lg shadow-2xl ">
            <div>
                <h2 className="text-3xl font-bold border-r-2 py-8 pr-8">Medical Status</h2>
            </div>

            {
                loggedUser[0].username !== serviceMember.username ? 
                serviceMemberSummary.map((obj, index) => {
                    if (obj.pha_date || obj.dental_date || obj.hearing_date || obj.vision_date || obj.hiv_date) {
                        let medicalObjects = [];
                        console.log("loggedUserSummary: ", loggedUserSummary);
                        console.log("obj: ", obj);
                        console.log("loggedUser: ", loggedUser);

                        const keyHelper = (object) => {
                            loggedUserSummary.forEach((object, index) => {
                                if (object.pha_date || object.dental_date || object.hearing_date || object.vision_date || object.hiv_date) {
                                    medicalObjects.push({medicalObjectName: "PHA", medicalObjectDate: object.pha_date});
                                    medicalObjects.push({medicalObjectName: "Dental", medicalObjectDate: object.dental_date});
                                    medicalObjects.push({medicalObjectName: "Hearing", medicalObjectDate: object.hearing_date});
                                    medicalObjects.push({medicalObjectName: "Vision", medicalObjectDate: object.vision_date});
                                    medicalObjects.push({medicalObjectName: "HIV", medicalObjectDate: object.hiv_date});
                                }
                            })

                        }

                        keyHelper(obj);
                        console.log("medicalObjects: ", medicalObjects)


                        return medicalObjects.map((medicalObject, index) => {
                                console.log("test")
                                
        
                                let currentLabel = "";
                                let currentLabelStatus = "";
                                let amber = false;
                                let red = false;

                                let date;
                                let msDate;
                                let uiDate;

                                currentLabel = medicalObject.medicalObjectName;
        
                                if (new Date(medicalObject.medicalObjectDate).valueOf() > Date.now()) {
        
                                    date = new Date(medicalObject.medicalObjectDate).valueOf();
                                    msDate = new Date(parseInt(date, 10));
                                    uiDate = msDate.toDateString();
                                    currentLabelStatus = 'Due Date\n' + uiDate;
        
                                    if (new Date(medicalObject.medicalObjectDate).valueOf() - Date.now() <= 2592000000) {
        
                                        date = new Date(medicalObject.medicalObjectDate).valueOf();
                                        msDate = new Date(parseInt(date, 10));
                                        uiDate = msDate.toDateString();
                                        amber = true;
                                        currentLabelStatus = 'Due Date\n' + uiDate;
        
                                    }
        
                                } else if (new Date(medicalObject.medicalObjectDate).valueOf() < Date.now()) {
        
                                    date = new Date(medicalObject.medicalObjectDate).valueOf();
                                    msDate = new Date(parseInt(date, 10));
                                    uiDate = msDate.toDateString();
                                    red = true;
                                    currentLabelStatus = 'Due Date\n' + uiDate;
                                }

                                console.log("profileCard here date: ", date)
                                console.log("profileCard here msDate: ", msDate)
                                console.log("profileCard here uiDate: ", uiDate)
                                
                                if (currentLabel === "") {
                                    return <></>
                                    
                                } else {
                                    
                                    
                                    if (loggedUser !== []) {
                                        if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined) { 
                                            
                                            if (updateFieldsToggle % 2 === 0) {
                                                return ( 
                                                    <li
                                                    key={index}
                                                    className={colorHelper(amber, red)}>
                                                    <strong className="text-center">
                                                        {/* If label isn't annual training, put colon after label */}
                                                        {currentLabelHelper(currentLabel)}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                            
                                                    </strong>
                                                    <strong className="text-center">
                                                        {/* If label isn't annual training, do not add colon on new line */}
                                                        {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                                    </strong>
                                                    { console.log(`currentLabelStatus: ${currentLabel}, `, currentLabelStatus) }
                                                    <p className="text-center">{currentLabelStatus}</p>
                                                    </li> 
                                                )
                                            } else {
                                                return ( 
                                                    <li
                                                    key={index}
                                                    className="bg-slate-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all">
                                                    <strong className="text-center">
                                                        {/* If label isn't annual training, put colon after label */}
                                                        {"New " + currentLabelHelper(currentLabel) + " Due Date"}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                            
                                                    </strong>
                                                    <strong className="text-center">
                                                        {/* If label isn't annual training, do not add colon on new line */}
                                                        {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                                    </strong>
                                                    <br/>
                                                    <br/>
                                                    { /* dateHelper(uiDate) */ }
                                                    <input type="date" defaultValue={dateHelper(uiDate)} onChange={(event) => console.log("event.target.value: ", updateFieldHelper(medicalObject, event.target.value))} />
                                                    </li> 
                                                )
                                            }
                                        } else {
        
                                            <li
        
                                            key={index}
                                            className={colorHelper(amber, red)}>
        
                                            <strong className="text-center">
                                                Loading...
                                            </strong>
        
                                            <p className="text-center">Loading...</p>
        
                                            </li>
        
                                        }
                                    }
        
                                }
                                
                        })

                    } else {
                        return <></>;

                    }

                })    
                : 
                loggedUserSummary.map((obj, index) => {
                    if (obj.pha_date || obj.dental_date || obj.hearing_date || obj.vision_date || obj.hiv_date) {
                        let medicalObjects = [];
                        console.log("loggedUserSummary: ", loggedUserSummary);
                        console.log("obj: ", obj);
                        console.log("loggedUser: ", loggedUser);

                        const keyHelper = (object) => {
                            loggedUserSummary.forEach((object, index) => {
                                if (object.pha_date || object.dental_date || object.hearing_date || object.vision_date || object.hiv_date) {
                                    medicalObjects.push({medicalObjectName: "PHA", medicalObjectDate: object.pha_date});
                                    medicalObjects.push({medicalObjectName: "Dental", medicalObjectDate: object.dental_date});
                                    medicalObjects.push({medicalObjectName: "Hearing", medicalObjectDate: object.hearing_date});
                                    medicalObjects.push({medicalObjectName: "Vision", medicalObjectDate: object.vision_date});
                                    medicalObjects.push({medicalObjectName: "HIV", medicalObjectDate: object.hiv_date});
                                }
                            })

                        }

                        keyHelper(obj);
                        console.log("medicalObjects: ", medicalObjects)


                        return medicalObjects.map((medicalObject, index) => {
                                console.log("test")
                                
        
                                let currentLabel = "";
                                let currentLabelStatus = "";
                                let amber = false;
                                let red = false;

                                let date;
                                let msDate;
                                let uiDate;

                                currentLabel = medicalObject.medicalObjectName;
        
                                if (new Date(medicalObject.medicalObjectDate).valueOf() > Date.now()) {
        
                                    date = new Date(medicalObject.medicalObjectDate).valueOf();
                                    msDate = new Date(parseInt(date, 10));
                                    uiDate = msDate.toDateString();
                                    currentLabelStatus = 'Due Date\n' + uiDate;
        
                                    if (new Date(medicalObject.medicalObjectDate).valueOf() - Date.now() <= 2592000000) {
        
                                        date = new Date(medicalObject.medicalObjectDate).valueOf();
                                        msDate = new Date(parseInt(date, 10));
                                        uiDate = msDate.toDateString();
                                        amber = true;
                                        currentLabelStatus = 'Due Date\n' + uiDate;
        
                                    }
        
                                } else if (new Date(medicalObject.medicalObjectDate).valueOf() < Date.now()) {
        
                                    date = new Date(medicalObject.medicalObjectDate).valueOf();
                                    msDate = new Date(parseInt(date, 10));
                                    uiDate = msDate.toDateString();
                                    red = true;
                                    currentLabelStatus = 'Due Date\n' + uiDate;
                                }

                                console.log("profileCard here date: ", date)
                                console.log("profileCard here msDate: ", msDate)
                                console.log("profileCard here uiDate: ", uiDate)
                                
                                if (currentLabel === "") {
                                    return <></>
                                    
                                } else {
                                    
                                    
                                    if (loggedUser !== []) {
                                        if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined) { 
                                            
                                            if (updateFieldsToggle % 2 === 0) {
                                                return ( 
                                                    <li
                                                    key={index}
                                                    className={colorHelper(amber, red)}>
                                                    <strong className="text-center">
                                                        {/* If label isn't annual training, put colon after label */}
                                                        {currentLabelHelper(currentLabel)}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                            
                                                    </strong>
                                                    <strong className="text-center">
                                                        {/* If label isn't annual training, do not add colon on new line */}
                                                        {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                                    </strong>
                                                    { console.log(`currentLabelStatus: ${currentLabel}, `, currentLabelStatus) }
                                                    <p className="text-center">{currentLabelStatus}</p>
                                                    </li> 
                                                )
                                            } else {
                                                return ( 
                                                    <li
                                                    key={index}
                                                    className="bg-slate-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all">
                                                    <strong className="text-center">
                                                        {/* If label isn't annual training, put colon after label */}
                                                        {"New " + currentLabelHelper(currentLabel) + " Due Date"}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                            
                                                    </strong>
                                                    <strong className="text-center">
                                                        {/* If label isn't annual training, do not add colon on new line */}
                                                        {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                                    </strong>
                                                    <br/>
                                                    <br/>
                                                    { /* dateHelper(uiDate) */ }
                                                    <input type="date" defaultValue={dateHelper(uiDate)} onChange={(event) => console.log("event.target.value: ", updateFieldHelper(medicalObject, event.target.value))} />
                                                    </li> 
                                                )
                                            }
                                        } else {
        
                                            <li
        
                                            key={index}
                                            className={colorHelper(amber, red)}>
        
                                            <strong className="text-center">
                                                Loading...
                                            </strong>
        
                                            <p className="text-center">Loading...</p>
        
                                            </li>
        
                                        }
                                    }
        
                                }
                                
                        })

                    } else {
                        return <></>;

                    }

                })
            }
            
 
        </ul>
    )
};


// ━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━

export const AnnualTraining = (props) => {

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
        loggedUserServiceMembers,
        setLoggedUserServiceMembers,
        loggedUserServiceMemberSummaries,
        setLoggedUserServiceMemberSummaries,
        loggedUserServiceMemberPromiseChainComplete,
        setLoggedUserServiceMemberPromiseChainComplete,
        updateFieldsToggle,
        setUpdateFieldsToggle,
        fieldChanged,
        setFieldChanged,
        newFieldChanges,
        setNewFieldChanges,
        fieldFetchesComplete, 
        setFieldFetchesComplete,
        itemToBeDeleted, 
        setItemToBeDeleted,
        serviceMember,
        serviceMemberSummary,
        setServiceMemberSummary
    }
        = useContext(AppContext);

    let [ timerComplete, setTimerComplete ] = useState(false);

    const colorHelper = (amber, red,) => {

        if (red) {
            return 'bg-red-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';

        } else if (amber) {
            return 'bg-amber-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';

        } else {
            return 'bg-green-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';
        }
    }

    const currentLabelHelper = (currentLabel) => {

        if (currentLabel == "Annual Training") {
            return "Annual"
        } else {
            return currentLabel;
        }

    }

    const currentLabelHelper2 = (currentLabel) => {

        if (currentLabel === "Annual Training") {
            return "Training"
        } else {
            return;
        }

    }

    const dateHelper = (uiDate) => {

        const monthHelper = (month) => {

            switch (month.toLowerCase()) {

                case 'jan':
                    return '01';
                    break;
                
                case 'feb':
                    return '02';
                    break;

                case 'mar':
                    return '03';
                    break;
                    
                case 'apr':
                    return '04';
                    break;
                
                case 'may':
                    return '05';
                    break;
        
                case 'jun':
                    return '06';
                    break;
                
                case 'jul':
                    return '07';
                    break;

                case 'aug':
                    return '08';
                    break;
        
                case 'sep':
                    return '09';
                    break;

                case 'oct':
                    return '10';
                    break;

                case 'nov':
                    return '11';
                    break;

                case 'dec':
                    return '12';
                    break;
                default:
                    break;

            }

        }

        let dateArray = uiDate.split(" ");

        console.log("dateArray: ", dateArray);
        
        let correctedDateFormat = `${dateArray[3]}-${monthHelper(dateArray[1])}-${dateArray[2]}`;

        console.log("correctedDateFormat: ", correctedDateFormat);
        return correctedDateFormat;

    }

    const updateFieldHelper = (object, newDate) => {

        console.log("object, newDate: ", object, newDate);
        let objectKeyName = Object.keys(object)[1];
        let objectKeyNameValue = Object.values(object)[1];

        let objectKeyDateName = Object.keys(object)[2];
        let objectToPush = {[objectKeyName]: objectKeyNameValue, [objectKeyDateName]: newDate };
        

        let newFieldChangesCopy = newFieldChanges.slice();

        let alreadyExists = false;

        for (let object of newFieldChangesCopy) {
            if ( Object.values(objectToPush)[0] == Object.values(object)[0] ) {
                alreadyExists = true;
            
            }
        }
        

        if (alreadyExists) {
            for (let object of newFieldChangesCopy) {
                if (Object.values(objectToPush)[0] == Object.values(object)[0]) {
                    object[objectKeyDateName] = newDate;
                }
            }
        } else {
            newFieldChangesCopy.push(objectToPush);
        }
        

        setNewFieldChanges(newFieldChangesCopy);

        setTimeout(() => console.log("new FIeld changes: ", newFieldChanges), 5000);

    }

    const deleteFieldHelper = (event) => { 

        

        console.log(event);
        console.log("event.target.parentElement.textContent: ", event.target.parentElement.textContent);
        console.log("typeof event.target.parentElement.textContent: ", typeof event.target.parentElement.textContent);

        let fieldArray = event.target.parentElement.textContent.split(" ");

        for (let iterator = 0; iterator < fieldArray.length; iterator++) {
            if (fieldArray[iterator] === "New") {
                fieldArray.splice(iterator, 1);
            }
            if (fieldArray[iterator] === "Due") {
                fieldArray.splice(iterator, 1);
            }
            if (fieldArray[iterator] === "Date:") {
                fieldArray.splice(iterator, 1);
            }
        }

        let formattedFieldToBeDeleted = fieldArray.join(" ");
        let formattedObject;

        console.log("FieldArray (formattedFieldToBeDeleted) after modifications: ", formattedFieldToBeDeleted);

        formattedObject = {"training_name": formattedFieldToBeDeleted};


        console.log("formattedObject: ", formattedObject);





        setItemToBeDeleted(formattedObject);

        // event.target.nextSibling.textContent

        // event.target.parentElement.parentElement.innerText
    }
    // useEffect for updates
    useEffect(() => {

        console.log("newFieldChanges inside annual training: ", newFieldChanges);

        let userId = loggedUser[0].id;

        const fetchFieldHelper = (field) => {

            /*
            const response = await fetch('https://httpbin.org/post', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            */

            let patchBody = {
                method: 'PATCH',
                body: JSON.stringify(field),
                headers: {"Access-Control-Allow-Origin": "*"}
            }

            if (field.training_name) {

                console.log("field: ", field);
                    fetch(`http://localhost:3001/annual_training/${userId}`, {
                        method: 'PATCH',
                        body: JSON.stringify(field),
                        headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                    })
                    .then(response => response.json())
                    .then(data => console.log("Success: ", data))
                    .catch(err => console.log("err: ", err))
              
            }

              // } else if () {
                    
                // } else if () {
                    
                // } else if () {
                    
                // } else if () {
                    
                // } else if () {
                    
                // }

        }

        let newFieldChangesPromisesArray = [];

        newFieldChanges.forEach((fieldObject, index) => {
            
            newFieldChangesPromisesArray.push(new Promise(() => fetchFieldHelper(fieldObject)));

        })

        console.log("newFieldChangesPromisesArray: ", newFieldChangesPromisesArray)

        Promise.all(newFieldChangesPromisesArray)
        .then(info => {
            console.log("All fields updated!")
            setNewFieldChanges([]);
        })
        .then(info => {
            setLoggedUserToggle(loggedUserToggle += 1);
        })
        .then(info => {
            console.log("loggedUserToggle in ProfileCards: ", loggedUserToggle);
        })
        


    }, [fieldChanged])

    // useEffect for deletes
    useEffect(() => {

        let userId = loggedUser[0].id;
        let promise;

        console.log("item to be deleted: ", itemToBeDeleted);

        if (itemToBeDeleted !== undefined) {
            try {

                if (itemToBeDeleted.training_name) {

                    promise = (
                        
                        fetch(`http://localhost:3001/annual_training/${userId}`, {
                            method: 'DELETE',
                            body: JSON.stringify(itemToBeDeleted),
                            headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                        })
                        .then(response => response.json())
                        .then(data => console.log("Success: ", data))
                        .catch(err => console.log("err: ", err))

                    )

                }
                // } else if (itemToBeDeleted.skill_refresh_date) {
                    
                //     promise = (
                        
                //         fetch(`http://localhost:3001/special_skills/${userId}`, {
                //             method: 'DELETE',
                //             body: JSON.stringify(itemToBeDeleted),
                //             headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                //         })
                //         .then(response => response.json())
                //         .then(data => console.log("Success: ", data))
                //         .catch(err => console.log("err: ", err))

                //     )
                // } else if (itemToBeDeleted.skill_date) {

                //     promise = (
                        
                //         fetch(`http://localhost:3001/static_skills/${userId}`, {
                //             method: 'DELETE',
                //             body: JSON.stringify(itemToBeDeleted),
                //             headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                //         })
                //         .then(response => response.json())
                //         .then(data => console.log("Success: ", data))
                //         .catch(err => console.log("err: ", err))

                //     )

                // }

                if (promise !== undefined) {

                    promise
                    .then(result => {

                        console.log("result of deletion: ", result);

                    })

                }
            } catch (error) {

                console.log("parentSibling was likely not rendered yet or interpreted, try clicking the delete button again. error: ", error);

            }
        }

            


    }, [itemToBeDeleted])
    // useEffect(() => {
    //     const timer = setTimeout(() => console.log("Hello, World!"), 3000);
    //     setTimerComplete(true);
    //     return () => clearTimeout(timer);
        
    //   }, [loggedUserPromiseChainComplete]);

        if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined) {

            return (
 
                <ul key="1" className="w-10/12 h-8/12 width: 'vw' list-none flex flex-row flex-wrap gap-8 border border-2 border-gray border-double mx-auto my-8 p-4 bg-[#A3BD8A] rounded-lg shadow-2xl ">
                    <div>
                        <h2 className="text-3xl font-bold border-r-2 py-2 pr-8">Annual Training</h2>
                        {updateFieldsToggle % 2 !== 0 ? 
                        <>
                        <h2 className="text-xl font-bold border-r-2 py-2 pr-8 border-gray text-green-100">Add New Annual Training
                        <br/>
                        <i className="text-sm text-center font-normal">Separate each additional entry with a comma. Change due dates after.</i>
                                </h2> 
                                </>
                                : <></>
                        
                        } 
                    </div>
                    {updateFieldsToggle % 2 !== 0 ? <AddItem itemType="Annual Training" itemName="New Annual Training Name(s):" itemIdentifier="annualTraining"/> : <></>}

                {
                    loggedUser[0].username !== serviceMember.username ? 
                    serviceMemberSummary.map((obj, index) => {
                        console.log("loggedUserSummary: ", loggedUserSummary)
                        console.log("obj: ", obj)
                        if (obj.training_name) {
                            console.log("test")
                            //props.elements.map((skill, index) => {
    
                            let currentLabel = "";
                            let currentLabelStatus = "";
                            let amber = false;
                            let red = false;
    
                            let date;
                            let msDate;
                            let uiDate;
    
    
    
                            currentLabel = obj.training_name;
    
                            // { id: 1, skill_name: "Foreign Language", refresh_date: "2022-06-06", users_id: 1 }
    
                            if (new Date(obj.training_date).valueOf() > Date.now()) {
    
                                date = new Date(obj.training_date).valueOf();
                                msDate = new Date(parseInt(date, 10));
                                uiDate = msDate.toDateString();
                                currentLabelStatus = 'Due Date\n' + uiDate;
    
                                if (new Date(obj.training_date).valueOf() - Date.now() <= 2592000000) {
    
                                    date = new Date(obj.training_date).valueOf();
                                    msDate = new Date(parseInt(date, 10));
                                    uiDate = msDate.toDateString();
                                    amber = true;
                                    currentLabelStatus = 'Due Date\n' + uiDate;
    
                                }
    
                            } else if (new Date(obj.training_date).valueOf() < Date.now()) {
    
                                date = new Date(obj.training_date).valueOf();
                                msDate = new Date(parseInt(date, 10));
                                uiDate = msDate.toDateString();
                                red = true;
                                currentLabelStatus = 'Due Date\n' + uiDate;
                            }
                            
                            if (currentLabel === "") {
                                return <></>
                                
                            } else {
                                
                                
                            if (loggedUser !== []) {
                                if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined) { 
                                    if (updateFieldsToggle % 2 === 0) {
                                        return ( 
                                            <li
                                            
                                            key={index}
                                            className={colorHelper(amber, red)}>
                                            
                                            <strong className="text-center">
                                                {/* If label isn't annual training, put colon after label */}
                                                {currentLabelHelper(currentLabel)}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                    
                                            </strong>
                                            <strong className="text-center">
                                                {/* If label isn't annual training, do not add colon on new line */}
                                                {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                            </strong>
                                            { console.log(`currentLabelStatus: ${currentLabel}, `, currentLabelStatus) }
                                            <p className="text-center">{currentLabelStatus}</p>
                                            
                                            </li> 
                                        )
                                    } else {
                                        return ( 
                                            <li
                                            key={index}
                                            className="bg-slate-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all">
                                                
                                            <strong className="text-center">
                                                <IoIcons.IoIosCloseCircleOutline 
                                                className="mx-auto w-8 h-8 text-red-500 border border-red-500 rounded-3xl hover:bg-black"
                                                onClick={(event) => { deleteFieldHelper(event);  }}/>
                                                {/* If label isn't annual training, put colon after label */}
                                                {"New " + currentLabelHelper(currentLabel) + " Due Date"}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                    
                                            </strong>
                                            <strong className="text-center">
                                                {/* If label isn't annual training, do not add colon on new line */}
                                                {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                            </strong>
                                            <br/>
                                            <br/>
                                            { /* dateHelper(uiDate) */ }
                                            <input type="date" defaultValue={dateHelper(uiDate)} onChange={(event) => console.log("event.target.value: ", updateFieldHelper(obj, event.target.value))} />
                                            </li>
                                            
                                        )
                                    }
                                    
                                } else {
    
                                    <li
    
                                    key={index}
                                    className={colorHelper(amber, red)}>
    
                                    <strong className="text-center">
                                        Loading...
                                    </strong>
    
                                    <p className="text-center">Loading...</p>
    
                                    </li>
    
                                }
                            }
    
                            }
                        } else {
                            return <></>;
    
                        }
                    })    
                    : 
                    loggedUserSummary.map((obj, index) => {
                        console.log("loggedUserSummary: ", loggedUserSummary)
                        console.log("obj: ", obj)
                        if (obj.training_name) {
                            console.log("test")
                            //props.elements.map((skill, index) => {
    
                            let currentLabel = "";
                            let currentLabelStatus = "";
                            let amber = false;
                            let red = false;
    
                            let date;
                            let msDate;
                            let uiDate;
    
    
    
                            currentLabel = obj.training_name;
    
                            // { id: 1, skill_name: "Foreign Language", refresh_date: "2022-06-06", users_id: 1 }
    
                            if (new Date(obj.training_date).valueOf() > Date.now()) {
    
                                date = new Date(obj.training_date).valueOf();
                                msDate = new Date(parseInt(date, 10));
                                uiDate = msDate.toDateString();
                                currentLabelStatus = 'Due Date\n' + uiDate;
    
                                if (new Date(obj.training_date).valueOf() - Date.now() <= 2592000000) {
    
                                    date = new Date(obj.training_date).valueOf();
                                    msDate = new Date(parseInt(date, 10));
                                    uiDate = msDate.toDateString();
                                    amber = true;
                                    currentLabelStatus = 'Due Date\n' + uiDate;
    
                                }
    
                            } else if (new Date(obj.training_date).valueOf() < Date.now()) {
    
                                date = new Date(obj.training_date).valueOf();
                                msDate = new Date(parseInt(date, 10));
                                uiDate = msDate.toDateString();
                                red = true;
                                currentLabelStatus = 'Due Date\n' + uiDate;
                            }
                            
                            if (currentLabel === "") {
                                return <></>
                                
                            } else {
                                
                                
                            if (loggedUser !== []) {
                                if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined) { 
                                    if (updateFieldsToggle % 2 === 0) {
                                        return ( 
                                            <li
                                            
                                            key={index}
                                            className={colorHelper(amber, red)}>
                                            
                                            <strong className="text-center">
                                                {/* If label isn't annual training, put colon after label */}
                                                {currentLabelHelper(currentLabel)}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                    
                                            </strong>
                                            <strong className="text-center">
                                                {/* If label isn't annual training, do not add colon on new line */}
                                                {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                            </strong>
                                            { console.log(`currentLabelStatus: ${currentLabel}, `, currentLabelStatus) }
                                            <p className="text-center">{currentLabelStatus}</p>
                                            
                                            </li> 
                                        )
                                    } else {
                                        return ( 
                                            <li
                                            key={index}
                                            className="bg-slate-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all">
                                                
                                            <strong className="text-center">
                                                <IoIcons.IoIosCloseCircleOutline 
                                                className="mx-auto w-8 h-8 text-red-500 border border-red-500 rounded-3xl hover:bg-black"
                                                onClick={(event) => { deleteFieldHelper(event) }}/>
                                                {/* If label isn't annual training, put colon after label */}
                                                {"New " + currentLabelHelper(currentLabel) + " Due Date"}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                    
                                            </strong>
                                            <strong className="text-center">
                                                {/* If label isn't annual training, do not add colon on new line */}
                                                {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                            </strong>
                                            <br/>
                                            <br/>
                                            { /* dateHelper(uiDate) */ }
                                            <input type="date" defaultValue={dateHelper(uiDate)} onChange={(event) => console.log("event.target.value: ", updateFieldHelper(obj, event.target.value))} />
                                            </li>
                                            
                                        )
                                    }
                                    
                                } else {
    
                                    <li
    
                                    key={index}
                                    className={colorHelper(amber, red)}>
    
                                    <strong className="text-center">
                                        Loading...
                                    </strong>
    
                                    <p className="text-center">Loading...</p>
    
                                    </li>
    
                                }
                            }
    
                            }
                        } else {
                            return <></>;
    
                        }
                    })
                }
                    
                </ul>
        
            )
           
        } else {
            <section id="wrapper" className="pb-8 m-12">
                <section id='welcome_box' className="w-1/5 mx-auto p-4 min-w-fit max-w-fit bg-slate-100 opacity-90 rounded-md shadow-xl shadow-black">
                    <div>Loading...</div>
                </section>
            </section>
        }
    


    
   
};

export const SpecialTraining = (props) => {

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
        loggedUserServiceMembers,
        setLoggedUserServiceMembers,
        loggedUserServiceMemberSummaries,
        setLoggedUserServiceMemberSummaries,
        loggedUserServiceMemberPromiseChainComplete,
        setLoggedUserServiceMemberPromiseChainComplete,
        updateFieldsToggle,
        setUpdateFieldsToggle,
        fieldChanged,
        setFieldChanged,
        newFieldChanges,
        setNewFieldChanges,
        fieldFetchesComplete, 
        setFieldFetchesComplete,
        itemToBeDeleted, 
        setItemToBeDeleted,
        serviceMember,
        serviceMemberSummary,
        setServiceMemberSummary
    }
        = useContext(AppContext);

    const colorHelper = (amber, red,) => {

        if (red) {
            return 'bg-red-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';

        } else if (amber) {
            return 'bg-amber-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';

        } else {
            return 'bg-green-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';
        }
    }
    const currentLabelHelper = (currentLabel) => {

        if (currentLabel == "Annual Training") {
            return "Annual"
        } else {
            return currentLabel;
        }

    }

    const currentLabelHelper2 = (currentLabel) => {

        if (currentLabel === "Annual Training") {
            return "Training"
        } else {
            return;
        }

    }

    const dateHelper = (uiDate) => {

        const monthHelper = (month) => {

            switch (month.toLowerCase()) {

                case 'jan':
                    return '01';
                    break;
                
                case 'feb':
                    return '02';
                    break;

                case 'mar':
                    return '03';
                    break;
                    
                case 'apr':
                    return '04';
                    break;
                
                case 'may':
                    return '05';
                    break;
        
                case 'jun':
                    return '06';
                    break;
                
                case 'jul':
                    return '07';
                    break;

                case 'aug':
                    return '08';
                    break;
        
                case 'sep':
                    return '09';
                    break;

                case 'oct':
                    return '10';
                    break;

                case 'nov':
                    return '11';
                    break;

                case 'dec':
                    return '12';
                    break;
                default:
                    break;

            }

        }

        let dateArray = uiDate.split(" ");

        console.log("dateArray: ", dateArray);
        
        let correctedDateFormat = `${dateArray[3]}-${monthHelper(dateArray[1])}-${dateArray[2]}`;

        console.log("correctedDateFormat: ", correctedDateFormat);
        return correctedDateFormat;

    }

    const updateFieldHelper = (object, newDate) => {

        console.log("special training object, newDate: ", object, newDate);
        let objectKeyName = Object.keys(object)[1];
        let objectKeyNameValue = Object.values(object)[1];

        let objectKeyDateName = Object.keys(object)[2];
        let objectToPush = {[objectKeyName]: objectKeyNameValue, [objectKeyDateName]: newDate };
        

        let newFieldChangesCopy = newFieldChanges.slice();

        let alreadyExists = false;

        for (let object of newFieldChangesCopy) {
            if ( Object.values(objectToPush)[0] == Object.values(object)[0] ) {
                alreadyExists = true;
            
            }
        }
        

        if (alreadyExists) {
            for (let object of newFieldChangesCopy) {
                if (Object.values(objectToPush)[0] == Object.values(object)[0]) {
                    object[objectKeyDateName] = newDate;
                }
            }
        } else {
            newFieldChangesCopy.push(objectToPush);
        }
        

        setNewFieldChanges(newFieldChangesCopy);

        setTimeout(() => console.log("new FIeld changes: ", newFieldChanges), 5000);

    }

    const deleteFieldHelper = (event) => { 

        

        console.log(event);
        console.log("event.target.parentElement.textContent: ", event.target.parentElement.textContent);
        console.log("typeof event.target.parentElement.textContent: ", typeof event.target.parentElement.textContent);

        let fieldArray = event.target.parentElement.textContent.split(" ");

        for (let iterator = 0; iterator < fieldArray.length; iterator++) {
            if (fieldArray[iterator] === "New") {
                fieldArray.splice(iterator, 1);
            }
            if (fieldArray[iterator] === "Due") {
                fieldArray.splice(iterator, 1);
            }
            if (fieldArray[iterator] === "Date:") {
                fieldArray.splice(iterator, 1);
            }
        }

        let formattedFieldToBeDeleted = fieldArray.join(" ");
        let formattedObject;

        console.log("FieldArray (formattedFieldToBeDeleted) after modifications: ", formattedFieldToBeDeleted);

        console.log("event.target.parentElement.parentElement.innerText: ", event.target.parentElement.parentElement.innerText);
        console.log("event.target.parentElement.parentElement.parentElement.parentElement.innerText: ", event.target.parentElement.parentElement.parentElement.parentElement.innerText);

        formattedObject = {"skill_name": formattedFieldToBeDeleted, "skill_refresh_date": "2022-01-01"};



        console.log("formattedObject: ", formattedObject);





        setItemToBeDeleted(formattedObject);

        // event.target.nextSibling.textContent

        // event.target.parentElement.parentElement.innerText
    }
    // useEffect for updates
    useEffect(() => {

        console.log("newFieldChanges inside annual training: ", newFieldChanges);

        let userId = loggedUser[0].id;

        const fetchFieldHelper = (field) => {

            /*
            const response = await fetch('https://httpbin.org/post', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            */

            let patchBody = {
                method: 'PATCH',
                body: JSON.stringify(field),
                headers: {"Access-Control-Allow-Origin": "*"}
            }

            if (field.skill_refresh_date) {

                console.log("field: ", field);
                    fetch(`http://localhost:3001/special_skills/${userId}`, {
                        method: 'PATCH',
                        body: JSON.stringify(field),
                        headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                    })
                    .then(response => response.json())
                    .then(data => console.log("Success: ", data))
                    .catch(err => console.log("err: ", err))
              
            }

              // } else if () {
                    
                // } else if () {
                    
                // } else if () {
                    
                // } else if () {
                    
                // } else if () {
                    
                // }

        }

        let newFieldChangesPromisesArray = [];

        newFieldChanges.forEach((fieldObject, index) => {
            
            newFieldChangesPromisesArray.push(new Promise(() => fetchFieldHelper(fieldObject)));

        })

        console.log("newFieldChangesPromisesArray: ", newFieldChangesPromisesArray)

        Promise.all(newFieldChangesPromisesArray)
        .then(info => {
            console.log("All fields updated!")
            setNewFieldChanges([]);
        })
        .then(info => {
            setLoggedUserToggle(loggedUserToggle += 1);
        })
        .then(info => {
            console.log("loggedUserToggle in ProfileCards: ", loggedUserToggle);
        })
        


    }, [fieldChanged])

    // useEffect for deletes
    useEffect(() => {

        let userId = loggedUser[0].id;
        let promise;

        console.log("item to be deleted: ", itemToBeDeleted);

        if (itemToBeDeleted !== undefined) {
            try {

                if (itemToBeDeleted.skill_refresh_date) {
                        
                    promise = (
                        
                        fetch(`http://localhost:3001/special_skills/${userId}`, {
                            method: 'DELETE',
                            body: JSON.stringify(itemToBeDeleted),
                            headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                        })
                        .then(response => response.json())
                        .then(data => console.log("Success: ", data))
                        .catch(err => console.log("err: ", err))

                    )

                    if (promise !== undefined) {

                        promise
                        .then(result => {

                            console.log("result of deletion: ", result);

                        })

                    }
                }
            } catch (error) {

                console.log("parentSibling was likely not rendered yet or interpreted, try clicking the delete button again. error: ", error);

            }
        }

            


    }, [itemToBeDeleted])


    return (
        <ul key="1" className="w-10/12 h-8/12 width: 'vw' list-none flex flex-row flex-wrap gap-8 border border-2 border-gray border-double mx-auto my-8 p-4 bg-[#A3BD8A] rounded-lg shadow-2xl ">
            <div>
                <h2 className="text-3xl font-bold border-r-2 py-2 pr-8">Special Training</h2>
                
                    {updateFieldsToggle % 2 !== 0 ? 
                        <>
                        <h2 className="text-xl font-bold border-r-2 py-2 pr-8 border-gray text-green-100">Add New Special Training
                        <br/>
                        <i className="text-sm text-center font-normal">Separate each additional entry with a comma</i>
                                </h2> 
                                </>
                                : <></>
                        
                    } 
                    

            </div>
            {updateFieldsToggle % 2 !== 0 ? <AddItem itemName="New Special Training Name(s):" itemType="Special Training" itemIdentifier="specialTraining"/> : <></>}
            
            {
                loggedUser[0].username !== serviceMember.username ? 
                serviceMemberSummary.map((obj, index) => {
                    console.log("loggedUserSummary: ", loggedUserSummary)
                    console.log("obj: ", obj)
                    if (obj.skill_refresh_date) {
                        console.log("test")
                        //props.elements.map((skill, index) => {

                        let currentLabel = "";
                        let currentLabelStatus = "";
                        let amber = false;
                        let red = false;

                        let date;
                        let msDate;
                        let uiDate;

                        currentLabel = obj.skill_name;

                        // { id: 1, skill_name: "Foreign Language", refresh_date: "2022-06-06", users_id: 1 }

                        if (new Date(obj.skill_refresh_date).valueOf() > Date.now()) {

                            date = new Date(obj.skill_refresh_date).valueOf();
                            msDate = new Date(parseInt(date, 10));
                            uiDate = msDate.toDateString();
                            currentLabelStatus = 'Due Date\n' + uiDate;

                            if (new Date(obj.skill_refresh_date).valueOf() - Date.now() <= 2592000000) {

                                date = new Date(obj.skill_refresh_date).valueOf();
                                msDate = new Date(parseInt(date, 10));
                                uiDate = msDate.toDateString();
                                amber = true;
                                currentLabelStatus = 'Due Date\n' + uiDate;

                            }

                        } else if (new Date(obj.skill_refresh_date).valueOf() < Date.now()) {

                            date = new Date(obj.skill_refresh_date).valueOf();
                            msDate = new Date(parseInt(date, 10));
                            uiDate = msDate.toDateString();
                            red = true;
                            currentLabelStatus = 'Due Date\n' + uiDate;
                        }
                        
                        if (currentLabel === "") {
                            return <></>
                            
                        } else {
                            
                            
                        if (loggedUser !== []) {
                            if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined) { 
                                if (updateFieldsToggle % 2 === 0) {
                                    return ( 
                                        <li
                                        key={index}
                                        className={colorHelper(amber, red)}>
                                        <strong className="text-center">
                                            {/* If label isn't annual training, put colon after label */}
                                            {currentLabelHelper(currentLabel)}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                
                                        </strong>
                                        <strong className="text-center">
                                            {/* If label isn't annual training, do not add colon on new line */}
                                            {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                        </strong>
                                        { console.log(`currentLabelStatus: ${currentLabel}, `, currentLabelStatus) }
                                        <p className="text-center">{currentLabelStatus}</p>
                                        </li> 
                                    )
                                } else {
                                    return ( 
                                        <li
                                        key={index}
                                        className="bg-slate-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all">
                                        <strong className="text-center">
                                        <IoIcons.IoIosCloseCircleOutline 
                                        className="mx-auto w-8 h-8 text-red-500 border border-red-500 rounded-3xl hover:bg-black"
                                        onClick={(event) => { deleteFieldHelper(event) }}/>
                                            {/* If label isn't annual training, put colon after label */}
                                            {"New " + currentLabelHelper(currentLabel) + " Due Date"}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                
                                        </strong>
                                        <strong className="text-center">
                                            {/* If label isn't annual training, do not add colon on new line */}
                                            {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                        </strong>
                                        <br/>
                                        <br/>
                                        { /* dateHelper(uiDate) */ }
                                        <input type="date" defaultValue={dateHelper(uiDate)} onChange={(event) => console.log("event.target.value: ", updateFieldHelper(obj, event.target.value))} />
                                        </li> 
                                    )
                                }

                            } else {

                                <li

                                key={index}
                                className={colorHelper(amber, red)}>

                                <strong className="text-center">
                                    Loading...
                                </strong>

                                <p className="text-center">Loading...</p>

                                </li>

                            }
                        }

                        }
                    } else {
                        return <></>;

                    }
                })
                :
                loggedUserSummary.map((obj, index) => {
                    console.log("loggedUserSummary: ", loggedUserSummary)
                    console.log("obj: ", obj)
                    if (obj.skill_refresh_date) {
                        console.log("test")
                        //props.elements.map((skill, index) => {

                        let currentLabel = "";
                        let currentLabelStatus = "";
                        let amber = false;
                        let red = false;

                        let date;
                        let msDate;
                        let uiDate;

                        currentLabel = obj.skill_name;

                        // { id: 1, skill_name: "Foreign Language", refresh_date: "2022-06-06", users_id: 1 }

                        if (new Date(obj.skill_refresh_date).valueOf() > Date.now()) {

                            date = new Date(obj.skill_refresh_date).valueOf();
                            msDate = new Date(parseInt(date, 10));
                            uiDate = msDate.toDateString();
                            currentLabelStatus = 'Due Date\n' + uiDate;

                            if (new Date(obj.skill_refresh_date).valueOf() - Date.now() <= 2592000000) {

                                date = new Date(obj.skill_refresh_date).valueOf();
                                msDate = new Date(parseInt(date, 10));
                                uiDate = msDate.toDateString();
                                amber = true;
                                currentLabelStatus = 'Due Date\n' + uiDate;

                            }

                        } else if (new Date(obj.skill_refresh_date).valueOf() < Date.now()) {

                            date = new Date(obj.skill_refresh_date).valueOf();
                            msDate = new Date(parseInt(date, 10));
                            uiDate = msDate.toDateString();
                            red = true;
                            currentLabelStatus = 'Due Date\n' + uiDate;
                        }
                        
                        if (currentLabel === "") {
                            return <></>
                            
                        } else {
                            
                            
                        if (loggedUser !== []) {
                            if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined) { 
                                if (updateFieldsToggle % 2 === 0) {
                                    return ( 
                                        <li
                                        key={index}
                                        className={colorHelper(amber, red)}>
                                        <strong className="text-center">
                                            {/* If label isn't annual training, put colon after label */}
                                            {currentLabelHelper(currentLabel)}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                
                                        </strong>
                                        <strong className="text-center">
                                            {/* If label isn't annual training, do not add colon on new line */}
                                            {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                        </strong>
                                        { console.log(`currentLabelStatus: ${currentLabel}, `, currentLabelStatus) }
                                        <p className="text-center">{currentLabelStatus}</p>
                                        </li> 
                                    )
                                } else {
                                    return ( 
                                        <li
                                        key={index}
                                        className="bg-slate-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all">
                                        <strong className="text-center">
                                        <IoIcons.IoIosCloseCircleOutline 
                                        className="mx-auto w-8 h-8 text-red-500 border border-red-500 rounded-3xl hover:bg-black"
                                        onClick={(event) => { deleteFieldHelper(event) }}/>
                                            {/* If label isn't annual training, put colon after label */}
                                            {"New " + currentLabelHelper(currentLabel) + " Due Date"}{currentLabelHelper2(currentLabel) === undefined ? ":" : ""}
                
                                        </strong>
                                        <strong className="text-center">
                                            {/* If label isn't annual training, do not add colon on new line */}
                                            {currentLabelHelper2(currentLabel)}{currentLabelHelper2(currentLabel) !== undefined ? ":" : ""}
                                        </strong>
                                        <br/>
                                        <br/>
                                        { /* dateHelper(uiDate) */ }
                                        <input type="date" defaultValue={dateHelper(uiDate)} onChange={(event) => console.log("event.target.value: ", updateFieldHelper(obj, event.target.value))} />
                                        </li> 
                                    )
                                }

                            } else {

                                <li

                                key={index}
                                className={colorHelper(amber, red)}>

                                <strong className="text-center">
                                    Loading...
                                </strong>

                                <p className="text-center">Loading...</p>

                                </li>

                            }
                        }

                        }
                    } else {
                        return <></>;

                    }
                })

            }
            
        </ul>
    )
};


export const StaticTraining = (props) => {

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
        loggedUserServiceMembers,
        setLoggedUserServiceMembers,
        loggedUserServiceMemberSummaries,
        setLoggedUserServiceMemberSummaries,
        loggedUserServiceMemberPromiseChainComplete,
        setLoggedUserServiceMemberPromiseChainComplete,
        updateFieldsToggle,
        setUpdateFieldsToggle,
        fieldChanged,
        setFieldChanged,
        newFieldChanges,
        setNewFieldChanges,
        fieldFetchesComplete, 
        setFieldFetchesComplete,
        itemToBeDeleted, 
        setItemToBeDeleted,
        serviceMember,
        serviceMemberSummary,
        setServiceMemberSummary
    }
        = useContext(AppContext);

        const currentLabelHelper = (currentLabel) => {

            if (currentLabel == "Annual Training") {
                return "Annual"
            } else {
                return currentLabel;
            }
    
        }
    
        const currentLabelHelper2 = (currentLabel) => {
    
            if (currentLabel === "Annual Training") {
                return "Training"
            } else {
                return;
            }
    
        }
    
        const dateHelper = (uiDate) => {
    
            const monthHelper = (month) => {
    
                switch (month.toLowerCase()) {
    
                    case 'jan':
                        return '01';
                        break;
                    
                    case 'feb':
                        return '02';
                        break;
    
                    case 'mar':
                        return '03';
                        break;
                        
                    case 'apr':
                        return '04';
                        break;
                    
                    case 'may':
                        return '05';
                        break;
            
                    case 'jun':
                        return '06';
                        break;
                    
                    case 'jul':
                        return '07';
                        break;
    
                    case 'aug':
                        return '08';
                        break;
            
                    case 'sep':
                        return '09';
                        break;
    
                    case 'oct':
                        return '10';
                        break;
    
                    case 'nov':
                        return '11';
                        break;
    
                    case 'dec':
                        return '12';
                        break;
                    default:
                        break;
    
                }
    
            }
    
            let dateArray = uiDate.split(" ");
    
            console.log("dateArray: ", dateArray);
            
            let correctedDateFormat = `${dateArray[3]}-${monthHelper(dateArray[1])}-${dateArray[2]}`;
    
            console.log("correctedDateFormat: ", correctedDateFormat);
            return correctedDateFormat;
    
        }
    
        const updateFieldHelper = (object, newDate) => {
    
            console.log("static training object, newDate: ", object, newDate);
            let objectKeyName = Object.keys(object)[1];
            let objectKeyNameValue = Object.values(object)[1];
    
            let objectKeyDateName = Object.keys(object)[2];
            let objectToPush = {[objectKeyName]: objectKeyNameValue, [objectKeyDateName]: newDate };
            
    
            let newFieldChangesCopy = newFieldChanges.slice();
    
            let alreadyExists = false;
    
            for (let object of newFieldChangesCopy) {
                if ( Object.values(objectToPush)[0] == Object.values(object)[0] ) {
                    alreadyExists = true;
                
                }
            }
            
    
            if (alreadyExists) {
                for (let object of newFieldChangesCopy) {
                    if (Object.values(objectToPush)[0] == Object.values(object)[0]) {
                        object[objectKeyDateName] = newDate;
                    }
                }
            } else {
                newFieldChangesCopy.push(objectToPush);
            }
            
    
            setNewFieldChanges(newFieldChangesCopy);
    
            setTimeout(() => console.log("new FIeld changes: ", newFieldChanges), 5000);
    
        }

        const deleteFieldHelper = (event) => { 

        

            console.log(event);
            console.log("event.target.parentElement.textContent: ", event.target.parentElement.textContent);
            console.log("typeof event.target.parentElement.textContent: ", typeof event.target.parentElement.textContent);
    
            let fieldArray = event.target.parentElement.textContent.split(" ");

            console.log("FieldArray: ", fieldArray);
    
            for (let iterator = 0; iterator < fieldArray.length; iterator++) {
                if (fieldArray[iterator] === "New") {
                    fieldArray.splice(iterator, 1);
                }
                if (fieldArray[iterator] === "Completion") {
                    fieldArray.splice(iterator, 1);
                }
                if (fieldArray[iterator] === "Date:") {
                    fieldArray.splice(iterator, 1);
                }
            }
    
            let formattedFieldToBeDeleted = fieldArray.join(" ");
            let formattedObject;
    
            console.log("FieldArray (formattedFieldToBeDeleted) after modifications: ", formattedFieldToBeDeleted);
    
            console.log("event.target.parentElement.parentElement.innerText: ", event.target.parentElement.parentElement.innerText);
            console.log("event.target.parentElement.parentElement.parentElement.parentElement.innerText: ", event.target.parentElement.parentElement.parentElement.parentElement.innerText);
    
    

            formattedObject = {"skill_name": formattedFieldToBeDeleted, "skill_date": "2022-01-01"};
    
        
    
    
            console.log("formattedObject: ", formattedObject);
    
    
    
    
    
            setItemToBeDeleted(formattedObject);
    
            // event.target.nextSibling.textContent
    
            // event.target.parentElement.parentElement.innerText
        }
    
        // useEffect for updates
        useEffect(() => {
    
            console.log("newFieldChanges inside annual training: ", newFieldChanges);
    
            let userId = loggedUser[0].id;
    
            const fetchFieldHelper = (field) => {
    
                /*
                const response = await fetch('https://httpbin.org/post', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {'Content-Type': 'application/json'}
                });
                */
    
                let patchBody = {
                    method: 'PATCH',
                    body: JSON.stringify(field),
                    headers: {"Access-Control-Allow-Origin": "*"}
                }
    
                if (field.skill_date) {
    
                    console.log("field: ", field);
                        fetch(`http://localhost:3001/static_skills/${userId}`, {
                            method: 'PATCH',
                            body: JSON.stringify(field),
                            headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                        })
                        .then(response => response.json())
                        .then(data => console.log("Success: ", data))
                        .catch(err => console.log("err: ", err))
                  
                }
    
                  // } else if () {
                        
                    // } else if () {
                        
                    // } else if () {
                        
                    // } else if () {
                        
                    // } else if () {
                        
                    // }
    
            }
    
            let newFieldChangesPromisesArray = [];
    
            newFieldChanges.forEach((fieldObject, index) => {
                
                newFieldChangesPromisesArray.push(new Promise(() => fetchFieldHelper(fieldObject)));
    
            })
    
            console.log("newFieldChangesPromisesArray: ", newFieldChangesPromisesArray)
    
            Promise.all(newFieldChangesPromisesArray)
            .then(info => {
                console.log("All fields updated!")
                setNewFieldChanges([]);
            })
            .then(info => {
                setLoggedUserToggle(loggedUserToggle += 1);
            })
            .then(info => {
                console.log("loggedUserToggle in ProfileCards: ", loggedUserToggle);
            })
            
    
    
        }, [fieldChanged])

        // useEffect for deletes
        useEffect(() => {

            let userId = loggedUser[0].id;
            let promise;

            console.log("item to be deleted: ", itemToBeDeleted);

            if (itemToBeDeleted !== undefined) {
                try {

                    if (itemToBeDeleted.skill_date) {

                        promise = (
                            
                            fetch(`http://localhost:3001/static_skills/${userId}`, {
                                method: 'DELETE',
                                body: JSON.stringify(itemToBeDeleted),
                                headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
                            })
                            .then(response => response.json())
                            .then(data => console.log("Success: ", data))
                            .catch(err => console.log("err: ", err))

                        )

                    }

                    if (promise !== undefined) {

                        promise
                        .then(result => {

                            console.log("result of deletion: ", result);

                        })

                    }
                } catch (error) {

                    console.log("parentSibling was likely not rendered yet or interpreted, try clicking the delete button again. error: ", error);

                }
            }

                


        }, [itemToBeDeleted])


    return (
        <ul className="w-10/12 h-8/12 list-none flex gap-8 border border-2 border-gray border-double mx-auto my-8 p-4 bg-[#A3BD8A] rounded-lg shadow-2xl ">
            <div>
                <h2 className="text-3xl font-bold border-r-2 py-0 pr-8">Static Training</h2>
                <h5 className="font-bold border-r-2 py-2 pr-8">Relevant Training with no recertification required</h5>

                {updateFieldsToggle % 2 !== 0 ? 
                        <>
                        <h2 className="text-xl font-bold border-r-2 py-2 pr-8 border-gray text-green-100">Add New Static Training
                        <br/>
                        <i className="text-sm text-center font-normal">Separate each additional entry with a comma</i>
                                </h2> 
                                </>
                                : <></>
                        
                    } 
            </div>
            {updateFieldsToggle % 2 !== 0 ? <div><AddItem itemName="New Static Training Name(s):" itemType="Static Training" itemIdentifier="staticTraining"/></div> : <></>}
            <ul id='static'>
                <ul>
                    
                    { loggedUser[0].username !== serviceMember.username ? 
                        serviceMemberSummary.map((obj, index) => {
                            console.log("loggedUserSummary: ", loggedUserSummary)
                            console.log("obj: ", obj)
                            if (obj.skill_name && !obj.skill_refresh_date) {
                                if (loggedUser !== []) {
                                    if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined) { 
                                        if (updateFieldsToggle % 2 === 0) {
                                            return ( 
                                                <li
                                                key={index}
                                                className="">
                                                <strong className="text-center">
                                                    {/* If label isn't annual training, put colon after label */}
                                                    {obj.skill_name}<i className="font-normal"> -- { obj.skill_date}</i>
                        
                                                </strong>
                                                </li> 
                                            )
                                        } else {
                                            return ( 
                                                <li
                                                key={index}
                                                className="">
                                                <strong className="text-center">
                                                <IoIcons.IoIosCloseCircleOutline 
                                                        className="mx-auto w-8 h-8 text-red-500 border border-red-500 rounded-3xl hover:bg-black"
                                                        onClick={(event) => { deleteFieldHelper(event) }}/>
                                                    {/* If label isn't annual training, put colon after label */}
                                                    New {obj.skill_name} Completion Date:
                                                </strong>
                                                &nbsp;&nbsp;&nbsp;<input type="date" defaultValue={obj.skill_date} onChange={(event) => console.log("event.target.value: ", updateFieldHelper(obj, event.target.value))} />
                                                </li> 
                                            )
                                        }
        
                                    } else {
        
                                        <li
        
                                        key={index}
                                        className="">
        
                                        <strong className="text-center">
                                            Loading...
                                        </strong>
        
                                        <p className="text-center">Loading...</p>
        
                                        </li>
        
                                    }
                                }
        
                                
                            } else {
                                return <></>;
        
                            }
                                return (
                                    <li key={index}>
                                        {obj.skill_name}--
                                        {obj.skill_date}
                                    </li>
                                )
                            
                        })
                        :
                        loggedUserSummary.map((obj, index) => {
                            console.log("loggedUserSummary: ", loggedUserSummary)
                            console.log("obj: ", obj)
                            if (obj.skill_name && !obj.skill_refresh_date) {
                                if (loggedUser !== []) {
                                    if (loggedUserPromiseChainComplete === true && loggedUserSummary[0] !== undefined) { 
                                        if (updateFieldsToggle % 2 === 0) {
                                            return ( 
                                                <li
                                                key={index}
                                                className="">
                                                <strong className="text-center">
                                                    {/* If label isn't annual training, put colon after label */}
                                                    {obj.skill_name}<i className="font-normal"> -- { obj.skill_date}</i>
                        
                                                </strong>
                                                </li> 
                                            )
                                        } else {
                                            return ( 
                                                <li
                                                key={index}
                                                className="">
                                                <strong className="text-center">
                                                <IoIcons.IoIosCloseCircleOutline 
                                                        className="mx-auto w-8 h-8 text-red-500 border border-red-500 rounded-3xl hover:bg-black"
                                                        onClick={(event) => { deleteFieldHelper(event) }}/>
                                                    {/* If label isn't annual training, put colon after label */}
                                                    New {obj.skill_name} Completion Date:
                                                </strong>
                                                &nbsp;&nbsp;&nbsp;<input type="date" defaultValue={obj.skill_date} onChange={(event) => console.log("event.target.value: ", updateFieldHelper(obj, event.target.value))} />
                                                </li> 
                                            )
                                        }
        
                                    } else {
        
                                        <li
        
                                        key={index}
                                        className="">
        
                                        <strong className="text-center">
                                            Loading...
                                        </strong>
        
                                        <p className="text-center">Loading...</p>
        
                                        </li>
        
                                    }
                                }
        
                                
                            } else {
                                return <></>;
        
                            }
                                return (
                                    <li key={index}>
                                        {obj.skill_name}--
                                        {obj.skill_date}
                                    </li>
                                )
                            
                        })
                    }

                </ul>
            </ul>
        </ul>
    )

};