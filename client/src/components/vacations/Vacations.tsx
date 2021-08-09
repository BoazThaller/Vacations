import axios from "axios";
import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { IVacation } from "../../interfaces/IVacation";
import { ActionType } from "../../redux/ActionType";
import { AppState } from "../../redux/AppState";
import { FaTimes } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";
import EditVacation from "../editVacation/EditVacation";
import { useHistory } from "react-router-dom";
import FadeIn from 'react-fade-in';
import notify from "../notifications/Notifications";


export default function Vacations(){

    const dispatch = useDispatch();
    const history = useHistory();

    const vacationsArray = useSelector((state: AppState) => state.vacations);
    const userType = useSelector((state: AppState) => state.userType);
    const isLogged = useSelector((state: AppState) => state.isLoggedIn);


    const [tempArrayToEdit, setTempArraytoEdit] = useState<IVacation[]>([]);
    const [tempArrayToDelete, setTempArrayToDelete] = useState<IVacation[]>([]);

    const [tempStartDate, setTempStartDate] = useState();
    const [tempEndDate, setTempEndDate] = useState();

    let delayState = 200

    const [isShown, setIsShown] = useState(false);
    const [isDeleteModalShown, setDeleteModalShown] = useState(false);

    useEffect(() => {

        const fetchVacations = () =>{
            const options = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            };

            fetch("http://localhost:3001/vacations/", options)
            .then(response => response.json())
            .then(data => {
                   if (data.name === 'JsonWebTokenError') {
                       dispatch({type: ActionType.UpdateIsLogin, payload: false});
                       history.push('/login');
                       setTimeout(function(){ window.location.reload(); }, 200);
                       return;
                    }

                   dispatch({type: ActionType.UpdateIsLogin, payload: true});
                   axios.defaults.headers.common["authorization"] = "Bearer " + localStorage.getItem('token');

               dispatch({type: ActionType.AddAllVacations, payload: data});
               let vacationsArray = data;

               for(let i =0; i<vacationsArray.length; i++){
                   if(vacationsArray[i].isFollowed === "TRUE"){
                      dispatch({type: ActionType.FollowVacation, payload: vacationsArray[i]});
                   }
               }
           })
        }

       fetchVacations();
    }, [dispatch,history]);
    
    const onFollowClicked = async (vacation:any,e:any) =>{
        let vacationId = vacation.id;

        if(e.target.innerText === "Follow"){
            notify("You are now following ", vacation.destination)
            dispatch({type: ActionType.FollowVacation, payload: vacation});
            await axios.post(`http://localhost:3001/followedVacations/`, {vacationId});
        }else{
            notify("You no longer follow ", vacation.destination)
            dispatch({type: ActionType.UnFollowVacation, payload: vacation});
            await axios.delete(`http://localhost:3001/followedVacations/`, {data: {vacationId}});
        }
      }

      const editHandler = (vacation:any) =>{
        setTempStartDate(vacation.startDate);
        setTempEndDate(vacation.endDate);
        setIsShown(true);
        setTempArraytoEdit(vacation);
      }

      const deleteHandler = (vacation:any) =>{
        setTempArrayToDelete(vacation)
        setDeleteModalShown(true);
      }

    return(
        <div className="vacationsContainer">
            {vacationsArray.map((vacation:any, key:number) =>(
                <FadeIn delay={delayState = delayState +100}  >
                <div key={key} className="vacation" >
                    <img  width="301px" height="300px" src={vacation.image} alt="" /><br></br>
                        {userType === "ADMIN" &&
                        <div className="deleteAndEditDiv">
                            <button id="deleteBtn"onClick={()=>deleteHandler(vacation)}><FaTimes className="highlight"/></button>
                            <button id="editBtn" onClick={()=>editHandler(vacation)}><FiEdit/></button>
                        </div>}
                        <div className="follow">
                            {userType === "USER" && <button id="followBtn" className="followBtn" onClick={(e)=>onFollowClicked(vacation,e)}> {vacation.isFollowed === "TRUE" ? "Unfollow": "Follow"}</button>}
                        </div>
                    <div className="vacationData">
                        <div className="destination">
                            {vacation.destination}
                        </div>
                        Description: {vacation.description}<br></br><br></br>
                        Price: {vacation.price}$ <br></br><br></br>
                        From: {new Date(vacation.startDate).toDateString()}<br></br> To: {new Date(vacation.endDate).toDateString()}
                        {(isShown && <EditVacation setIsShown={setIsShown} startDate={tempStartDate} endDate={tempEndDate} vacation={tempArrayToEdit}/>)}
                        {(isDeleteModalShown && <DeleteConfirmation setDeleteModalShown={setDeleteModalShown} vacation={tempArrayToDelete}/>)}

                    </div>
                </div>
            </FadeIn>
            )) }
        </div>
    )
}
