import axios from "axios";
import React, {useState, ChangeEvent} from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { validateAddVacationInputs } from "../validations/Validations";
import FadeIn from 'react-fade-in';
import notify from "../notifications/Notifications";



function AddModal(props:any) {
    const dispatch = useDispatch();

    const [destination, setDestination] = useState("");
    const [description, setDescription] = useState("");

    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange; 

    const [price, setPrice] = useState("");

    const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    }

    const onDescriptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const onDestinationChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setDestination(event.target.value);
    }

    async function fetchVacations(){
      axios.get("http://localhost:3001/vacations/")
      .then(data => {
          dispatch({type: ActionType.AddAllVacations, payload: data.data});
      });
    }

    const addHandler = async () =>{
        try {
            validateAddVacationInputs(destination, description, price);
            await axios.post("http://localhost:3001/vacations/", {destination, price, startDate, endDate, description});
            fetchVacations();
            props.setIsShown(false);
            notify(destination, " successfully added");
        }
        catch(e) {
          console.log(e)
        }
     }

  return (
    <div className="modalBackground">
      <FadeIn delay={200} transitionDuration={700}>
      <div className="modalContainer">
        <div className="title">
          <h1>Add Vacation</h1>
        </div>
        <div className="body">
            <input id="destination" type="text" placeholder="Destination" onChange={onDestinationChanged}/>
            <input id="description" type="text" placeholder="description" onChange={onDescriptionChanged}/>
            <input id="price" type="number" placeholder="price" onChange={onPriceChanged}/>

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
          <button onClick={() => {props.setIsShown(false);}}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={addHandler}>Add</button>
        </div>
      </div>
      </FadeIn>
    </div>
  );
}

export default AddModal;

