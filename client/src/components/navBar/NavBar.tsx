import React, {useEffect, useState} from "react";
import { useSelector , useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../redux/AppState";
import { ImEarth } from 'react-icons/im';
import AddModal from "../addVacation/AddModal";
import { ActionType } from "../../redux/ActionType";
import FadeIn from 'react-fade-in';



export default function NavBar(){
    const dispatch = useDispatch();
    const firstName = useSelector((state: AppState) => state.firstName);
    const userType = useSelector((state: AppState) => state.userType);
    const isLogged = useSelector((state: AppState) => state.isLoggedIn);


    const [isShown, setIsShown] = useState(false);

    const history = useHistory();

    const onLogoutClicked = () =>{
        localStorage.removeItem("token");
        dispatch({type: ActionType.UpdateIsLogin, payload: false});
        history.push("/login");
        setTimeout(function(){ window.location.reload(); }, 200);
    }

    const onHomeClicked = () =>{
        history.push("/home")
    }
   
    const onAddVacationClicked = () =>{
        setIsShown(true);
    }
    
    const onGraphClicked = () =>{
        history.push("/chart");
    }
    
   const checkLogIn = () => {
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        };
        // check JWT token
        fetch("http://localhost:3001/users/login-check", options)
            .then(response => response.json())
            .then(res => {
                if (res.name === 'JsonWebTokenError') {
                    dispatch({type: ActionType.UpdateIsLogin, payload: false});
                    return;
                }
                dispatch({type: ActionType.SetUserTypeAndName, payload: res});
                dispatch({type: ActionType.UpdateIsLogin, payload: true});
            })
            .catch(err => alert(err));
    }    

    useEffect(() => {
            checkLogIn();
        },[]);


    return(
        <div className="navBar">
            <div className="leftNavBar">
                <FadeIn delay={100} transitionDuration={700} >
                    <button onClick={onHomeClicked} className="Logo"><span id="V">V</span> <span id="red">a</span> <span id="orange">c</span> <span id="red">a</span> <span id="orange">y</span>.com</button>
                </FadeIn>
                <FadeIn delay={200} transitionDuration={700}>
                    <p>Hello  {firstName}</p>
                </FadeIn>
                <FadeIn delay={300} transitionDuration={700}>
                    <button onClick={onLogoutClicked}>Logout</button>
                </FadeIn>
                <FadeIn delay={400} transitionDuration={700}>
                    {userType === "ADMIN" && <button onClick={onAddVacationClicked}>Add Vacation</button>}
                </FadeIn>
                <FadeIn delay={500} transitionDuration={700}>
                    {userType === "ADMIN" && <button onClick={onGraphClicked}>Graph</button>}
                </FadeIn>
            </div>

                <div id="notifactionsDiv">
                    <p id="notifications"></p>
                </div>
                {isShown && <AddModal setIsShown={setIsShown}/>}
        </div>
    )
}