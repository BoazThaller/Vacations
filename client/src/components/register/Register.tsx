import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { validateRegisterInputs } from '../validations/Validations';

export default function Register() {
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [isErrorShown, setIsErrorShown] = useState(false);



    const onRegisterClicked = async () => {
        try {
            validateRegisterInputs(firstName, password, userName)
            await axios.post("http://localhost:3001/users/", {firstName, lastName, password, userName});
            history.push("/login");
            setIsErrorShown(false);
        }
        catch(e) {
            setIsErrorShown(true);
            console.log(e)
        }   
    }

    const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onFirstNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const onLastNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }


    const onAlreadyAMemberClicked = async () => {
        history.push("/login")
    }

    return (
        <div className="registerDiv">
            <h1 className="header">Register</h1>
            <div className="registerInputs">
                <div className="firstAndLastName">
                    <input type="text" id="firstName" name="first Name" placeholder="First name" onChange={onFirstNameChanged}/><br />
                    <input type="text" name="last Name" placeholder="Last name" onChange={onLastNameChanged}/><br />
                </div>

                <div className="userNameAndPassword">
                    <input type="text" id="userName" name="user Name" placeholder="User name" onChange={onUserNameChanged}/><br />
                    <input type="password" id="password" name="password" placeholder="Password" onChange={onPasswordChanged}/><br />
                </div>
                {isErrorShown && <p id="errorsParagraph">User name already exists</p>}


            </div>
                <input className="registerBtnRegister" type="button" value = "Register" onClick={onRegisterClicked}/>
                <div>
                    <span>Already have an account?</span>
                    <input className="loginBtnRegister" type="button" value = "Login" onClick={onAlreadyAMemberClicked}/>
                </div>
        </div>
    )
}
