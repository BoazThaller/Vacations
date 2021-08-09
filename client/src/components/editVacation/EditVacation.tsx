import axios from "axios";
import React, {useState, ChangeEvent} from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import parseISO from "date-fns/parseISO";
import { validateEditVacationInputs } from "../validations/Validations";
import FadeIn from 'react-fade-in';
import notify from "../notifications/Notifications";


function EditVacation(props:any) {
  
  const dispatch = useDispatch();

    const [destination, setDestination] = useState(props.vacation.destination);
    const [description, setDescription] = useState(props.vacation.description);

    // const [tempStartDateRange, setTempStartDateRange] = useState(parseISO(props.vacation.startDate));
    // const [tempEndDateRange, setEndTempDateRange] = useState(parseISO(props.vacation.endDate));
    
    const [dateRange, setDateRange] = useState([parseISO(props.vacation.startDate), parseISO(props.vacation.endDate)]);
    const [startDate, endDate] = dateRange;

    const [price, setPrice] = useState(props.vacation.price)

    const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    }

    const onDescriptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const onDestinationChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setDestination(event.target.value);
    }

    async function updateVacation() {
        axios.post(`http://localhost:3001/vacations/${props.vacation.id}`,{destination, description, price, startDate, endDate});
    }

    async function fetchVacations() {
      let id = props.vacation.id;
      let vacation = {id, destination, description, endDate, startDate, price}
      dispatch({type: ActionType.UpdateVacation, payload: vacation});
    }

    const onApplyClicked = async () =>{
      try{
          // validateEditVacationInputs(destination, description, price);
          await updateVacation();
          fetchVacations();
          props.setIsShown(false);            
          notify(props.vacation.destination, " successfully edited");

        }catch(e){
            console.log(e);
        }
    }

  return (
    <div className="modalBackground">
      <FadeIn transitionDuration={700} delay={200} >
      <div className="modalContainer">
        <div className="title">
          <h1>You are editing {props.vacation.destination}</h1>
        </div>
        <div className="body">
            <input className="editDestination" type="text" placeholder="Destination" value={destination} onChange={onDestinationChanged}/>
            <input className="editDescription" type="text" placeholder="Description" value={description} onChange={onDescriptionChanged}/>
            <input className="editPrice" type="text" placeholder="Price" value={price} onChange={onPriceChanged}/>

            <DatePicker
                selectsRange={true}
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                onChange={(update:any) => {
                  setDateRange(update);}}
                dateFormat="dd/MM/yyyy"
                withPortal
            />
        </div>
        <div className="footer">
          <button onClick={() => {props.setIsShown(false);}}id="cancelBtn" >Cancel</button>
          <button onClick={onApplyClicked}>Apply</button>
        </div>
      </div>
      </FadeIn>
    </div>
  );
}

export default EditVacation;

