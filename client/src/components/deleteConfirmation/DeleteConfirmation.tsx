import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import FadeIn from 'react-fade-in';
import notify from "../notifications/Notifications";


function DeleteConfirmation(props:any) {

    const dispatch = useDispatch();

    const yesHandler = async () =>{
      try{
        notify(props.vacation.destination, " successfully deleted");
        props.setDeleteModalShown(false);
        dispatch({type: ActionType.DeleteVacation, payload: props.vacation.id});
        await axios.delete(`http://localhost:3001/vacations/${props.vacation.id}`);
      }
      catch(e){
        console.error(e)
      }
    }

  return (
    <div className="modalBackground">
      <FadeIn transitionDuration={700} delay={200} >
        <div className="deleteModalContainer">
          <div className="body">
                  <p>Are you sure you want to delete this vacation?</p>
          </div>
          <div className="footer">
            <button onClick={()=>{props.setDeleteModalShown(false)}} id="cancelBtn">No</button>
            <button onClick={yesHandler}>Yes</button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default DeleteConfirmation;

