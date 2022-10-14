//const { useState } = require("react")
import React, { useState, useEffect, useContext } from "react";
import IndivTag from "./IndivTag";
import SubTag from "./SubTag";
import { AppContext } from '../AppContext';


export const AddItem = (props) => {
    
    let [ submitMessage, setSubmitMessage ] = useState(0);

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
        formattedItemsCollection,
        setFormattedItemsCollection
    }
        = useContext(AppContext);

    useEffect(() => {

    }, [fieldChanged])


    const removeInputTextHelper = (id) => {

        document.getElementById(`${id}`).value = "";

    }

    const itemTypeHelper = (currentItems, itemType) => {

        let userId = loggedUser[0].id;

        // remove empty array elements
        for (let iterator = 0; iterator < currentItems.length; iterator++) {
            if (currentItems[iterator] === "") {
                currentItems.splice(iterator, 1);
            }
        }

        console.log("currentItems: ", currentItems);
        let defaultDate = "2022-01-01";
        let formattedItemsArray = [];

            if (itemType === "Annual Training") {

                for (let item of currentItems) {

                    let annualTrainingObject = {

                        "training_name": item,
                        "training_date": defaultDate,
                        "users_id": userId

                    }

                    formattedItemsArray.push(annualTrainingObject)
                    
                }

            } else if (itemType === "Special Training") {

                for (let item of currentItems) {
                    
                    let specialTrainingObject = {

                        "skill_name": item,
                        "skill_refresh_date": defaultDate,
                        "users_id": userId

                    }

                    formattedItemsArray.push(specialTrainingObject)

                }

            } else if (itemType === "Static Training") {

                for (let item of currentItems) {
                
                    let staticTrainingObject = {

                        "skill_name": item,
                        "skill_date": defaultDate,
                        "users_id": userId

                    }

                    formattedItemsArray.push(staticTrainingObject)
                }

            }

        

        let formattedItemsCollectionCopy = formattedItemsCollection.slice();
        formattedItemsCollectionCopy.push(formattedItemsArray) 
        setFormattedItemsCollection(formattedItemsCollectionCopy)
        console.log("formattedItemsCollection: ", formattedItemsCollection);

    }

    const inputHandler = (event) => {

        console.log("event: ", event);
        event.preventDefault();

        const formHelper = (destructuredInput) => {
            let currentItem = destructuredInput.value;
        console.log("currentItem: ", currentItem);
        let currentItems;

        // if (currentItems === undefined) {
        //     switch(props.itemType) {

        //         case 'Annual Training':
        //             itemTypeHelper(currentItem, "Annual Training")
        //             break;

        //         case 'Special Training':
        //             itemTypeHelper(currentItem, "Special Training")
        //             break;

        //         case 'Static Training':
        //             itemTypeHelper(currentItem, "Static Training")
        //             break;
        //     }
        
        if (currentItem.includes(",")) {

            currentItems = currentItem.split(',');

            switch(props.itemType) {

                case 'Annual Training':
                    console.log("itemTypeHelper annual training firing")
                    itemTypeHelper(currentItems, "Annual Training");
                    break;
    
                case 'Special Training':
                    itemTypeHelper(currentItems, "Special Training");
                    break;
    
                case 'Static Training':
                    itemTypeHelper(currentItems, "Static Training");
                    break;
            }

        } else {
            currentItem = currentItem + ",";
            currentItems = currentItem.split(',');

            switch(props.itemType) {

                case 'Annual Training':
                    console.log("itemTypeHelper annual training firing")
                    itemTypeHelper(currentItems, "Annual Training");
                    break;
    
                case 'Special Training':
                    itemTypeHelper(currentItems, "Special Training");
                    break;
    
                case 'Static Training':
                    itemTypeHelper(currentItems, "Static Training");
                    break;
            }


        }
    }

        // console.log("event.target.innerHTML: ", event.target.innerHTML.includes("name"));
        // console.log("typeof event.target.innerHTML: ", typeof event.target.innerHTML);
        if (event.target.innerHTML.includes("annualTraining")) {
            console.log("annualTraining event fired")
            let { annualTraining } = document.forms[0];
            formHelper(annualTraining);
        } else if (event.target.innerHTML.includes("specialTraining")) {
            let { specialTraining } = document.forms[1];
            formHelper(specialTraining);

        } else if (event.target.innerHTML.includes("staticTraining")) {
            let { staticTraining } = document.forms[2];
            formHelper(staticTraining);

        }

        


    }

    return (
        <li
        key="100"
        className="bg-orange-400 border border-2 border-black border-double py-2 px-4 py-4 rounded-md shadow-lg break-all">
        <strong className="text-center">
            {/* If label isn't annual training, put colon after label */}
            <label>{props.itemName}</label>
            <br/>
            <form onSubmit={inputHandler}>
                <input type="text" name={props.itemIdentifier} id={props.itemIdentifier} />
                <input style={{background: "transparent"}} className="hover:bg-white" type="submit" onClick={(event) => { setSubmitMessage(submitMessage += 1); setTimeout((event) => { setSubmitMessage(submitMessage += 1); removeInputTextHelper(props.itemIdentifier); }, 8000);  }}/>
                <p className={submitMessage % 2 === 0 ? "hidden" : ""}>Submitted! <br/> Click <strong className="text-green-100">Submit Changes</strong> above to see your changes.</p>
            </form>
        </strong>
        <br/>
        <br/>
        { /* dateHelper(uiDate) */ }
        
        </li> 
    )
}

// border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all