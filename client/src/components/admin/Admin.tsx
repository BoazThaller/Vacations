import React, { useEffect, useState } from "react";

import { ActionType } from '../../redux/ActionType';
import axios from "axios";
import { IVacation } from "../../interfaces/IVacation";
import EditVacation from "../editVacation/EditVacation";
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { FaTimes } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';



export default function Admin(){

    const dispatch = useDispatch();

    const [isShown, setIsShown] = useState(false);
    const [isDeleteModalShown, setDeleteModalShown] = useState(false);

    const vacationsArray = useSelector((state: AppState) => state.vacations);
    
    const [tempArrayToEdit, setTempArraytoEdit] = useState<IVacation[]>([]);
    const [tempArrayToDelete, setTempArrayToDelete] = useState<IVacation[]>([]);
    
    const [tempStartDate, setTempStartDate] = useState();
    const [tempEndDate, setTempEndDate] = useState();

    async function fetchVacations(){
        axios.get("http://localhost:3001/vacations/")
        .then(data => {
            dispatch({type: ActionType.AddAllVacations, payload: data.data});
        });
    }

    useEffect(() => {
        fetchVacations();
    },[]);


    const deleteHandler = (vacation:any) =>{
        setTempArrayToDelete(vacation)
        setDeleteModalShown(true);
    }

    
    const editHandler = (vacation:any) =>{
        setTempStartDate(vacation.startDate);
        setTempEndDate(vacation.endDate);
        setIsShown(true);
        setTempArraytoEdit(vacation)
  }

  return(
    <div className="vacationsContainer">
            {vacationsArray.map((vacation:any, key:number) =>(
                <div key={key} className="vacation">

                    <div className="deleteAndEditDiv">
                    <button id="deleteBtn"onClick={()=>deleteHandler(vacation)}><FaTimes/></button>
                    <button id="editBtn" onClick={()=>editHandler(vacation)}><FiEdit/></button>
                    </div>

                    <div className="destination">
                            {vacation.destination}
                    </div>
                    <img width="280px" height="300px" src={vacation.image} alt="" /><br></br>
                    Description: {vacation.description}<br></br><br></br>
                    Price: {vacation.price}$ <br></br><br></br>
                    From: {vacation.startDate}<br></br> To: {vacation.endDate}
                    {(isShown && <EditVacation setIsShown={setIsShown} startDate={tempStartDate} endDate={tempEndDate} vacation={tempArrayToEdit}/>)}
                    {(isDeleteModalShown && <DeleteConfirmation setDeleteModalShown={setDeleteModalShown} vacation={tempArrayToDelete}/>)}
                </div>
            ))}
    </div>
)
}

