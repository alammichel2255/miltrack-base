import react from "react";
import { useState, useContext, useEffect } from 'react';
import "./Loginbars.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";




const Loginbars = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    let { loggedUser, setLoggedUser, loggedUserToggle, setLoggedUserToggle, serviceMember, setServiceMember } = useContext(AppContext);
    const [dataUsers, setDataUsers]  = useState([]);
    let navigate = useNavigate();



    useEffect(() => { 
        fetch("http://localhost:3001/users")
            .then((response) => response.json())
            .then((data) => {
                console.log("data: ", data);
                setDataUsers(data)}
            )
            .catch((err) => console.log("err: ", err))
    }, []);
    useEffect(() => { 
            console.log("userinfo", dataUsers);
    }, [dataUsers]);


    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const userFunc = () => {
        setServiceMember(loggedUser[0])
        navigate(`/${loggedUser[0].username}`)
    }

    const handleSubmit = (event) => {
       
        event.preventDefault();

        var { uname, pass } = document.forms[0];

      
        const userData = dataUsers.find((user) => user.username === uname.value);
        // setLoggedUser(userData)

        let loggedUserCopy = loggedUser.slice();
        loggedUserCopy.push(userData);
        setLoggedUser(loggedUserCopy);
        setLoggedUserToggle(loggedUserToggle += 1);

        console.log(loggedUser);
        if (userData) {
            if (userData.password !== pass.value) {
  
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
                setTimeout(() => console.log(isSubmitted), 2000);
                
            }
        } else {
    
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

  
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <div className="button-container">
                    <input type="submit" />
                 </div>
                 <Link to="/register">
                 <button className="register">Register</button>
                 </Link>
                </div>
            </form>
        </div>
    );

    if (dataUsers.length !== 0) {
        return (
            <div className="app">
                <div className="login-form">
                    <div className="signIn">Sign In</div>
                   {isSubmitted ? userFunc() : renderForm}
                </div>
            </div>
        );
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

export default Loginbars;