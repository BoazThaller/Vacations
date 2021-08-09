import { ActionType } from "./ActionType";
import { Action } from "./Action";
import { AppState } from "./AppState";

// This function is NOT called direcrtly by you
export function Reduce(oldAppState: AppState = new AppState(), action: Action): AppState {
  // Cloning the oldState (creating a copy)
  const newAppState = { ...oldAppState };
  
  switch (action.type) {
    case ActionType.AddAllVacations:
        let vacations = action.payload;
        newAppState.vacations = vacations;
        console.log(newAppState.vacations);
      break;

    case ActionType.SetUserTypeAndName:
        let user = action.payload;
        newAppState.userType = user.userType
        newAppState.firstName = user.firstName;
      break;
      
      case ActionType.UpdateIsLogin:
        let status = action.payload;
        newAppState.isLoggedIn = status
      break;

    case ActionType.DeleteVacation:
        newAppState.vacations = oldAppState.vacations.filter(vacation => vacation.id !== action.payload);
        console.log("this was deleted "+ action.payload)
      break;

      case ActionType.AddVacation:
        let vacation = action.payload;
        newAppState.vacations.push(vacation);
      break;

      case ActionType.UpdateVacation:
        let vacationObj = action.payload;
        let index = newAppState.vacations.map(function(x) {return x.id; }).indexOf(vacationObj.id);
        newAppState.vacations.splice(index, 1, vacationObj);
      break;

      case ActionType.FollowVacation:
        let vacationToFollow = action.payload;
        let indexToFollow = newAppState.vacations.map(function(x) {return x.id; }).indexOf(vacationToFollow.id);
        newAppState.vacations[indexToFollow].isFollowed = "TRUE";
        newAppState.vacations = oldAppState.vacations.filter(vacation => vacation.id !== vacationToFollow.id);
        newAppState.vacations.unshift(vacationToFollow);
        
        newAppState.vacations = [...newAppState.vacations];
      break;

      case ActionType.UnFollowVacation:
        let vacationToUnFollow = action.payload;
        let indexToUnfollow = newAppState.vacations.map(function(x) {return x.id; }).indexOf(vacationToUnFollow.id);
        newAppState.vacations[indexToUnfollow].isFollowed= "FALSE";
        newAppState.vacations = oldAppState.vacations.filter(vacation => vacation.id !== vacationToUnFollow.id);
        newAppState.vacations.push(vacationToUnFollow);
        newAppState.vacations = [...newAppState.vacations];
      break;
      
  }
  return newAppState;
}
