import { IVacation } from "../interfaces/IVacation";

export class AppState{
  public vacations: IVacation[] = [];
  public firstName: string = "";
  public userType : any = "";
  public isLoggedIn: any = false;
  public followedVacations: number[] = [];
}
