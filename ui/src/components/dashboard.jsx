//const { useState } = require("react")
import React, { useState, useEffect, useContext } from "react";
import './dashboard.css';
import styled from 'styled-components';
import IndivTag from "./IndivTag";
import SubTag from "./SubTag";
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';




function Dashboard() {
const [ skillEntered, setSkillEntered ] = useState('');
const [ filteredData, setFilteredData ] = useState([]);
const [ skillFilter, setSkillFilter ] = useState([]);
const [skillsArr, setSkillsArr] = useState([]);

// const [memberArr, setMemberArr] = useState([]);
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
        loggedUserServiceMembers, 
        setLoggedUserServiceMembers,
        loggedUserServiceMemberSummaries, 
        setLoggedUserServiceMemberSummaries,
        loggedUserServiceMemberPromiseChainComplete, 
        setLoggedUserServiceMemberPromiseChainComplete,
        serviceMember,
        setServiceMember,
         
        } 
    = useContext(AppContext);

   /* const searchHandler = (e) => {
        const searchWord = e.target.value;
        setSkillEntered(searchWord);
        const newFilter = loggedUserServiceMemberSummaries.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });


        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };
    */
 
    const samesiesFunc = (id) => {
        return loggedUserServiceMembers.map((member, index, key) => {
            if (member.id === id /*&& !memberArr.includes(id)*/) {
                // if(!memberArr.includes(member)){
                //     setMemberArr({...memberArr, member})
                // }
            
              return ( 
                <div  onClick={() => {console.log("THIS IS SUBORD"); setServiceMember(member)}}>
              <Link to={`/${member.username}`}> <SubTag  elements={ loggedUserServiceMemberSummaries[index] } currentSM= { member } key={key}/>
              </Link>
              </div>) }
        })
    };


    const renderFunc = (key) => {
      return loggedUserServiceMembers.map((member, index) => {
            {console.log("loggedUserServiceMembers: ", loggedUserServiceMembers)}
            {console.log(member)}
            {console.log(loggedUserServiceMemberSummaries[index])}
            {console.log("loggedUserServiceMemberSummaries: ", loggedUserServiceMemberSummaries)}
            return ( 
                <div  onClick={() => {console.log("THIS IS SUBORD"); setServiceMember(member)}}>
            <Link to={`/${member.username}`} > <SubTag  elements={ loggedUserServiceMemberSummaries[index] } currentSM= { member } key={key}/>
            </Link>
            </div>)   
      })};
      

     const skillHandler = (e) => {
        const searchWord = e.target.value;
        setSkillEntered(searchWord);
        let newFilter;
          newFilter = skillsArr.filter((value) => {
            return value.skill_name.toLowerCase().includes(searchWord.toLowerCase());
                
        });

        if (searchWord === "") {
            setSkillFilter([]);
        } else {
            setSkillFilter(newFilter);
            console.log("skillFilter: ", skillFilter)
        }
        // const newFilter = []
       // for(let i=0;i<skillsArr.length;i++){
        //    if(skillsArr[i][0].skill_name.toLowerCase().includes(searchWord.toLowerCase())){
          //      console.log('the skilliest of filters', skillsArr[i][0])
        //         setSkillFilter(skillsArr[i][0]) 
               
        //     }else {
        //         setSkillFilter([]);
        //     }
        // }
        // console.log("fucking work already", newFilter)

        // const secondFilter = newFilter.filter((value) =>{  
        //     console.log("gimme message bitch",value.skill_name)
        //     return value.skill_name.toLowerCase().includes(searchWord.toLowerCase());
        // })
        // console.log("filter these nuts", newFilter)
        // if (searchWord === "") {
        //     setSkillFilter([]);
        // } else {
        //     setSkillFilter(newFilter);
        // }
    };
    
       
    useEffect(() => {
        let newArr = [];
        loggedUserServiceMembers.map((member)=>{
            fetch(`http://localhost:3001/special_skills/${member.id}`)
            .then(response => response.json())
            .then(specialData => (specialData.map((data)=>newArr.push(data))))

            fetch(`http://localhost:3001/static_skills/${member.id}`)
            .then(response => response.json())
            .then(staticData => (staticData.map((data)=>newArr.push(data))))
        })
        
        
        setSkillsArr(newArr)
        console.log("This is NEWARR HOE", skillsArr)
    }, [loggedUserServiceMembers])

    const searchFunc = (key) => {
       
            console.log("MADE IT TO HERE")
            if(skillFilter.length != 0){
                return(
                //   <div className="dataResult">
                <>
                    {skillFilter.map((value, key) => {
                        console.log("WTF IS THIS: ", value.skill_name.toLowerCase().includes(skillEntered.toLowerCase()))
                        return (
                            <div style={{width: '100%'}}>
                            { value.skill_name.toLowerCase().includes(skillEntered.toLowerCase()) ? samesiesFunc(value.users_id)/*smth like this*/ : <p>YOU SUCK BUT IT WORKED!</p>}
                            </div> 
                        );
                    })}</>
                // </div>   
                )
                
            }
 
    };
    


  // Temporary use effect to set hardcoded LoggedInUser until we have logging in functionality
     useEffect(() => {
         fetch('http://localhost:3001/users')
    //     .then(response => response.json())
    //     .then(data => setLoggedUser([{id: 6, username:'ocelottip',name: 'Joe Rogan', password: '1234', rank: 'O6',supervisor_id:null,organization_id:3, MOS:'35F', current_status: "PDY"}]))
    //     .then(data => {
    //         console.log(loggedUser);
    //         console.log("Hello!")
        
    //     })
        .then(data => {
        setLoggedUserToggle(loggedUserToggle += 1)
        console.log(loggedUserToggle);
     })
        .catch(err => {
            console.error("err: ", err)
        })
     }, [])


    // grab logged user org
    useEffect(() => {
        console.log(loggedUser);
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
        console.log("medical: ", loggedUser[0]);
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
            fetch(`http://localhost:3001/special_skills/`)
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
        
        Promise.all([medicalPromise, annualTrainingPromise])
        .then((info) => {
            
            console.log("all promises complete");
            // add SM status from loggedUser
            console.log(loggedUser[0].status)
            loggedUserArray.push({ current_status: loggedUser[0].current_status});
            for (let promise of info) {
                console.log("promise: ", promise)
                promiseAllHelper(promise, promise.length)
            }
            console.log("loggedUserArray: ", loggedUserArray);
            setLoggedUserSummary(loggedUserArray);
        })

    }, [loggedUserToggle])

    // grab all subordinate user inforatmion
    useEffect(() => {

        let summariesCopy = loggedUserServiceMemberSummaries.slice();

        const removeDuplicates = (array) => {

            let uniqueArray = [];
          
            for (let iterator = 0; iterator < array.length; iterator++) {
          
                let foundDuplicate = false;
          
                for (let iterator2 = 0; iterator2 < uniqueArray.length; iterator2++) {
                    if (uniqueArray[iterator2].id === array[iterator].id) {
                        foundDuplicate = true;
                    }
                }
          
                if (!foundDuplicate) {
                    uniqueArray.push(array[iterator])
                }
          
            }
          
            return uniqueArray;
            
          }

        const addSubordinate = (user, userId) => {
            let medicalPromise = (
                fetch(`http://localhost:3001/medical/${userId}`)
                .then(response => response.json())
                .then(data => {
                    
                    // setLoggedUserSummary([...loggedUserSummary, ...data])
                    console.log("medical promise subordinate")
                    return data;
                })
            )
            let annualTrainingPromise = ( 
                fetch(`http://localhost:3001/annual_training/${userId}`)
                .then(response => response.json())
                .then(data => {
                
                    // setLoggedUserSummary([...loggedUserSummary, ...data])
                    console.log("annual training promise subordinate ")
                    return data;
                })
            )

            // iterate through each promise and return the element (recursive), to prevent nested for loops below
            // in Promise.all

            let currentUserArray = [];

            const promiseAllHelper = (promise, promiseLength) => {
                console.log("promiseAllhelper promise: ", promise);
                console.log("promiseAllhelper promiseLength: ", promiseLength);
                if (promiseLength == 0) {
                    
                } else {
                    
                    console.log("pushing promise[promiseLength - 1]: ", promise[promiseLength - 1]);
                    currentUserArray.push(promise[promiseLength - 1])
                    promiseLength -= 1;
                    promiseAllHelper(promise, promiseLength)
                }
            

        }

            Promise.all([medicalPromise, annualTrainingPromise])
            .then((info) => {
                console.log("all current subordinate promises complete");
                // add SM status from loggedUser
                currentUserArray.push({ current_status: user.current_status});
                for (let promise of info) {
                    console.log("promise: ", promise)
                    promiseAllHelper(promise, promise.length)
                }
                console.log("currentUserArray: ", currentUserArray);
            })
            .then((info) => {
                
                console.log("summariesCopy before push: ", summariesCopy)
                summariesCopy.push(currentUserArray);
                console.log("summariesCopy after push: ", summariesCopy)
            })
            .then((info) => {

                if (summariesCopy.length === loggedUserServiceMembers.length) {
                    setLoggedUserServiceMemberSummaries(summariesCopy);
                }

            })
                
        }

        let subordinatePromises = [];

        let usersCopy = loggedUserServiceMembers.slice();

        for (let user of allUsers) {
            console.log("supervisor user: ", loggedUser)
            console.log("user: ", user)
            if (user.supervisor_id === loggedUser[0].id) {
                console.log("supervisor match")
                
                usersCopy.push(user);
                console.log("usersCopy: ", usersCopy);

                usersCopy = removeDuplicates(usersCopy);

                setLoggedUserServiceMembers(usersCopy);

                
                // promise chain with promise.all
                subordinatePromises.push(new Promise(() => { addSubordinate(user, user.id)}));
            }
        }



        console.log("loggedUserServiceMemberSummaries[0]: ", loggedUserServiceMemberSummaries[0])
        console.log("loggedUserServiceMemberSummaries[0]: ", loggedUserServiceMemberSummaries[0])
        console.log("loggedUserServiceMembers: ", loggedUserServiceMembers);
        console.log("subordinatePromises: ", subordinatePromises);

        setTimeout(() => Promise.all(subordinatePromises)
        .then((info) => {

            setLoggedUserServiceMemberPromiseChainComplete(true);
            console.log("ALL SUBORDINATES PROMISE COMPLETE");

        }), 3000)

    }, [loggedUserToggle])

    // console.log(allUsers);

    // console.log(loggedUserOrg);
    if (loggedUser[0].supervisor_id === null) {
        if (loggedUser !== []) {
            if (loggedUserServiceMemberSummaries[0] !== undefined) {
                    return (
                        <>
                            { /* data_user_basic will be dynamically loaded based on loggedIn user state  */}
                            {/* {console.log(loggedUser)} */}
                            {loggedUser.map((element, key) => {
                                return (
                                    <section  id="wrapper" className="pb-8 m-12">
                                    <section id='welcome_box' className="w-1/5 mx-auto p-4 min-w-fit max-w-fit bg-slate-100 opacity-90 rounded-md shadow-xl shadow-black">
                                        <tr>
                                            <div>{loggedUserOrg === "" ? "Loading..." : loggedUserOrg}</div>
                                            <div>Welcome, {element.name}</div>
                                            <div className="italic">"Stay <strong className="text-[#A3BD8A]">GREEN</strong> to stay in the fight!"</div>
                                        </tr>
                                    </section>
                                        {/* <IndivTag elements={ testObject } component="medical"/> */}
                                        {/* Logged in Soldier below */}
                                        <div  onClick={() => {console.log("THIS IS SUBORD"); setServiceMember(element)}}>
                                        <Link to={`/${element.username}`}>
                                        <SubTag elements={ loggedUserSummary } currentSM= { loggedUser[0] } key={key} />
                                        </Link>
                                        </div>
                                        {console.log("subordinate promise chain: ", loggedUserServiceMemberPromiseChainComplete)} 
                                        <hr className="w-10/12 mx-auto border-t-2 mt-12"/>
                                        <h3 className="w-2/12 text-2xl font-bold italic text-center min-w-fit max-w-fit mx-auto mt-12 p-2 bg-slate-100 opacity-90 rounded-md shadow-xl shadow-black">SMs tracked:</h3>
                                        <div className="searchbar_container">
                                        <input className="searchbar" style={{height: '40px'}}type="text" placeholder="Search a member of your teams skills here!" value={skillEntered} onChange={skillHandler} />
                                        </div>
                                        {/* Subordinates below */}
                                            {skillEntered === "" ? renderFunc(key) : searchFunc(key)} 


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

    
        }


    } else {
        return (
            <section id="wrapper" className="pb-8 m-12">
                <section id='welcome_box' className="w-1/5 mx-auto p-4 min-w-fit max-w-fit bg-slate-100 opacity-90 rounded-md shadow-xl shadow-black">
                    <div>You have no subordinates.</div>
                </section>
            </section>
        )
   }

    
}
export default Dashboard;