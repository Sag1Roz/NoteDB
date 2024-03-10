import { IUser } from "./User";

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
    }
  }
}
